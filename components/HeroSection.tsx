"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-b from-dark-bg to-dark-surface relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-violet rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Name */}
            <motion.h1
              className="text-5xl lg:text-7xl font-space-grotesk font-bold tracking-tight leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="block text-cyber-violet uppercase">RASHAD</span>
              <span className="block text-cyber-cyan uppercase">NAGHIYEV</span>
            </motion.h1>
            
            {/* Title with vertical line */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="w-1 h-12 bg-cyber-violet"></div>
              <div className="space-y-2">
                <p className="text-lg lg:text-xl text-gray-300 font-space-grotesk uppercase tracking-wide font-normal">
                  Senior Engineering Manager
                </p>
                <p className="text-base lg:text-lg text-gray-400 font-space-grotesk uppercase tracking-wide font-normal">
                  Regional Technical Lead – Germany
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg font-space-grotesk font-normal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Award-winning Senior Engineering Manager with over 9 years of experience leading high-impact engineering teams and delivering mission-critical systems for global clients including Visa, Apple, and Citibank.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <div className="w-3 h-3 bg-cyber-cyan rounded-sm animate-pulse"></div>
              <span className="text-base lg:text-lg text-cyber-cyan font-space-grotesk uppercase tracking-wide font-normal">
                Available for Collaboration
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Portrait Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              {/* Grid overlay on image */}
              <div className="absolute inset-0 z-10 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
              
              <ImageWithFallback
                src="/images/rashad-profile.jpg"
                alt="Rashad Naghiyev"
                className="relative w-80 h-96 lg:w-96 lg:h-[480px] object-cover filter grayscale contrast-110 brightness-90"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}