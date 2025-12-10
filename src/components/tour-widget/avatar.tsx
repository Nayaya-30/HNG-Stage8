'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta / 4;
      meshRef.current.rotation.y += delta / 2;
    }
  });
  
  return (
    <Sphere
      args={[1, 100, 200]}
      ref={meshRef}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshDistortMaterial
        color="#4f46e5"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
}

export function TourAvatar() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 h-24 w-24 rounded-full bg-white p-2 shadow-lg">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
