'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiFolder, FiFileText, FiMail, FiGithub } from 'react-icons/fi';

const navItems = [
  { name: 'Home', href: '#home', icon: FiHome },
  { name: 'About', href: '#about', icon: FiUser },
  { name: 'Projects', href: '#projects', icon: FiFolder },
  { name: 'Blog', href: '#blog', icon: FiFileText },
  { name: 'Contact', href: '#contact', icon: FiMail },
];

export default function Navigation() {
  return (
    <nav className="w-full flex flex-col items-center">
      <div className="mb-6">
        <Link href="#home" className="text-lg neon-title">
          GDG
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ scale: 1.08 }}
              className="nav-btn neon-card"
            >
              <Icon size={20} />
            </motion.a>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="nav-btn">
          <FiGithub size={18} />
        </a>
      </div>
    </nav>
  );
}
