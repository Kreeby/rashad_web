"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code2, Database, Cloud, Cpu, GitBranch, Shield } from "lucide-react";

const keywords = ["ARCHITECT", "LEADER", "ENGINEER"];

const techStack = [
  { name: "Java", icon: Code2, color: "cyber-violet" },
  { name: "Spring Boot", icon: Cpu, color: "cyber-cyan" },
  { name: "Kafka", icon: Database, color: "cyber-purple" },
  { name: "GCP", icon: Cloud, color: "cyber-blue" },
  { name: "Azure", icon: Cloud, color: "cyber-cyan" },
  { name: "GraphQL", icon: GitBranch, color: "cyber-violet" },
  { name: "Microservices", icon: Shield, color: "cyber-purple" },
  { name: "Kubernetes", icon: Cpu, color: "cyber-blue" },
];

export function AboutSection() {
  const [visibleIcons, setVisibleIcons] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIcons(prev => {
        if (prev.length >= techStack.length) return [];
        return [...prev, prev.length];
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Column - Keywords */}
          <motion.div
            className="col-span-12 lg:col-span-4 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
                              className="text-3xl lg:text-4xl font-space-grotesk text-cyber-cyan uppercase tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            <div className="space-y-4">
              {keywords.map((keyword, index) => (
                <motion.div
                  key={keyword}
                  className="group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="relative inline-block">
                    <span className="text-2xl lg:text-3xl font-space-grotesk font-semibold text-gray-300 group-hover:text-cyber-violet transition-colors duration-300">
                      {keyword}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-violet group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column - Description */}
          <motion.div
            className="col-span-12 lg:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Award-winning Senior Engineering Manager with over <span className="text-cyber-cyan font-semibold">9+ years</span> of experience 
                leading high-impact engineering teams and delivering mission-critical systems for 
                <span className="text-cyber-violet font-semibold"> global clients </span> 
                including <span className="text-cyber-cyan font-semibold">Visa, Apple, and Citibank</span>.
              </p>
              
              <p className="text-lg leading-relaxed">
                Currently serving as Senior Engineering Manager and Regional Technical Lead for Germany at bp, 
                leading engineering efforts across the Germany region for digital mobility platforms and managing 
                <span className="text-cyber-cyan font-semibold"> 40+ indirect contributors</span> across multiple products and teams.
              </p>

              <p className="text-lg leading-relaxed">
                Recognized as <span className="text-cyber-violet font-semibold">Engineer of the Year at Grid Dynamics</span> for architectural excellence and security innovation. 
                Led engineering teams for Visa, Apple, and American Eagle Outfitters, managing Visa's commercial card authentication platform 
                and delivering secure MongoDB migration framework for Southern Glazers ECS Program.
              </p>
            </div>

            {/* Experience Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { number: "9+", label: "Years Experience" },
                { number: "40+", label: "Team Members Led" },
                { number: "200+", label: "Engineers Mentored" },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  className="text-center border border-cyber-violet/20 p-4 bg-dark-muted/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                >
                  <div className="text-2xl font-space-grotesk text-cyber-cyan font-bold">
                    {metric.number}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Tech Stack */}
          <motion.div
            className="col-span-12 lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
                            <h3 className="text-xl font-space-grotesk text-cyber-violet uppercase tracking-wide mb-6">
              Tech Stack
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                const isVisible = visibleIcons.includes(index);
                
                return (
                  <motion.div
                    key={tech.name}
                    className={`group p-4 border border-gray-600 bg-dark-muted/30 hover:border-${tech.color} transition-all duration-300 cursor-pointer`}
                    initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                    animate={isVisible ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 20px rgba(139, 92, 246, 0.3)`,
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Icon className={`w-8 h-8 text-${tech.color} group-hover:text-white transition-colors duration-300`} />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}