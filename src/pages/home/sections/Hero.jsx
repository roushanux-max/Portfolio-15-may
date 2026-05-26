import { motion, useTransform } from 'framer-motion';

export const Hero = ({ data, scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className='relative h-screen flex flex-col justify-center items-center overflow-hidden hero-gradient pt-20'>
      <motion.div style={{ y, opacity }} className='absolute inset-0 z-0 pointer-events-none' />
      <div className='z-10 text-center px-4 max-w-5xl mx-auto'>
        <motion.h1 
          className='hero-title text-6xl md:text-9xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500'
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'power4.out' }}
        >
          {data?.headings?.[0]?.text || 'Creative Developer'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8 }} 
          className='text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto'
        >
          {data?.metaDescription || 'Building digital experiences with code and motion.'}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }} 
          className='mt-12 flex gap-4 justify-center'
        >
          <a href='#work' className='px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2'>
            <span>View Work</span>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
