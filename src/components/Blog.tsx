'use client';

import { motion } from 'framer-motion';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Building Scalable Web Applications with Next.js',
      excerpt: 'Learn the best practices for building scalable and performant web applications using Next.js 14.',
      date: 'May 20, 2024',
      readTime: '8 min read',
      category: 'Backend',
      slug: '#',
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS for Modern UI Design',
      excerpt: 'Deep dive into Tailwind CSS utilities and best practices for creating beautiful, responsive interfaces.',
      date: 'May 15, 2024',
      readTime: '6 min read',
      category: 'Frontend',
      slug: '#',
    },
    {
      id: 3,
      title: 'Full-Stack Development: From Concept to Deployment',
      excerpt: 'A comprehensive guide to building and deploying full-stack applications from start to finish.',
      date: 'May 10, 2024',
      readTime: '10 min read',
      category: 'Development',
      slug: '#',
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const categoryColors = {
    Frontend: 'bg-blue-500/20 text-blue-300',
    Backend: 'bg-purple-500/20 text-purple-300',
    Development: 'bg-cyan-500/20 text-cyan-300',
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="p-6 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        categoryColors[post.category as keyof typeof categoryColors]
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-slate-400">
                      <FiCalendar size={14} />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{post.excerpt}</p>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">{post.readTime}</span>
                    <motion.a
                      href={post.slug}
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Read More <FiArrowRight size={16} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-slate-800 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
          >
            Read All Articles
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
