import { motion, useScroll, useTransform } from 'framer-motion';

export const Header = () => {
  const { scrollYProgress } = useScroll();
  
  // Calculate opacity separately to avoid escape sequence issues
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.1], ['0px', '10px']);
  
  const backgroundColor = useTransform(bgOpacity, (opacity) => {
    return 'rgba(0,0,0,' + opacity + ')';
  });

  return (
    <motion.header 
      style={{ 
        backgroundColor: backgroundColor,
        backdropFilter: blur 
      }}
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10'
    >
      <div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className='text-2xl font-bold tracking-tighter cursor-pointer' 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ROUSHAN.
        </motion.div>
        <nav className='hidden md:flex gap-8 items-center'>
          <a href='#work' className='text-sm font-medium hover:text-purple-400 transition-colors'>Work</a>
          <a href='#about' className='text-sm font-medium hover:text-purple-400 transition-colors'>About</a>
          <a href='#contact' className='px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:scale-105 transition-transform'>Let's Talk</a>
        </nav>
      </div>
    </motion.header>
  );
};
