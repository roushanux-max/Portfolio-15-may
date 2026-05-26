import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap';

export const WorkGrid = ({ images }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          y: 50, opacity: 0, duration: 1, delay: i * 0.1
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id='work' ref={containerRef} className='py-24 px-4 md:px-12 max-w-7xl mx-auto'>
      <motion.h2 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        viewport={{ once: true }} 
        className='text-4xl md:text-6xl font-bold mb-16 border-l-4 border-purple-600 pl-6'
      >
        Selected Works
      </motion.h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {images?.slice(0, 6).map((img, index) => (
          <motion.div 
            key={index} 
            className='project-card group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900 cursor-pointer' 
            whileHover={{ scale: 0.98 }}
          >
            <img src={img.src} alt={img.alt} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8'>
              <h3 className='text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                {img.alt || ('Project ' + (index + 1))}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
