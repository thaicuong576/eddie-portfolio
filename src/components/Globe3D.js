import React, { useRef, useEffect } from "react";
import * as THREE from "three";

// Financial hub cities [name, lat, lng, isHome]
const CITIES = [
  ["Ho Chi Minh", 10.82, 106.63, true],
  ["Singapore", 1.35, 103.82, false],
  ["Hong Kong", 22.32, 114.17, false],
  ["Tokyo", 35.68, 139.69, false],
  ["New York", 40.71, -74.01, false],
  ["London", 51.51, -0.13, false],
  ["Dubai", 25.2, 55.27, false],
  ["Sydney", -33.87, 151.21, false],
  ["Seoul", 37.57, 126.98, false],
  ["Mumbai", 19.08, 72.88, false],
  ["Zurich", 47.37, 8.54, false],
  ["San Francisco", 37.77, -122.42, false],
];

const CONNECTIONS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 2], [1, 7], [2, 3], [4, 5], [4, 11], [5, 10],
  [3, 8], [6, 9],
];

function latLngToVec3(lat, lng, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function Globe3D() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Globe wireframe
    const globeGeo = new THREE.SphereGeometry(2, 36, 36);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a5f,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Globe inner glow
    const innerGeo = new THREE.SphereGeometry(1.98, 48, 48);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.04,
    });
    const innerGlobe = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerGlobe);

    // City nodes
    const cityMeshes = [];
    CITIES.forEach(([name, lat, lng, isHome]) => {
      const pos = latLngToVec3(lat, lng, 2.05);
      const geo = new THREE.SphereGeometry(isHome ? 0.06 : 0.032, 12, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: isHome ? 0xfbbf24 : 0x60a5fa,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      globe.add(mesh);
      cityMeshes.push(mesh);

      // Glow ring for home city
      if (isHome) {
        const ringGeo = new THREE.RingGeometry(0.08, 0.13, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        ring.lookAt(0, 0, 0);
        globe.add(ring);
      }
    });

    // Connection arcs
    CONNECTIONS.forEach(([fromIdx, toIdx]) => {
      const from = CITIES[fromIdx];
      const to = CITIES[toIdx];
      const start = latLngToVec3(from[1], from[2], 2.05);
      const end = latLngToVec3(to[1], to[2], 2.05);

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(2.05 + dist * 0.18);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: fromIdx === 0 ? 0xfbbf24 : 0x3b82f6,
        transparent: true,
        opacity: fromIdx === 0 ? 0.45 : 0.15,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      globe.add(line);
    });

    // Orbiting data particles
    const particleCount = 40;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 2.15 + Math.random() * 0.25;
      particlePositions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = r * Math.cos(theta);
      particlePositions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const pMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.025,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse interaction
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationSpeedX = 0;
    let rotationSpeedY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;
      rotationSpeedY = deltaX * 0.005;
      rotationSpeedX = deltaY * 0.003;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseUp);

    // Touch support
    const onTouchStart = (e) => {
      isDragging = true;
      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;
      rotationSpeedY = deltaX * 0.005;
      rotationSpeedX = deltaY * 0.003;
      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    // Animation loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Auto-rotate + manual drag
      if (!isDragging) {
        rotationSpeedY *= 0.95; // decay
        rotationSpeedX *= 0.95;
        globe.rotation.y += 0.003 + rotationSpeedY;
        globe.rotation.x =
          Math.sin(elapsed * 0.15) * 0.1 + rotationSpeedX;
      } else {
        globe.rotation.y += rotationSpeedY;
        globe.rotation.x += rotationSpeedX;
      }

      // Pulse city nodes
      cityMeshes.forEach((mesh, i) => {
        const s = 1 + Math.sin(elapsed * 2.5 + i * 0.7) * 0.25;
        mesh.scale.setScalar(s);
      });

      // Rotate particles slightly differently
      particles.rotation.y += 0.004;
      particles.rotation.x = Math.sin(elapsed * 0.2) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "450px",
        cursor: "grab",
      }}
    />
  );
}

export default Globe3D;
