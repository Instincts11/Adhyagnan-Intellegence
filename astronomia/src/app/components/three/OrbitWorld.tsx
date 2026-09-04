"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrbitWorld({ height = 460 }: { height?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.35, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x07090e, 0);
    mount.appendChild(renderer.domElement);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 520;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 24;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xc9deff, size: 0.018, transparent: true, opacity: 0.85 })
    );
    scene.add(stars);

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const sky = ctx.createLinearGradient(0, 0, 1024, 512);
      sky.addColorStop(0, "#10244d");
      sky.addColorStop(0.35, "#2f6fb3");
      sky.addColorStop(0.62, "#c9a06a");
      sky.addColorStop(1, "#0b1630");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 1024, 512);
      ctx.globalAlpha = 0.28;
      for (let i = 0; i < 28; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? "#9fd0ff" : "#1b3a68";
        ctx.fillRect(0, i * 18, 1024, 10);
      }
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < 40; i += 1) {
        ctx.beginPath();
        ctx.fillStyle = "#e8f3ff";
        ctx.arc(Math.random() * 1024, Math.random() * 512, Math.random() * 8 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;

    const planetGeo = new THREE.SphereGeometry(1, 72, 72);
    const planet = new THREE.Mesh(
      planetGeo,
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.62,
        metalness: 0.12,
        emissive: new THREE.Color("#12305c"),
        emissiveIntensity: 0.12,
      })
    );
    scene.add(planet);

    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.09, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0x7ec8ff,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
      })
    );
    scene.add(atmo);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.42, 2.05, 80),
      new THREE.MeshBasicMaterial({
        color: 0xb7d4ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.32,
      })
    );
    ring.rotation.x = Math.PI / 2.35;
    scene.add(ring);

    scene.add(new THREE.AmbientLight(0x7ea2e0, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.55);
    key.position.set(4.2, 2.4, 3.2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x66a0ff, 0.6);
    rim.position.set(-3, -1, -2);
    scene.add(rim);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      planet.rotation.y += 0.0038;
      atmo.rotation.y += 0.0018;
      ring.rotation.z += 0.0012;
      stars.rotation.y += 0.00035;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      planetGeo.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      style={{ width: "100%", height, minHeight: height }}
    />
  );
}
