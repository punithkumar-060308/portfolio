'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: 'https://via.placeholder.com/400x300?text=E-Commerce',
      caseStudy: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      imageUrl: 'https://via.placeholder.com/400x300?text=Task+App',
      caseStudy: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'AI Content Generator',
      description: 'AI-powered content creation tool with multiple templates',
      technologies: ['Next.js', 'OpenAI API', 'PostgreSQL'],
      imageUrl: 'https://via.placeholder.com/400x300?text=AI+Content',
      caseStudy: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management',
      technologies: ['React', 'Node.js', 'Chart.js', 'REST APIs'],
      imageUrl: 'https://via.placeholder.com/400x300?text=Dashboard',
      caseStudy: '#',
      github: '#',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-slate-700 overflow-hidden">
                <motion.img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-400 mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 rounded text-xs font-medium text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.caseStudy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Case Study <FiExternalLink size={16} />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    GitHub <FiGithub size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-slate-800 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
