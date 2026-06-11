"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AmbientScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    const clock = new THREE.Clock();
    camera.position.z = 8;

    const count = 900;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const radius = 1.5 + Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 2;
      scales[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#ffc492") },
        uColorB: { value: new THREE.Color("#c4e4ea") },
      },
      vertexShader: `
        attribute float scale;
        uniform float uTime;
        varying float vScale;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.35 + position.y * 1.4) * 0.18;
          p.y += cos(uTime * 0.22 + position.x * 0.8) * 0.14;
          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (2.0 + scale * 6.0) * (8.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vScale = scale;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vScale;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float alpha = smoothstep(0.5, 0.0, length(uv));
          vec3 color = mix(uColorA, uColorB, vScale);
          gl_FragColor = vec4(color, alpha * 0.34);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    let frame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      points.rotation.y = elapsed * 0.025;
      points.rotation.z = Math.sin(elapsed * 0.12) * 0.08;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-scene" aria-hidden="true" />;
}
