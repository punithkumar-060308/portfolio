'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiGitBranch, FiExternalLink } from 'react-icons/fi';

interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
}

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/github/repos');
        if (response.ok) {
          const data = await response.json();
          setRepos(data.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching repos:', error);
        // Use placeholder data
        setRepos([
          {
            id: 1,
            name: 'awesome-project',
            description: 'An amazing open source project',
            url: '#',
            language: 'TypeScript',
            stars: 245,
            forks: 42,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const languageColors: { [key: string]: string } = {
    TypeScript: 'bg-blue-500/20 text-blue-300',
    JavaScript: 'bg-yellow-500/20 text-yellow-300',
    Python: 'bg-purple-500/20 text-purple-300',
    React: 'bg-cyan-500/20 text-cyan-300',
    'Node.js': 'bg-green-500/20 text-green-300',
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">GitHub Repositories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading repositories...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors flex-1">
                    {repo.name}
                  </h3>
                  <FiExternalLink className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      languageColors[repo.language] || 'bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    {repo.language || 'Unknown'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <FiStar size={16} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <FiGitBranch size={16} />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-slate-800 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all"
          >
            View All Repositories
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
