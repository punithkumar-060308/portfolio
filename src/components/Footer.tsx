'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiMail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Portfolio
            </h3>
            <p className="text-slate-400">
              Creative full-stack developer crafting beautiful web experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
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
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-400 text-sm">
            <p>&copy; {currentYear} All rights reserved.</p>
            <p>
              Designed & built with <span className="text-cyan-400">❤️</span> by Portfolio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
