"use client";

/**
 * EarthGlobe 2025-07-31h (finished)
 * ────────────────────────────────────────────────────────────────────────────
 *  • Hit-сфера центрирована, радиус ×3
 *  • Tooltip coords через onMarkerHover
 *  • Звёзды не дёргаются (в ExperienceSection)
 *  • Файл теперь завершён: полный cleanup и JSX-return
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface Location {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  company: string;
  role: string;
  period: string;
  achievements: string[];
  type: "work" | "residence";
  size: "small" | "medium" | "large";
}

interface Props {
  locations: Location[];
  onLocationHover?: (id: string | null) => void;
  onMarkerHover?: (info: { id: string; x: number; y: number } | null) => void;
  hoveredLocation?: string | null;
}

/* ───────── constants ───────── */
const EARTH_RADIUS = 0.5;
const MARKER_BASE_R = EARTH_RADIUS * 1.04;
const LON_OFFSET = -24; // глобальный поворот текстуры
const HIT_FACTOR = 3;   // радиус hit-сферы > маркера

const sizeFor = (s: Location["size"]) =>
  s === "large" ? 0.015 : s === "medium" ? 0.009 : 0.006;
const colorFor = (t: Location["type"]) => (t === "work" ? 0x06b6d4 : 0x8b5cf6);

/* ───────────────────────────── */
export function EarthGlobe({
  locations,
  onLocationHover = () => {},
  onMarkerHover,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markerMeshes = useRef<THREE.Mesh[]>([]);
  const hitMeshes = useRef<THREE.Mesh[]>([]);
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2(-1000, -1000)).current;
  let lastHoveredId: string | null = null;

  const latLngToVec = (lat: number, lng: number, r: number) => {
    const phi = THREE.MathUtils.degToRad(93 - lat);
    const theta = THREE.MathUtils.degToRad(lng + LON_OFFSET);
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      -r * Math.sin(phi) * Math.sin(theta)
    );
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* ───── scene / camera / renderer */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    /* ───── controls */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.15;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    /* ───── lights */
    scene.add(new THREE.AmbientLight(0x404040, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    /* ───── earth group */
    const globe = new THREE.Group();
    globe.rotation.y = -Math.PI / 2; // выставляем 0° меридиан вперёд
    scene.add(globe);

    const earthMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x050505,
      metalness: 0.3,
      roughness: 0.8,
    });
    const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 64, 64), earthMat);
    globe.add(earth);
    new THREE.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/0/09/BlankMap-World-v2.png", (t) => {
      earthMat.map = t;
      earthMat.needsUpdate = true;
    });

    /* ───── markers + hit-сферы */
    markerMeshes.current = [];
    hitMeshes.current = [];

    locations.forEach((loc) => {
      const pos = latLngToVec(loc.lat, loc.lng, MARKER_BASE_R);

      // видимый маркер
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(sizeFor(loc.size), 12, 12),
        new THREE.MeshStandardMaterial({
          color: colorFor(loc.type),
          emissive: colorFor(loc.type),
          emissiveIntensity: 0.4,
        })
      );
      marker.position.copy(pos);
      marker.userData.locationId = loc.id;
      globe.add(marker);
      markerMeshes.current.push(marker);

      // hit-сфера
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(sizeFor(loc.size) * HIT_FACTOR, 8, 8),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
      );
      hit.position.copy(pos);
      hit.userData.locationId = loc.id;
      globe.add(hit);
      hitMeshes.current.push(hit);

      // glow для крупных
      if (loc.size === "large") {
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(sizeFor(loc.size) * 1.6, 12, 12),
          new THREE.MeshBasicMaterial({ color: colorFor(loc.type), transparent: true, opacity: 0.25 })
        );
        halo.position.copy(pos);
        globe.add(halo);
      }
    });

    /* ───── mouse */
    const onMouseMove = (e: MouseEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseleave", () => {
      mouse.set(-1000, -1000);
      onLocationHover(null);
      onMarkerHover?.(null);
      lastHoveredId = null;
    });

    /* ───── loop */
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(hitMeshes.current, false)[0];
      const hoveredId = hit?.object.userData.locationId ?? null;

      if (hoveredId !== lastHoveredId) {
        lastHoveredId = hoveredId;
        onLocationHover(hoveredId);
      }

      if (onMarkerHover) {
        if (hit) {
          const vec = (hit.object as THREE.Object3D).getWorldPosition(new THREE.Vector3());
          vec.project(camera);
          const rect = renderer.domElement.getBoundingClientRect();
          const x = ((vec.x + 1) / 2) * rect.width + rect.left;
          const y = (-(vec.y - 1) / 2) * rect.height + rect.top;
          onMarkerHover({ id: hoveredId!, x, y });
        } else {
          onMarkerHover(null);
        }
      }

      const t = Date.now() * 0.006;
      markerMeshes.current.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        const active = m.userData.locationId === hoveredId;
        mat.emissiveIntensity = active ? 1 : 0.4;
        m.scale.setScalar(1 + (active ? Math.sin(t) * 0.25 : 0));
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ───── resize & cleanup */
    const onResize = () => {
      if (!containerRef.current) return;
      const { clientWidth: w, clientHeight: h } = containerRef.current;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, [locations, onLocationHover, onMarkerHover]);

  return <div ref={containerRef} className="w-full h-full" />;
}
