'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiMail, href: '#', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-cyan-400 text-lg mb-4 font-medium"
        >
          Welcome to my portfolio
        </motion.p>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="block mb-2">Creative</span>
          <span className="block mb-2">Full-Stack</span>
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Developer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-slate-400 mb-8 leading-relaxed"
        >
          Crafting beautiful interfaces and robust backends. I combine design creativity with technical depth to build digital experiences that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            View My Work
            <FiArrowRight className="ml-2" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.2, color: '#06b6d4' }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                aria-label={link.label}
              >
                <Icon size={28} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16"
        >
          <p className="text-slate-500 text-sm mb-2">Scroll to explore</p>
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
