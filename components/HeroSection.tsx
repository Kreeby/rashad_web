"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-violet/10 to-cyber-cyan/10" />
        <div className="grid grid-cols-12 gap-4 h-full w-full p-8">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyber-violet/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 4,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 grid grid-cols-12 gap-6 w-full max-w-7xl mx-auto px-6">
        {/* Left Column - Text Content */}
        <motion.div
          className="col-span-12 lg:col-span-6 flex flex-col justify-center space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-space-grotesk tracking-tight">
              <span className="block text-cyber-violet uppercase">RASHAD</span>
              <span className="block text-cyber-cyan uppercase">NAGHIYEV</span>
            </h1>
            
            <div className="border-l-2 border-cyber-violet pl-6 space-y-2">
            <p className="text-xl lg:text-2xl text-gray-300 font-space-grotesk uppercase tracking-wide">
              Head of Loyalty Platform Technology
            </p>
            <p className="text-lg lg:text-xl text-gray-400 font-space-grotesk uppercase tracking-wide">
              Product • Engineering • Operations - Global Scope
            </p>
            </div>
          </motion.div>

          <motion.p
            className="text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Award-winning Senior Engineering Manager with over 9 years of experience leading high-impact engineering teams and delivering mission-critical systems for global clients including Visa, Apple, and Citibank.
          </motion.p>

          {/* Glowing Status Indicator */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="w-3 h-3 bg-cyber-cyan glow-pulse" />
            <span className="text-cyber-cyan uppercase tracking-wide">Driving Global Loyalty Transformation</span>
          </motion.div>
        </motion.div>

        {/* Right Column - Profile Image */}
        <motion.div
          className="col-span-12 lg:col-span-6 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyber-violet to-cyber-cyan p-[2px]">
              <div className="bg-dark-bg h-full w-full" />
            </div>
            <ImageWithFallback
              src="/images/rashad-profile.jpg"
              alt="Rashad Naghiyev"
              className="relative w-80 h-96 lg:w-96 lg:h-[480px] object-cover filter grayscale contrast-110"
            />
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-violet/20 to-transparent" />
            <div className="absolute inset-0 opacity-30">
              <div className="grid grid-cols-8 gap-1 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-cyber-cyan/30" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-cyber-cyan text-sm uppercase tracking-wider">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-cyber-cyan" />
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-violet"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}