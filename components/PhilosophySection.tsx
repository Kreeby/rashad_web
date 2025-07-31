"use client";

import { motion } from "framer-motion";

export function PhilosophySection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-dark-bg relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(139, 92, 246, 0.1) 49%, rgba(139, 92, 246, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(6, 182, 212, 0.1) 49%, rgba(6, 182, 212, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-violet"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        {/* Quote Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          {/* Decorative Lines */}
          <motion.div
            className="absolute top-1/2 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent to-cyber-violet"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-16 h-0.5 bg-gradient-to-l from-transparent to-cyber-cyan"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Main Quote */}
          <div className="space-y-8">
            {/* Opening Quote Mark */}
            <motion.div
              className="text-6xl lg:text-8xl text-cyber-violet/30 font-space-grotesk"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              "
            </motion.div>

            {/* Quote Text */}
            <motion.blockquote
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <motion.h2
                  className="text-3xl lg:text-5xl xl:text-6xl font-space-grotesk font-bold leading-tight"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  FEWER BUGS IN PRODUCTION
                </motion.h2>
                
                <motion.div
                  className="text-2xl lg:text-4xl text-cyber-cyan font-space-grotesk font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  = HAPPIER USERS
                </motion.div>
              </div>

              {/* Glowing Effect */}
              <motion.div
                className="absolute inset-0 blur-3xl opacity-30"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4, #a855f7)",
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.blockquote>

            {/* Closing Quote Mark */}
            <motion.div
              className="text-6xl lg:text-8xl text-cyber-cyan/30 font-space-grotesk flex justify-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              "
            </motion.div>
          </div>

          {/* Author Attribution */}
          <motion.div
            className="mt-12 space-y-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-0.5 bg-cyber-violet mx-auto mb-4" />
            <p className="text-gray-400 font-space-grotesk uppercase tracking-wider">
              Engineering Philosophy
            </p>
            <p className="text-cyber-violet font-space-grotesk text-lg">
              Rashad Naghiyev
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-16 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyber-violet"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}