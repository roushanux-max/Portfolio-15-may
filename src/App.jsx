import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './pages/home/sections/Hero';
import { WorkGrid } from './pages/home/sections/WorkGrid';

function App() {
  const { data, loading } = usePortfolioData();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black text-white'>
        <div className='w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <div ref={containerRef} className='bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white'>
      <Header />
      <Hero data={data} scrollYProgress={scrollYProgress} />
      <WorkGrid images={data?.images} />
      <Footer />
    </div>
  );
}

export default App;
