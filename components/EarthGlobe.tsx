import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
  type: 'work' | 'residence';
  size: 'small' | 'medium' | 'large';
}

interface EarthGlobeProps {
  locations: Location[];
  onLocationHover: (id: string | null) => void;
  hoveredLocation: string | null;
}

export function EarthGlobe({
  locations,
  onLocationHover,
  hoveredLocation,
}: EarthGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hold onto our marker meshes so we can ray-cast only them:
  const markerMeshes = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);

  // 🔧 CHANGED — keep these outside animate() so the ray updates every frame
  const raycaster = useRef(new THREE.Raycaster()).current;
  const mouse = useRef(new THREE.Vector2(-1000, -1000)).current; // start off-canvas
  let lastHoveredId: string | null = null;                       // tracks state across frames

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene / Camera / Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 3;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI - Math.PI / 6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.3;

    // Lights
    scene.add(new THREE.AmbientLight(0x555555));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(dirLight);

    // Earth with water mask texture for continent layout
    const earthGeo = new THREE.SphereGeometry(1, 64, 64);

    // Simply load and use the classic world map texture
    new THREE.TextureLoader().load(
      'https://upload.wikimedia.org/wikipedia/commons/0/09/BlankMap-World-v2.png',
      (texture) => {
        const earthMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          metalness: 0.1,
          roughness: 0.8,
        });
        const earthMesh = new THREE.Mesh(earthGeo, earthMat);
        earthMesh.rotation.y = Math.PI;
        scene.add(earthMesh);
      },
    );

    // Atmospheric glow effect
    const atmosphereGeo = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    
    // Helper to convert lat/lng → sphere coords
    const latLngTo3D = (lat: number, lng: number, r: number) => {
        const φ = THREE.MathUtils.degToRad(lat);   // latitude  (+N / -S)
        const λ = THREE.MathUtils.degToRad(lng);   // longitude (+E / -W)
  
        return {
          x: r * Math.cos(φ) * Math.sin(λ),
          y: r * Math.sin(φ),
          z: r * Math.cos(φ) * Math.cos(λ),
        };
      };

    // 🔧 CHANGED — slightly smaller markers
    const getSize = (s: 'small' | 'medium' | 'large') =>
      s === 'large' ? 0.06 : s === 'medium' ? 0.045 : 0.03;
    const getColor = (t: 'work' | 'residence') =>
      t === 'work' ? '#06b6d4' : '#8b5cf6';

    // Create one sphere-mesh per location and store in markerMeshes
    markerMeshes.current = locations.map((loc) => {
      const pos = latLngTo3D(loc.lat, loc.lng, 1.02);
      const color = new THREE.Color(getColor(loc.type));
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(getSize(loc.size), 16, 16),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.2,
        }),
      );
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.userData = { locationId: loc.id };
      scene.add(mesh);
      return mesh;
    });

    /* ─────────── Mouse / ray-cast handlers ─────────── */

    // 🔧 CHANGED — update mouse vector only, leave casting to animate()
    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // When leaving the canvas, push the cursor far away so we never get hits
    renderer.domElement.addEventListener('mouseleave', () => {
      mouse.set(-1000, -1000);
      onLocationHover(null);
      lastHoveredId = null;
    });

    /* ─────────── Animation loop ─────────── */
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate earth via controls.autoRotate
      controls.update();

      // Update daylight direction
      const now = new Date();
      const hours =
        now.getUTCHours() +
        now.getUTCMinutes() / 60 +
        now.getUTCSeconds() / 3600;
      const theta = (hours / 24) * Math.PI * 2;
      const dist = 100;
      dirLight.position.set(dist * Math.cos(theta), 0, dist * Math.sin(theta));

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }

      // Pulse atmosphere
      if (atmosphereRef.current) {
        const time = Date.now() * 0.001;
        const atmosphereMat = atmosphereRef.current
          .material as THREE.MeshBasicMaterial;
        atmosphereMat.opacity = 0.1 + Math.sin(time * 2) * 0.05;
      }

      /* ----- 🔧 CHANGED — do ray-cast every frame ----- */
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerMeshes.current, false);
      const hoveredId = hits[0]?.object.userData.locationId ?? null;

      if (hoveredId !== lastHoveredId) {
        onLocationHover(hoveredId);
        lastHoveredId = hoveredId;
      }

      markerMeshes.current.forEach((m) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity =
          m.userData.locationId === hoveredId ? 0.5 : 0.2;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ─────────── Resize & cleanup ─────────── */
    const onResize = () => {
      const w = containerRef.current!.clientWidth;
      const h = containerRef.current!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [locations, onLocationHover]);

  return <div ref={containerRef} className="w-full h-full" />;
}
