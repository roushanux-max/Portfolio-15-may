import { motion, useTransform } from 'framer-motion';
import { usePortfolioData } from '../../../hooks/usePortfolioData';

export const Hero = ({ scrollYProgress }) => {
  const { data } = usePortfolioData();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const hasVideo = data?.videos && data.videos.length > 0;

  return (
    <section className='relative h-screen flex flex-col justify-center items-center overflow-hidden pt-20'>
      {/* Background Video or Gradient */}
      {hasVideo ? (
        <video 
          src={data.videos[0]} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className='absolute inset-0 w-full h-full object-cover z-0'
        />
      ) : (
        <motion.div style={{ y, opacity }} className='absolute inset-0 z-0 hero-gradient' />
      )}
      
      {/* Overlay to make text readable */}
      <div className='absolute inset-0 bg-black/40 z-0' />

      {/* Content */}
      <div className='z-10 text-center px-4 max-w-5xl mx-auto relative'>
        <motion.h1 
          className='hero-title text-6xl md:text-9xl font-bold mb-6 tracking-tighter text-white drop-shadow-lg'
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
          className='text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow-md'
        >
          {data?.metaDescription || 'Building digital experiences.'}
        </motion.p>
      </div>
    </section>
  );
};
