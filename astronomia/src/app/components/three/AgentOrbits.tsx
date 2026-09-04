"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AgentOrbits({ height = 380 }: { height?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x07090e, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x88aadd, 0.7));
    const light = new THREE.PointLight(0xffffff, 40, 20);
    light.position.set(0, 2, 4);
    scene.add(light);

    const kepler = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 48, 48),
      new THREE.MeshStandardMaterial({ color: 0x7aa2ff, emissive: 0x1a3d8a, roughness: 0.35 })
    );
    const hopper = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 48, 48),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, emissive: 0x14532d, roughness: 0.35 })
    );
    scene.add(kepler, hopper);

    const curve = new THREE.EllipseCurve(0, 0, 2.2, 1.15, 0, Math.PI * 2, false, 0);
    const path = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(80).map((p) => new THREE.Vector3(p.x, p.y, 0))
      ),
      new THREE.LineBasicMaterial({ color: 0x8fb6ff, transparent: true, opacity: 0.35 })
    );
    path.rotation.x = 0.6;
    scene.add(path);

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

    let t = 0;
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      t += 0.012;
      kepler.position.set(Math.cos(t) * 2.2, Math.sin(t) * 0.4, Math.sin(t) * 1.15);
      hopper.position.set(Math.cos(t + Math.PI) * 2.2, Math.sin(t + Math.PI) * 0.4, Math.sin(t + Math.PI) * 1.15);
      kepler.rotation.y += 0.02;
      hopper.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} aria-hidden style={{ width: "100%", height }} />;
}
