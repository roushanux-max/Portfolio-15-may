import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { gsap } from '../lib/gsap';
import { useEffect, useRef } from 'react';

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.from('.project-hero', { y: 100, opacity: 0, duration: 1.2, ease: 'power3.out' });
      gsap.from('.project-content', { y: 50, opacity: 0, duration: 1, delay: 0.3 });
    }, contentRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) return <div className='h-screen flex items-center justify-center text-white'>Project not found</div>;

  return (
    <div ref={contentRef} className='pt-20 bg-black min-h-screen text-white'>
      {/* Hero Video Section */}
      <div className='project-hero relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900'>
        {project.video ? (
          <video 
            src={project.video} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className='w-full h-full object-cover' 
          />
        ) : (
          <img src={project.cover} alt={project.title} className='w-full h-full object-cover' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-8 md:p-20'>
          <div>
            <motion.span className='text-purple-400 font-bold tracking-wider uppercase mb-2 block'>{project.category}</motion.span>
            <motion.h1 className='text-5xl md:text-8xl font-bold text-white mb-4'>{project.title}</motion.h1>
            <p className='text-xl text-gray-300 max-w-2xl'>{project.description}</p>
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className='project-content max-w-4xl mx-auto px-6 py-20'>
        <div className='prose prose-invert prose-lg text-gray-300'>
          <h2 className='text-3xl font-bold text-white mb-6'>Overview</h2>
          <p>{project.description}</p>
          <p className='mt-4'>
            This project demonstrates advanced UI/UX principles with a focus on motion and interaction. 
            The design system ensures consistency across all platforms.
          </p>
        </div>

        {/* Additional Gallery (if images were added later) */}
        {project.images && project.images.length > 0 && (
          <div className='grid grid-cols-1 gap-8 mt-12'>
            {project.images.map((img, i) => (
              <motion.img 
                key={i} src={img} alt='Detail' 
                className='w-full rounded-xl shadow-2xl'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        )}

        <div className='mt-20 pt-10 border-t border-gray-800'>
          <Link to='/' className='inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform'>
            ← Back to Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
