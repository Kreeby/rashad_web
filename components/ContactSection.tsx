"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, Send, MessageSquare } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "rashad.naghiyev@gmail.com",
      href: "mailto:rashad.naghiyev@gmail.com",
      color: "cyber-violet"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rashad-naghiyev",
      href: "https://linkedin.com/in/rashad-naghiyev",
      color: "cyber-cyan"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Kreeby",
      href: "https://github.com/Kreeby",
      color: "cyber-purple"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Budapest, Hungary",
      href: "#",
      color: "cyber-blue"
    }
  ];

  // Company logos for the carousel
  const companyLogos = [
    { name: "bp | Aral", logo: "⛽", color: "text-green-500" },
    { name: "Grid Dynamics", logo: "🔲", color: "text-purple-500" },
    { name: "Visa", logo: "💳", color: "text-blue-500" },
    { name: "Apple", logo: "🍎", color: "text-gray-800" },
    { name: "American Eagle", logo: "🦅", color: "text-red-500" },
    { name: "Southern Glazers", logo: "🍷", color: "text-purple-600" },
    { name: "Re-Partners", logo: "🏢", color: "text-blue-600" },
    { name: "Sema4", logo: "🧬", color: "text-green-600" },
    { name: "VARTEQ", logo: "⚡", color: "text-orange-500" },
  ];

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-dark-bg to-dark-surface relative">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-2 h-full w-full p-4">
          {Array.from({ length: 200 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyber-violet"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 3,
                delay: (i * 0.01) % 2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            className="col-span-12 lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.h2
                className="text-4xl lg:text-5xl font-space-grotesk text-cyber-cyan uppercase tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Let's Connect
              </motion.h2>
              <div className="w-24 h-0.5 bg-cyber-violet" />
            </div>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Ready to discuss your next project or explore collaboration opportunities? 
              I'm always interested in challenging technical problems and innovative solutions.
            </motion.p>

            {/* Contact Links */}
            <div className="space-y-4">
              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={`group flex items-center space-x-4 p-4 border border-gray-600 bg-dark-muted/30 hover:border-${link.color} transition-all duration-300`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <Icon className={`w-6 h-6 text-${link.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className="flex-grow">
                      <div className="text-gray-400 text-sm uppercase tracking-wide">{link.label}</div>
                      <div className={`text-${link.color} font-medium`}>{link.value}</div>
                    </div>
                    <div className={`w-0 h-0.5 bg-${link.color} group-hover:w-8 transition-all duration-300`} />
                  </motion.a>
                );
              })}
            </div>

            {/* Status Indicator */}
            <motion.div
              className="flex items-center space-x-3 p-4 border border-cyber-cyan/30 bg-cyber-cyan/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-3 h-3 bg-cyber-cyan"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyber-cyan font-space-grotesk uppercase tracking-wide">
                Available for new opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form and Company Logos */}
          <motion.div
            className="col-span-12 lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Contact Form - Top Box */}
            <div className="relative p-8 border border-gray-600 bg-dark-muted/30 min-h-[400px]">
              {/* Form Header */}
              <div className="flex items-center space-x-3 mb-8">
                <MessageSquare className="w-6 h-6 text-cyber-violet" />
                <h3 className="text-2xl font-space-grotesk text-cyber-violet uppercase">
                  Send Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none transition-colors duration-300"
                    placeholder="Project discussion"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full p-4 bg-gradient-to-r from-cyber-violet to-cyber-purple text-white font-space-grotesk uppercase tracking-wide hover:from-cyber-purple hover:to-cyber-violet transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span>
                      {isSubmitting ? "Sending..." : 
                       submitStatus === 'success' ? "Message Sent!" :
                       submitStatus === 'error' ? "Error - Try Again" :
                       "Send Message"}
                    </span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  {/* Loading Animation */}
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-cyber-violet/20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="mt-4 p-4 bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    className="mt-4 p-4 bg-red-500/20 border border-red-500/30 text-red-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Sorry, there was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>

              {/* Form Border Animation */}
              <motion.div
                className="absolute inset-0 border border-transparent"
                style={{
                  background: `
                    linear-gradient(#1a1a23, #1a1a23) padding-box,
                    linear-gradient(45deg, transparent, #8b5cf6, transparent) border-box
                  `,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Company Logos Carousel - Bottom Box */}
            <div className="relative p-8 border border-gray-600 bg-dark-muted/30 min-h-[300px]">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-6 h-6 bg-cyber-purple rounded-full" />
                <h3 className="text-2xl font-space-grotesk text-cyber-purple uppercase tracking-wide">
                  Companies I've Worked With
                </h3>
              </div>

              {/* Carousel Container */}
              <div className="relative overflow-hidden h-32 mb-4">
                <div className="flex animate-slide" style={{ width: 'max-content' }}>
                  {/* First set of logos */}
                  {companyLogos.map((company, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-20 mx-4 p-4 border border-gray-600 bg-dark-bg/50 hover:border-cyber-purple transition-colors duration-300"
                    >
                      <div className="text-3xl mb-2">{company.logo}</div>
                      <div className="text-xs text-gray-400 font-space-grotesk uppercase tracking-wide text-center">
                        {company.name}
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {companyLogos.map((company, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-20 mx-4 p-4 border border-gray-600 bg-dark-bg/50 hover:border-cyber-purple transition-colors duration-300"
                    >
                      <div className="text-3xl mb-2">{company.logo}</div>
                      <div className="text-xs text-gray-400 font-space-grotesk uppercase tracking-wide text-center">
                        {company.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fallback Static Grid if carousel doesn't work */}
              <div className="mt-8 grid grid-cols-4 gap-4">
                {companyLogos.slice(0, 8).map((company, index) => (
                  <div
                    key={`static-${index}`}
                    className="flex flex-col items-center justify-center p-4 border border-gray-600 bg-dark-bg/50 hover:border-cyber-purple transition-colors duration-300"
                  >
                    <div className="text-2xl mb-2">{company.logo}</div>
                    <div className="text-xs text-gray-400 font-space-grotesk uppercase tracking-wide text-center">
                      {company.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Border Animation */}
              <motion.div
                className="absolute inset-0 border border-transparent"
                style={{
                  background: `
                    linear-gradient(#1a1a23, #1a1a23) padding-box,
                    linear-gradient(45deg, transparent, #a855f7, transparent) border-box
                  `,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-20 pt-8 border-t border-gray-600 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 font-space-grotesk uppercase tracking-wide">
            © 2025 Rashad Naghiyev. Crafted with precision.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-cyber-violet"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.footer>
      </div>
    </section>
  );
}