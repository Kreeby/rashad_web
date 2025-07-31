"use client";

import { useEffect } from "react";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Prevent horizontal scroll
    document.body.style.overflowX = "hidden";

    // Add meta tags for SEO
    const metaTags = [
      { name: "description", content: "Rashad Naghiyev - Senior Engineering Manager with 9+ years of experience leading high-impact engineering teams for Visa, Apple, and Citibank. Regional Technical Lead at bp." },
      { name: "keywords", content: "Senior Engineering Manager, Technical Lead, Java, Spring Boot, Visa, Apple, Citibank, bp, Budapest, Hungary" },
      { name: "author", content: "Rashad Naghiyev" },
      { property: "og:title", content: "Rashad Naghiyev - Senior Engineering Manager" },
      { property: "og:description", content: "Award-winning engineering leader with 9+ years of experience delivering mission-critical systems for Visa, Apple, and Citibank." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rashad Naghiyev - Senior Engineering Manager" },
      { name: "twitter:description", content: "Award-winning engineering leader with 9+ years of experience delivering mission-critical systems for Visa, Apple, and Citibank." }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => {
        meta.setAttribute(key, value);
      });
      document.head.appendChild(meta);
    });

    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-foreground overflow-x-hidden">
      {/* Navigation Dots (Optional) */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="space-y-4">
          {[
            "hero",
            "about",
            "experience",
            "projects",
            "philosophy",
            "contact",
          ].map((section, index) => (
            <button
              key={section}
              onClick={() => {
                const element =
                  document.getElementById(section);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group block w-3 h-3 border border-cyber-violet/50 hover:border-cyber-violet transition-all duration-300"
              title={
                section.charAt(0).toUpperCase() +
                section.slice(1)
              }
            >
              <div className="w-full h-full bg-cyber-violet/0 group-hover:bg-cyber-violet transition-all duration-300" />
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="philosophy">
          <PhilosophySection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Scroll to top button */}
      <button
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="fixed bottom-8 right-8 w-12 h-12 border border-cyber-violet bg-dark-bg/80 text-cyber-violet hover:bg-cyber-violet hover:text-dark-bg transition-all duration-300 z-40 backdrop-blur-sm"
        title="Back to top"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Performance optimization: Preload critical images */}
      <link rel="preload" as="image" href="/images/rashad-profile.jpg" />
      <img
        src="/images/rashad-profile.jpg"
        alt="Preload Rashad Naghiyev"
        style={{ display: 'none' }}
      />
    </div>
  );
}