'use client';

import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Database Design'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma', 'Postman'] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-12"
        >
          <motion.div variants={itemVariants}>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              I'm a passionate full-stack developer with a keen eye for design. With 5+ years of experience, I've worked on diverse projects ranging from startups to established companies.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              My approach combines creative UI/UX design with robust backend architecture, always focusing on delivering solutions that are not just functional but also beautiful and intuitive.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
