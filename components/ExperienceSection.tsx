"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { EarthGlobe, Location } from "./EarthGlobe";

export function ExperienceSection() {
  const [viewMode, setViewMode] = useState<"globe" | "grid">("globe");
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Memoize the hover handler to prevent unnecessary re-renders
  const handleLocationHover = useCallback((id: string | null) => {
    setHoveredLocation(id);
  }, []);

  // Your work and residence locations
  const locations: Location[] = useMemo( 
    () => [
      // Major work locations (large markers)
      {
        id: "bp-budapest",
        name: "BP Budapest",
        city: "Budapest",
        country: "Hungary",
        lat: 47.4979,
        lng: 19.0402,
        company: "bp | Aral",
        role: "Senior Engineering Manager | Regional Technical Lead – Germany",
        period: "06/2025 - Present",
        achievements: [
          "Leading engineering efforts across Germany region for digital mobility platforms",
          "Managing 40+ indirect contributors across multiple products and teams",
          "Accountable for cross-product delivery and architectural consistency"
        ],
        type: "work",
        size: "large"
      },
      {
        id: "grid-dynamics-warsaw",
        name: "Grid Dynamics Warsaw",
        city: "Warsaw",
        country: "Poland",
        lat: 52.2297,
        lng: 21.0122,
        company: "Grid Dynamics",
        role: "Engineering Manager | Technical Lead",
        period: "2022 - 2025",
        achievements: [
          "Led engineering teams for Visa, Apple, and American Eagle Outfitters",
          "Managed Visa's commercial card authentication platform with Kafka-based services",
          "Delivered secure MongoDB migration framework for Southern Glazers ECS Program"
        ],
        type: "work",
        size: "large"
      },
      {
        id: "visa-san-ramon",
        name: "Visa San Ramon",
        city: "San Ramon",
        country: "United States",
        lat: 37.7799,
        lng: -121.9780,
        company: "Visa (via Grid Dynamics)",
        role: "Technical Lead",
        period: "2022 - 2025",
        achievements: [
          "Managed commercial card authentication platform",
          "Built Kafka-based real-time services with 5+ engineers",
          "Secured 2-year client contract extension"
        ],
        type: "work",
        size: "large"
      },
      {
        id: "apple-seattle",
        name: "Apple Seattle",
        city: "Seattle",
        country: "United States",
        lat: 47.6062,
        lng: -122.3321,
        company: "Apple (via Grid Dynamics)",
        role: "Backend Lead Contractor",
        period: "2022 - 2025",
        achievements: [
          "Collaborated with Apple architects on JVM tuning and latency optimizations",
          "Led microservice hardening and performance improvements",
          "Championed PoC-driven engineering culture"
        ],
        type: "work",
        size: "large"
      },
      {
        id: "aeo-philadelphia",
        name: "American Eagle Outfitters",
        city: "Philadelphia",
        country: "United States",
        lat: 39.9526,
        lng: -75.1652,
        company: "American Eagle Outfitters (via Grid Dynamics)",
        role: "Technical Lead",
        period: "2022 - 2025",
        achievements: [
          "Directed re-architecture of Loyalty platform",
          "Improved JVM performance and technical scalability",
          "Refactored Returns & Exchanges backend services"
        ],
        type: "work",
        size: "large"
      },
      // Medium work locations
      {
        id: "re-partners-citibank",
        name: "Re-Partners (Citibank)",
        city: "New York",
        country: "United States",
        lat: 40.7128,
        lng: -74.0060,
        company: "Re-Partners",
        role: "Senior Software Engineer (Fixed Risk Management – Citibank)",
        period: "06/2021 - 01/2022",
        achievements: [
          "Designed optimized gRPC communication for FX systems",
          "Implemented backpressure and custom serialization for high-load scenarios",
          "Fixed Risk Management systems for Citibank"
        ],
        type: "work",
        size: "medium"
      },
      {
        id: "varteq-sema4",
        name: "VARTEQ (Sema4)",
        city: "New York",
        country: "United States",
        lat: 40.7128,
        lng: -74.0060,
        company: "VARTEQ Inc. (Client: Sema4)",
        role: "Senior Software Engineer",
        period: "01/2022 - 05/2022",
        achievements: [
          "Developed backend services for predictive health analytics platform",
          "Designed custom validation service for medical files",
          "Co-developed database schema using PostgreSQL inheritance"
        ],
        type: "work",
        size: "medium"
      },
      {
        id: "southern-glazers",
        name: "Southern Glazers",
        city: "Miami",
        country: "United States",
        lat: 25.7617,
        lng: -80.1918,
        company: "Southern Glazer's Wine & Spirits (via Grid Dynamics)",
        role: "Technical Lead",
        period: "2022 - 2025",
        achievements: [
          "Delivered secure MongoDB migration framework for ECS Program",
          "Replaced vulnerable third-party libraries",
          "Built inventory management systems"
        ],
        type: "work",
        size: "medium"
      },
      // Residence locations
      {
        id: "budapest-residence",
        name: "Budapest",
        city: "Budapest",
        country: "Hungary",
        lat: 47.4979,
        lng: 19.0402,
        company: "Current Residence",
        role: "Living & Working",
        period: "06/2025 - Present",
        achievements: [
          "Leading remote teams across Europe",
          "Contributing to global technical initiatives",
          "Building international professional network"
        ],
        type: "residence",
        size: "medium"
      },
      {
        id: "warsaw-residence",
        name: "Warsaw",
        city: "Warsaw",
        country: "Poland",
        lat: 52.2297,
        lng: 21.0122,
        company: "Previous Residence",
        role: "Living & Working",
        period: "2022 - 2025",
        achievements: [
          "Led European technical operations",
          "Managed cross-border development teams",
          "Established regional technical partnerships"
        ],
        type: "residence",
        size: "small"
      },
      {
        id: "baku-residence",
        name: "Baku",
        city: "Baku",
        country: "Azerbaijan",
        lat: 40.4093,
        lng: 49.8671,
        company: "Previous Residence",
        role: "Living & Working",
        period: "2016 - 2021",
        achievements: [
          "Led regional technical initiatives",
          "Managed local development teams",
          "Established technical infrastructure"
        ],
        type: "residence",
        size: "small"
      }
    ],
    [],
  );

  return (
    <section className="min-h-screen py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Stars - Fixed position with much slower animation */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4, // Much slower animation
              repeat: Infinity,
              delay: Math.random() * 5, // Longer delays
            }}
          />
        ))}
      </div>

      {/* Sun Light Effect - Fixed position */}
      <div className="fixed top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-space-grotesk text-cyber-cyan uppercase tracking-wide mb-4">
            Global Experience
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            My journey spans across continents, working with world-class companies
            and delivering mission-critical systems that impact millions of users
            worldwide.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setViewMode("globe")}
            className={`px-4 py-2 rounded-l border ${
              viewMode === "globe"
                ? "bg-cyber-cyan text-black border-cyber-cyan"
                : "bg-gray-700 text-white border-gray-600"
            }`}
          >
            Globe View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-r border ${
              viewMode === "grid"
                ? "bg-cyber-cyan text-black border-cyber-cyan"
                : "bg-gray-700 text-white border-gray-600"
            }`}
          >
            Grid View
          </button>
        </div>

        {/* Main Content */}
        <div className="relative flex justify-center items-center gap-8 px-6 min-h-[1200px]">
          {/* Instructions + Legend */}
          {viewMode === "globe" && (
            <motion.div
              className="absolute left-6 top-6 flex-shrink-0 p-4 border border-white rounded-lg bg-dark-surface text-white max-w-xs space-y-4 z-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* Instructions */}
              <div>
                <h3 className="text-cyber-cyan font-semibold mb-2">INSTRUCTIONS</h3>
                <ul className="text-sm space-y-1">
                  <li>• Drag to rotate the globe</li>
                  <li>• Scroll to zoom in/out</li>
                  <li>• Hover markers for details</li>
                  <li>• Auto-rotation is enabled</li>
                </ul>
              </div>

              {/* Legend */}
              <div className="border-t border-white pt-4">
                <h3 className="text-cyber-cyan font-semibold mb-2">LEGEND</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-cyber-violet rounded-full" />
                    <span className="text-sm">Major Companies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-cyber-cyan rounded-full" />
                    <span className="text-sm">Work Locations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-cyber-pink rounded-full" />
                    <span className="text-sm">Living Places</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Hover Message */}
          {viewMode === "globe" && (
            <motion.div
              className="absolute right-6 top-6 flex-shrink-0 p-4 border border-white rounded-lg bg-dark-surface text-white max-w-xs z-10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm">Hover over a location marker on the globe to see details</p>
            </motion.div>
          )}

          {/* Globe / Grid Pane - Centered */}
          <motion.div
            className="relative w-full max-w-6xl h-[800px] lg:h-[1000px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {viewMode === "globe" ? (
              <EarthGlobe
                locations={locations}
                onLocationHover={handleLocationHover}
                hoveredLocation={hoveredLocation}
              />
            ) : (
              <div className="w-full h-full overflow-y-auto">
                {/* Timeline Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                  {locations
                    .filter(loc => loc.type === 'work')
                    .sort((a, b) => {
                      // Sort by period (most recent first)
                      const getYear = (period: string) => {
                        const year = period.match(/\d{4}/);
                        return year ? parseInt(year[0]) : 0;
                      };
                      return getYear(b.period) - getYear(a.period);
                    })
                    .map((location, index) => (
                      <motion.div
                        key={location.id}
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        {/* Timeline Card */}
                        <div className="relative p-6 border border-gray-600 bg-dark-surface/50 backdrop-blur-sm rounded-lg hover:border-cyber-cyan transition-all duration-300">
                          {/* Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-cyber-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-space-grotesk text-cyber-cyan font-semibold mb-1">
                                  {location.company}
                                </h3>
                                <p className="text-sm text-gray-400 uppercase tracking-wide">
                                  {location.city}, {location.country}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="inline-block px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan text-xs font-medium rounded-full border border-cyber-cyan/30">
                                  {location.size === 'large' ? 'Major' : 'Key'}
                                </span>
                              </div>
                            </div>

                            {/* Role & Period */}
                            <div className="mb-4">
                              <h4 className="text-lg text-white font-medium mb-1">
                                {location.role}
                              </h4>
                              <p className="text-sm text-cyber-violet font-medium">
                                {location.period}
                              </p>
                            </div>

                            {/* Achievements */}
                            <div className="space-y-2">
                              {location.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-gray-300 leading-relaxed">
                                    {achievement}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Location Badge */}
                            <div className="mt-4 pt-4 border-t border-gray-600">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-cyber-cyan rounded-full" />
                                <span className="text-xs text-gray-400 uppercase tracking-wide">
                                  {location.city}, {location.country}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect */}
                          <div className="absolute inset-0 border-2 border-cyber-cyan/0 group-hover:border-cyber-cyan/30 rounded-lg transition-all duration-300" />
                        </div>
                      </motion.div>
                    ))}
                </div>

                {/* Residence Section */}
                <div className="mt-8 p-4">
                  <h3 className="text-2xl font-space-grotesk text-cyber-violet mb-6 text-center">
                    Living & Working Locations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {locations
                      .filter(loc => loc.type === 'residence')
                      .sort((a, b) => {
                        const getYear = (period: string) => {
                          const year = period.match(/\d{4}/);
                          return year ? parseInt(year[0]) : 0;
                        };
                        return getYear(b.period) - getYear(a.period);
                      })
                      .map((location, index) => (
                        <motion.div
                          key={location.id}
                          className="relative group"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="p-4 border border-gray-600 bg-dark-surface/30 rounded-lg hover:border-cyber-violet transition-all duration-300">
                            <div className="text-center">
                              <h4 className="text-lg font-space-grotesk text-cyber-violet font-semibold mb-2">
                                {location.city}
                              </h4>
                              <p className="text-sm text-gray-400 mb-2">
                                {location.country}
                              </p>
                              <p className="text-xs text-cyber-violet font-medium">
                                {location.period}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Metrics Boxes */}
          {viewMode === "globe" && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
              {[
                { number: "3", label: "CONTINENTS" },
                { number: "8", label: "CITIES" },
                { number: "10+", label: "COMPANIES" },
                { number: "9+", label: "YEARS GLOBAL" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-3 border border-white rounded-lg text-center bg-dark-surface"
                  whileHover={{ scale: 1.05, borderColor: "#06b6d4" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl font-bold text-cyber-cyan">{metric.number}</div>
                  <div className="text-xs text-white uppercase tracking-wide">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredLocation && viewMode === "globe" && (
        <motion.div
          className="fixed z-50 bg-dark-surface border border-cyber-cyan/30 p-4 rounded-lg shadow-2xl max-w-sm"
          style={{ left: "50%", top: "20%", transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {(() => {
            const loc = locations.find((l) => l.id === hoveredLocation);
            if (!loc) return null;
            return (
              <div className="space-y-3">
                <h3 className="text-lg text-cyber-cyan font-semibold">
                  {loc.company}
                </h3>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  {loc.city}, {loc.country}
                </p>
                <p className="text-sm text-cyber-violet font-medium">
                  {loc.role}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {loc.period}
                </p>
                <div className="space-y-2">
                  {loc.achievements.slice(0, 2).map((a, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-cyber-cyan mt-2 flex-shrink-0" />
                      <p className="text-xs text-gray-300">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </section>
  );
}