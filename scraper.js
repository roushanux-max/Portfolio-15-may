const { chromium } = require('playwright');
const fs = require('fs');
const url = process.env.TARGET_URL || "https://roushan.framer.website";

(async () => {
  console.log(`Starting scrape for: ${url}`);
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set a standard desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait specifically for Framer content to load
    await page.waitForSelector('body', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 3000)); // Extra delay for dynamic JS

    const content = await page.evaluate(() => {
      const data = {
        url: window.location.href,
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        headings: [],
        images: [],
        videos: [],
        links: []
      };

      // Extract Headings
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
        if(el.innerText.trim()) {
          data.headings.push({ tag: el.tagName, text: el.innerText.trim() });
        }
      });

      // Extract Images
      document.querySelectorAll('img').forEach(el => {
        const src = el.src || el.getAttribute('data-src');
        if (src && !src.startsWith('data:')) {
          data.images.push({
            src: src,
            alt: el.alt || '',
            width: el.width,
            height: el.height
          });
        }
      });

      // Extract Videos (Framer often uses <video> or iframes)
      document.querySelectorAll('video source, video').forEach(el => {
        const src = el.src || el.getAttribute('src');
        if (src) data.videos.push({ type: 'html5', src: src });
      });
      
      // Extract Iframe Videos (YouTube/Vimeo often embedded)
      document.querySelectorAll('iframe').forEach(el => {
        const src = el.src;
        if (src && (src.includes('youtube') || src.includes('vimeo') || src.includes('player'))) {
          data.videos.push({ type: 'embed', src: src });
        }
      });

      // Extract Text Paragraphs (limit to non-empty)
      const paragraphs = [];
      document.querySelectorAll('p').forEach(el => {
        const text = el.innerText.trim();
        if (text.length > 20) paragraphs.push(text);
      });
      data.paragraphs = paragraphs;

      return data;
    });

    // Save to JSON file
    fs.writeFileSync('framer-content.json', JSON.stringify(content, null, 2));
    console.log('Scraping complete. Saved to framer-content.json');
    console.log(JSON.stringify(content, null, 2));

  } catch (error) {
    console.error('Error during scraping:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
