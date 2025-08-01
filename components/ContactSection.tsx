"use client";

/**
 * ContactSection – full component with real company logos (uniform size) + real e‑mail sending.
 * • Logos carousel (60 s loop, lighter bg, no frames, bigger icons)
 * • Email POSTs to /api/contact (Next.js route) – see note below.
 */

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  FileText,
} from "lucide-react";

export function ContactSection() {
  /* ───────── form state */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  /* ───────── submit (calls /api/contact) */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Server error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  /* ───────── quick links */
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "rashad.naghiyev@gmail.com",
      href: "mailto:rashad.naghiyev@gmail.com",
      color: "cyber-violet",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rashad-naghiyev",
      href: "https://linkedin.com/in/rashad-naghiyev",
      color: "cyber-cyan",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Kreeby",
      href: "https://github.com/Kreeby",
      color: "cyber-purple",
    },
    {
      icon: FileText,
      label: "Medium",
      value: "medium.com/@rashadnaghiyev_95022",
      href: "https://medium.com/@rashadnaghiyev_95022",
      color: "cyber-green",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Budapest, Hungary",
      href: "#",
      color: "cyber-blue",
    },
  ];

  /* ───────── logo carousel (logo.dev) */
  type Logo = { name: string; src: string };
  const logos: Logo[] = [
    { name: "BP | Aral", src: "https://logo-dev.vercel.app/bp.com?size=128&format=png" },
    { name: "Grid Dynamics", src: "https://logo-dev.vercel.app/griddynamics.com?size=128&format=png" },
    { name: "Morgan Stanley", src: "https://logo-dev.vercel.app/morganstanley.com?size=128&format=png" },
    { name: "Sema4", src: "https://logo-dev.vercel.app/sema4.com?size=128&format=png" },
    { name: "MotorK", src: "https://logo-dev.vercel.app/motork.io?size=128&format=png" },
    { name: "American Eagle", src: "https://logo-dev.vercel.app/ae.com?size=128&format=png" },
    { name: "SGWS", src: "https://logo-dev.vercel.app/sgws.com?size=128&format=png" },
    { name: "Visa", src: "https://logo-dev.vercel.app/visa.com?size=128&format=png" },
    { name: "Citibank", src: "https://logo-dev.vercel.app/citi.com?size=128&format=png" },
    { name: "Apple", src: "https://logo-dev.vercel.app/apple.com?size=128&format=png" },
    { name: "Ford", src: "https://logo-dev.vercel.app/ford.com?size=128&format=png" },
  ];

  /* ───────── render */
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-dark-bg to-dark-surface relative">
      {/* background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-8 gap-2 h-full w-full p-4">
          {Array.from({ length: 200 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyber-violet"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, delay: (i * 0.01) % 2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-12 items-start">
          {/* left column */}
          <motion.div
            className="col-span-12 lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* header */}
            <div className="space-y-4">
              <motion.h2
                className="text-4xl lg:text-5xl font-space-grotesk text-cyber-cyan uppercase tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
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
            >
              Ready to discuss your next project or explore collaboration opportunities? I'm always interested in challenging technical problems and innovative solutions.
            </motion.p>

            {/* links */}
            <div className="space-y-4">
              {contactLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className={`group flex items-center space-x-4 p-4 border border-gray-600 bg-dark-muted/30 hover:border-${link.color} transition-all`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Icon className={`w-6 h-6 text-${link.color}`} />
                    <div className="flex-grow">
                      <div className="text-gray-400 text-sm uppercase tracking-wide">
                        {link.label}
                      </div>
                      <div className={`text-${link.color} font-medium`}>{link.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* availability */}
            <motion.div
              className="flex items-center space-x-3 p-4 border border-cyber-cyan/30 bg-cyber-cyan/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-3 h-3 bg-cyber-cyan rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyber-cyan font-space-grotesk uppercase tracking-wide">
                Available for new opportunities
              </span>
            </motion.div>
          </motion.div>

          {/* right column */}
          <motion.div
            className="col-span-12 lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* form */}
            <div className="relative p-8 border border-gray-600 bg-dark-muted/30 min-h-[400px]">
              <div className="flex items-center space-x-3 mb-8">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyber-violet fill-current">
                  <path d="M21 6.5a2.5 2.5 0 00-2.5-2.5h-13A2.5 2.5 0 003 6.5v11A2.5 2.5 0 005.5 20h13a2.5 2.5 0 002.5-2.5v-11zM5.5 5h13a1.5 1.5 0 011.5 1.5v.538l-8 4.8-8-4.8V6.5A1.5 1.5 0 015.5 5zM20 17.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5V8.683l8 4.8 8-4.8V17.5z" />
                </svg>
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
                      className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none"
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
                      className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none"
                    placeholder="Project discussion"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full p-3 bg-dark-bg border border-gray-600 text-white placeholder-gray-500 focus:border-cyber-violet focus:outline-none resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full p-4 bg-gradient-to-r from-cyber-violet to-cyber-purple text-white font-space-grotesk uppercase tracking-wide hover:from-cyber-purple hover:to-cyber-violet disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : submitStatus === "success"
                        ? "Message Sent!"
                        : submitStatus === "error"
                        ? "Error – Try Again"
                        : "Send Message"}
                    </span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-cyber-violet/20"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div className="mt-4 p-4 bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 text-red-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Sorry, there was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </div>

            {/* carousel */}
            <div className="relative p-8 border border-gray-500/50 bg-dark-muted/10">
              <h3 className="flex items-center space-x-3 mb-6 text-2xl font-space-grotesk text-cyber-purple uppercase">
                <span className="w-6 h-6 bg-cyber-purple rounded-full" />
                <span>Companies I've Worked With</span>
              </h3>

              <div className="overflow-hidden py-4">
                <div
                  className="flex gap-10"
                  style={{ width: "max-content", animation: "slide 60s linear infinite" }}
                >
                  {logos.concat(logos).map((logo, idx) => (
                    <img
                      key={idx}
                      src={logo.src}
                      alt={logo.name}
                      title={logo.name}
                      className="w-40 h-24 object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* footer */}
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
                className="w-1 h-1 bg-cyber-violet rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.footer>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

/**
 * 👉  IMPORTANT – API route (create once):
 * In /app/api/contact/route.ts (Next.js 13+) or /pages/api/contact.ts (<=12)
 * use a simple SMTP/Nodemailer handler, e.g.:
 *
 *  import nodemailer from "nodemailer";
 *  export async function POST(req: Request) {
 *    const { name, email, subject, message } = await req.json();
 *    const transporter = nodemailer.createTransport({
 *      host: "smtp.gmail.com",
 *      port: 465,
 *      secure: true,
 *      auth: {
 *        user: process.env.SMTP_USER,
 *        pass: process.env.SMTP_PASS,
 *      },
 *    });
 *    await transporter.sendMail({
 *      from: `Portfolio <${process.env.SMTP_USER}>`,
 *      to: "rashad.naghiyev@gmail.com",
 *      replyTo: email,
 *      subject: `Portfolio – ${subject}`,
 *      text: `${name} <${email}>\n\n${message}`,
 *    });
 *    return new Response(null, { status: 200 });
 *  }
 *
 * Set env vars (SMTP_USER, SMTP_PASS) in .env.local. ✅
 */
