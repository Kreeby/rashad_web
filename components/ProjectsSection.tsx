"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Filter, X, CheckCircle, TrendingUp, Code, Database } from "lucide-react";

type ProjectFilter = "all" | "architecture" | "performance" | "team-lead";

interface ProjectDetails {
  overview: string;
  keyFeatures: string[];
  impact: string[];
  stack: string[];
}

interface Project {
  title: string;
  description: string;
  category: string[];
  tags: string[];
  metrics: string;
  status: string;
  gradient: string;
  details: ProjectDetails | null;
}

const projects: Project[] = [
  {
    title: "Visa Commercial Card Platform",
    description: "Managed Visa's commercial card authentication platform, building Kafka-based real-time services with team of 5+ engineers.",
    category: ["architecture", "team-lead"],
    tags: ["Java", "Kafka", "Spring Boot", "Real-time"],
    metrics: "5+ engineers",
    status: "Production",
    gradient: "from-cyber-violet to-cyber-purple",
    details: null
  },
  {
    title: "Southern Glazers ECS Program",
    description: "Delivered secure MongoDB migration framework, replacing vulnerable third-party libraries and improving system security.",
    category: ["architecture", "performance"],
    tags: ["MongoDB", "Security", "Migration", "Java"],
    metrics: "Enhanced security",
    status: "Production",
    gradient: "from-cyber-cyan to-cyber-blue",
    details: null
  },
  {
    title: "AEO Loyalty Platform",
    description: "Directed re-architecture of the Loyalty platform at American Eagle Outfitters, improving JVM performance and technical scalability.",
    category: ["team-lead", "performance"],
    tags: ["Java", "JVM", "Performance", "Architecture"],
    metrics: "Improved performance",
    status: "Production",
    gradient: "from-cyber-purple to-cyber-violet",
    details: null
  },
  {
    title: "Apple Uplift Platform",
    description: "Staff Software Engineer for Uplift - enterprise-scale artifact & dependency management platform supporting 20,000+ repositories with automated upgrade workflows.",
    category: ["architecture", "performance"],
    tags: ["Java", "PostgreSQL", "Artifactory", "React", "REST APIs"],
    metrics: "20,000+ repositories",
    status: "Production",
    gradient: "from-cyber-blue to-cyber-cyan",
    details: {
      overview: "Uplift is a fully integrated internal platform designed to automate, monitor, and manage the lifecycle of software dependencies across an enterprise-scale codebase. Built to support over 20,000 repositories in a large organization.",
      keyFeatures: [
        "Repository Onboarding Engine using Strategy Pattern abstraction",
        "Artifact Indexing via Artifactory API with pre-computation pipeline",
        "Dependency Tree Construction with BOM and workflow orchestration",
        "Custom Semantic Versioning Engine for poorly-formed version tags",
        "Breaking Change Detection (n-1 & n→latest) with standalone library",
        "Upgrade Options & Advisory Layer with actionable recommendations",
        "Auto-Pull-Request Generator for dependency upgrades",
        "UI & API Integration with PostgreSQL backend and React frontend"
      ],
      impact: [
        "Identified 55%+ of repositories had outdated dependencies",
        "Enabled secure, controlled upgrades across tens of thousands of services",
        "Reduced time-to-upgrade by automating version resolution",
        "Proactively mitigated risks from vulnerabilities and deprecated libraries",
        "Established centralized ecosystem for dependency hygiene at scale"
      ],
      stack: ["Java", "PostgreSQL", "Artifactory API", "Maven/Gradle", "Workflow Engine", "Custom Versioning Lib", "React", "REST APIs"]
    }
  },
  {
    title: "Citibank FX Systems",
    description: "Designed optimized gRPC communication for FX systems with backpressure and custom serialization for high-load scenarios.",
    category: ["architecture", "performance"],
    tags: ["gRPC", "FX Trading", "High-load", "Java"],
    metrics: "High-performance",
    status: "Production",
    gradient: "from-cyber-violet to-cyber-cyan",
    details: null
  },
  {
    title: "Sema4 Health Analytics",
    description: "Developed backend services for predictive health analytics platform with custom validation service and PostgreSQL inheritance architecture.",
    category: ["team-lead"],
    tags: ["Java", "PostgreSQL", "Healthcare", "Analytics"],
    metrics: "Predictive platform",
    status: "Production",
    gradient: "from-cyber-purple to-cyber-blue",
    details: null
  }
];

const filters: { key: ProjectFilter; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "architecture", label: "Architecture" },
  { key: "performance", label: "Performance" },
  { key: "team-lead", label: "Team Lead" },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.category.includes(activeFilter)
  );

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-space-grotesk text-cyber-cyan uppercase tracking-wide mb-4">
            Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of impactful projects that showcase technical excellence and leadership
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
                              className={`px-6 py-3 border font-space-grotesk uppercase tracking-wide text-sm transition-all duration-300 ${
                activeFilter === filter.key
                  ? "border-cyber-violet bg-cyber-violet/20 text-cyber-violet"
                  : "border-gray-600 text-gray-400 hover:border-cyber-violet hover:text-cyber-violet"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative h-96 cursor-pointer"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => project.details && setSelectedProject(project)}
            >
              {/* Card Container */}
              <div className="relative h-full border border-gray-600 bg-dark-muted/30 group-hover:border-cyber-violet transition-all duration-500 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="grid grid-cols-6 gap-1 h-full w-full p-2">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="border border-cyber-violet/30"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 text-xs font-space-grotesk uppercase tracking-wide ${
                      project.status === "Production" 
                        ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30"
                        : "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30"
                    }`}>
                      {project.status}
                    </span>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.details && (
                        <span className="text-cyber-violet text-xs">View Details</span>
                      )}
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-cyber-violet cursor-pointer transition-colors" />
                      <Github className="w-5 h-5 text-gray-400 hover:text-cyber-cyan cursor-pointer transition-colors" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-space-grotesk text-cyber-violet mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="mb-4">
                    <div className="text-cyber-cyan font-space-grotesk text-sm uppercase tracking-wide">
                      {project.metrics}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-dark-bg/50 border border-gray-600 text-gray-400 text-xs group-hover:border-cyber-violet group-hover:text-cyber-violet transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" 
                       style={{ transformOrigin: "left" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && selectedProject.details && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-dark-surface border border-cyber-violet/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-space-grotesk text-cyber-violet mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400">{selectedProject.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-cyber-violet transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Overview */}
                <div className="mb-8">
                  <h4 className="text-xl font-space-grotesk text-cyber-cyan mb-4">Overview</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.details.overview}</p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="text-xl font-space-grotesk text-cyber-cyan mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Key Features & Architecture
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.details.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyber-violet mt-2 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-8">
                  <h4 className="text-xl font-space-grotesk text-cyber-cyan mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Impact
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.details.impact.map((impact, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyber-cyan mt-2 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-xl font-space-grotesk text-cyber-cyan mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.details.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyber-violet/20 border border-cyber-violet/30 text-cyber-violet text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Why It Matters */}
                <div className="border-t border-gray-600 pt-6">
                  <h4 className="text-xl font-space-grotesk text-cyber-cyan mb-4">Why It Matters</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Uplift bridges the gap between DevSecOps, Architecture Governance, and Developer Productivity. 
                    It transforms passive dependency management into an active, intelligent, and automated system, 
                    aligning with enterprise goals of stability, maintainability, and velocity.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* View More */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 border border-cyber-violet text-cyber-violet font-space-grotesk uppercase tracking-wide hover:bg-cyber-violet hover:text-dark-bg transition-all duration-300">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}