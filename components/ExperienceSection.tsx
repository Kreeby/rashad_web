"use client";

/**
 * ExperienceSection – full, self-contained.
 * • Globe view (with onMarkerHover tooltip).
 * • Timeline view (grouped Grid Dynamics sub-projects).
 * Updated 2025-07-31 per latest user feedback.
 */

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { EarthGlobe, type Location } from "./EarthGlobe";

interface TimelineSubProject {
  title: string;
  period: string;
  achievements: string[];
}

interface TimelineCard {
  company: string;
  role: string;
  period: string;
  location: string;
  logo: string;
  achievements: string[];
  color: string;
  subProjects?: TimelineSubProject[];
}

export function ExperienceSection() {
  /* ───────── state */
  const [viewMode, setViewMode] = useState<"globe" | "timeline">("globe");
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ id: string; x: number; y: number } | null>(null);

  /* ───────── handlers */
  const handleLocationHover = useCallback((id: string | null) => {
    setHoveredLocation(id);
    if (!id) setTooltip(null);
  }, []);

  const handleMarkerHover = useCallback((info: { id: string; x: number; y: number } | null) => {
    setTooltip(info);
    if (info) setHoveredLocation(info.id);
  }, []);

  /* ───────── background stars */
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
      })),
    []
  );

  /* ───────── locations (markers on globe) */
  const locations: Location[] = useMemo(
    () => [
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
          "Leading engineering efforts across Germany region",
          "Managing 40+ indirect contributors",
          "Driving architectural consistency",
        ],
        type: "work",
        size: "large",
      },
      {
        id: "grid-dynamics",
        name: "Grid Dynamics (Warsaw)",
        city: "Warsaw",
        country: "Poland",
        lat: 52.2297,
        lng: 21.0122,
        company: "Grid Dynamics",
        role: "Engineering Manager | Technical Lead",
        period: "05/2022 - 05/2025",
        achievements: ["Led Visa, Apple, AEO & SGWS squads", "Engineer of the Year 2023"],
        type: "work",
        size: "large",
      },
      // client sites via GD (corrected periods)
      {
        id: "aeo-philadelphia",
        name: "AEO Philadelphia",
        city: "Philadelphia",
        country: "USA",
        lat: 39.9526,
        lng: -75.1652,
        company: "AEO (via GD)",
        role: "Technical Lead",
        period: "2022 - 2023",
        achievements: ["Loyalty platform re-architecture"],
        type: "work",
        size: "medium",
      },
      {
        id: "southern-glazers",
        name: "SGWS Miami",
        city: "Miami",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        company: "SGWS (via GD)",
        role: "Technical Lead",
        period: "2023",
        achievements: ["Secure MongoDB migration"],
        type: "work",
        size: "medium",
      },
      {
        id: "visa-san-ramon",
        name: "Visa San Ramon",
        city: "San Ramon",
        country: "USA",
        lat: 37.7799,
        lng: -121.978,
        company: "Visa (via GD)",
        role: "Technical Lead",
        period: "2023 - 2024",
        achievements: ["Commercial card authentication platform"],
        type: "work",
        size: "medium",
      },
      {
        id: "apple-seattle",
        name: "Apple Seattle",
        city: "Seattle",
        country: "USA",
        lat: 47.6062,
        lng: -122.3321,
        company: "Apple (via GD)",
        role: "Backend Lead Contractor",
        period: "2024 - 2025",
        achievements: ["JVM tuning & latency optimisations"],
        type: "work",
        size: "medium",
      },
      // pre-GD
      {
        id: "re-partners",
        name: "Re-Partners (Citibank)",
        city: "Remote",
        country: "USA",
        lat: 40.7128,
        lng: -74.006,
        company: "Re-Partners",
        role: "Senior Software Engineer",
        period: "01/2022 - 05/2022",
        achievements: ["Optimised gRPC for FX risk"],
        type: "work",
        size: "medium",
      },
      {
        id: "varteq-sema4",
        name: "VARTEQ (Sema4)",
        city: "Remote",
        country: "USA",
        lat: 40.7128,
        lng: -74.006,
        company: "VARTEQ Inc.",
        role: "Senior Software Engineer",
        period: "06/2021 - 01/2022",
        achievements: ["Predictive health analytics backend"],
        type: "work",
        size: "medium",
      },
      // residences
      { id: "budapest-residence", name: "Budapest", city: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402, company: "Current Residence", role: "Living & Working", period: "06/2025 - Present", achievements: [], type: "residence", size: "medium" },
      { id: "warsaw-residence", name: "Warsaw", city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122, company: "Previous Residence", role: "Living & Working", period: "2022 - 2025", achievements: [], type: "residence", size: "small" },
      { id: "baku-residence", name: "Baku", city: "Baku", country: "Azerbaijan", lat: 40.4093, lng: 49.8671, company: "Previous Residence", role: "Living & Working", period: "2016 - 2021", achievements: [], type: "residence", size: "small" },
    ],
    []
  );

  /* ───────── timeline cards */
  const timelineCards: TimelineCard[] = useMemo(() => {
    const find = (id: string) => locations.find((l) => l.id === id)!;

    const gridSubs = [
      "aeo-philadelphia", // 2022-2023
      "southern-glazers", // 2023
      "visa-san-ramon",   // 2023-2024
      "apple-seattle",    // 2024-2025
    ];

    return [
      // bp / aral
      {
        company: find("bp-budapest").company,
        role: find("bp-budapest").role,
        period: find("bp-budapest").period,
        location: "Budapest, Hungary",
        logo: "⛽",
        achievements: find("bp-budapest").achievements,
        color: "cyber-violet",
      },
      // grid dynamics (with ordered sub-projects)
      {
        company: find("grid-dynamics").company,
        role: find("grid-dynamics").role,
        period: find("grid-dynamics").period,
        location: "Warsaw, Poland",
        logo: "🔲",
        achievements: find("grid-dynamics").achievements,
        color: "cyber-cyan",
        subProjects: gridSubs.map((sid) => {
          const l = find(sid);
          return { title: l.company, period: l.period, achievements: l.achievements };
        }),
      },
      // Re-Partners
      {
        company: find("re-partners").company,
        role: find("re-partners").role,
        period: find("re-partners").period,
        location: "Remote, USA",
        logo: "💳",
        achievements: find("re-partners").achievements,
        color: "cyber-purple",
      },
      // VARTEQ (Sema4)
      {
        company: find("varteq-sema4").company,
        role: find("varteq-sema4").role,
        period: find("varteq-sema4").period,
        location: "Remote, USA",
        logo: "🧬",
        achievements: find("varteq-sema4").achievements,
        color: "cyber-blue",
      },
      // New: Various roles in Baku
      {
        company: "Various Software Engineering Roles",
        role: "Software Engineer",
        period: "2016 - 2021",
        location: "Baku, Azerbaijan",
        logo: "💻",
        achievements: ["Full-stack development across multiple local companies"],
        color: "cyber-purple",
      },
    ];
  }, [locations]);

  const metrics = useMemo(
    () => [
      { number: "3", label: "CONTINENTS" },
      { number: "8", label: "CITIES" },
      { number: "10+", label: "COMPANIES" },
      { number: "9+", label: "YEARS GLOBAL" },
    ],
    []
  );

  /* ───────── render */
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-dark-surface to-dark-bg relative overflow-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-6 gap-4 h-full w-full p-8">
          {Array.from({ length: 150 }).map((_, i) => (
            <div key={i} className="border border-cyber-violet" />
          ))}
        </div>
      </div>

      {/* static stars */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute bg-white rounded-full"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      {/* sun glow */}
      <div className="fixed top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-space-grotesk text-cyber-cyan uppercase tracking-wide mb-4">Experience</h2>
          <div className="w-24 h-0.5 bg-cyber-violet mx-auto" />
        </motion.div>

        {/* view toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-dark-surface/50 border border-gray-600 p-1">
            {( ["globe", "timeline"] as const ).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`px-6 py-3 font-space-grotesk transition-all ${viewMode === v ? "bg-cyber-cyan text-black" : "text-gray-300 hover:text-white"}`}
              >
                {v === "globe" ? "Globe View" : "Timeline View"}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "globe" ? (
          /* ───────── Globe view */
          <div className="relative flex justify-center items-center gap-8 px-6 min-h-[1000px]">
            {/* instructions */}
            <motion.div
              className="absolute left-6 top-6 p-4 border border-gray-600 bg-dark-surface text-white max-w-xs space-y-4 z-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-cyber-cyan font-space-grotesk font-semibold mb-2">INSTRUCTIONS</h3>
              <ul className="text-sm space-y-1 font-space-grotesk">
                <li>• Drag to rotate the globe</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Hover markers for details</li>
                <li>• Auto-rotation is enabled</li>
              </ul>
              <div className="border-t border-gray-600 pt-4">
                <h3 className="text-cyber-cyan font-space-grotesk font-semibold mb-2">LEGEND</h3>
                <div className="space-y-2 font-space-grotesk text-sm">
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-cyber-violet" /> <span>Major Companies</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-cyber-cyan" /> <span>Work Locations</span></div>
                  <div className="flex items-center space-x-2"><span className="w-3 h-3 bg-cyber-purple" /> <span>Living Places</span></div>
                </div>
              </div>
            </motion.div>

            {/* empty-hover prompt */}
            {!tooltip && (
              <motion.div
                className="absolute right-6 top-6 p-4 border border-gray-600 bg-dark-surface text-white max-w-xs z-10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="text-sm font-space-grotesk">Hover a marker to see details</p>
              </motion.div>
            )}

            {/* globe */}
            <motion.div
              className="relative w-full max-w-6xl h-[800px] lg:h-[1000px] flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <EarthGlobe locations={locations} onLocationHover={handleLocationHover} onMarkerHover={handleMarkerHover} />
            </motion.div>

            {/* metrics */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  className="px-4 py-3 border border-gray-600 text-center bg-dark-surface hover:border-cyber-violet"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-2xl font-space-grotesk font-bold text-cyber-cyan">{m.number}</div>
                  <div className="text-xs font-space-grotesk text-white uppercase tracking-wide">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* ───────── Timeline view */
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyber-violet via-cyber-cyan to-cyber-purple" />

            <div className="space-y-16">
              {timelineCards.map((card, idx) => (
                <motion.div
                  key={card.company}
                  className={`relative grid grid-cols-12 gap-8 items-start ${idx % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-20">
                    <motion.div className={`w-6 h-6 bg-${card.color} border-4 border-dark-bg`} whileHover={{ scale: 1.5 }} />
                  </div>

                  {/* card */}
                  <motion.div
                    className={`col-span-12 lg:col-span-5 ${idx % 2 === 0 ? "lg:col-start-1" : "lg:col-start-8"}`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="relative p-6 border border-gray-600 bg-dark-muted/50 group hover:border-cyber-violet">
                      <div className={`absolute inset-0 bg-${card.color}/5 opacity-0 group-hover:opacity-100`} />

                      <div className="relative z-10 space-y-4">
                        {/* header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{card.logo}</div>
                            <div>
                              <h3 className={`text-xl font-space-grotesk text-${card.color} font-semibold`}>{card.company}</h3>
                              <p className="text-gray-300 font-space-grotesk font-medium">{card.role}</p>
                            </div>
                          </div>
                          <div className={`text-${card.color} font-space-grotesk text-sm uppercase tracking-wide`}>{card.period}</div>
                        </div>

                        {/* location */}
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-sm font-space-grotesk">{card.location}</span>
                        </div>

                        {/* achievements */}
                        <ul className="space-y-2 list-disc list-inside text-gray-300 text-sm font-space-grotesk">
                          {card.achievements.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>

                        {/* sub-projects */}
                        {card.subProjects && (
                          <div className="pt-4 border-t border-gray-600 space-y-4">
                            {card.subProjects.map((sp, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-cyber-cyan">{sp.title}</span>
                                  <span className="text-xs text-gray-400 uppercase">{sp.period}</span>
                                </div>
                                <ul className="list-disc list-inside text-gray-400 text-xs space-y-1">
                                  {sp.achievements.map((ach, k) => (
                                    <li key={k}>{ach}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* spacer */}
                  <div className={`hidden lg:block col-span-5 ${idx % 2 === 0 ? "col-start-8" : "col-start-1"}`} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* tooltip */}
      {tooltip && viewMode === "globe" && (
        <motion.div
          className="fixed z-50 bg-dark-surface border border-cyber-cyan/30 p-4 shadow-2xl max-w-sm"
          style={{ left: tooltip.x, top: tooltip.y - 20, transform: "translate(-50%,-100%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {(() => {
            const loc = locations.find((l) => l.id === tooltip.id);
            if (!loc) return null;
            return (
              <div className="space-y-2">
                <h3 className="text-lg font-space-grotesk text-cyber-cyan font-semibold">{loc.company}</h3>
                <p className="text-sm text-gray-400 uppercase tracking-wide font-space-grotesk">
                  {loc.city}, {loc.country}
                </p>
                <p className="text-sm text-cyber-violet font-space-grotesk font-medium">{loc.role}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-space-grotesk">{loc.period}</p>
              </div>
            );
          })()}
        </motion.div>
      )}
    </section>
  );
}
