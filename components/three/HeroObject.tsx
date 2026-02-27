"use client";

import { useRef } from "react";
import { Group, Mesh, MeshPhysicalMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { sceneState } from "@/lib/sceneState";
import { useMouseInertia } from "@/hooks/useMouseInertia";

export function HeroObject() {
  const group = useRef<Group>(null);
  const glassRef = useRef<Mesh>(null);
  const chromeRef = useRef<Mesh>(null);
  const pointer = useMouseInertia();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const g = group.current;

    if (!g) return;

    const targetRotY = pointer.current.x * 0.35 + t * 0.12;
    const targetRotX = pointer.current.y * 0.25 - 0.2;

    g.rotation.y += (targetRotY - g.rotation.y) * 0.08;
    g.rotation.x += (targetRotX - g.rotation.x) * 0.08;

    const baseScale = 1;
    const targetScale = baseScale * sceneState.heroScale;
    const lerpStrength = 0.12;
    g.scale.x += (targetScale - g.scale.x) * lerpStrength;
    g.scale.y += (targetScale - g.scale.y) * lerpStrength;
    g.scale.z += (targetScale - g.scale.z) * lerpStrength;

    if (glassRef.current) {
      glassRef.current.position.y = Math.sin(t * 0.9) * 0.15;
    }
    if (chromeRef.current) {
      chromeRef.current.rotation.z = t * 0.4;
    }
  });

  const glassMaterial = new MeshPhysicalMaterial({
    color: "#60a5fa",
    roughness: 0.1,
    metalness: 0.2,
    transmission: 0.98,
    ior: 1.4,
    thickness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.05
  });

  const chromeMaterial = new MeshPhysicalMaterial({
    color: "#e5e7eb",
    roughness: 0.08,
    metalness: 1,
    reflectivity: 1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.08
  });

  return (
    <group ref={group}>
      <mesh ref={glassRef} castShadow receiveShadow material={glassMaterial}>
        <torusKnotGeometry args={[1.1, 0.32, 160, 32]} />
      </mesh>

      <mesh
        ref={chromeRef}
        castShadow
        receiveShadow
        material={chromeMaterial}
        position={[0.2, 0.1, -0.6]}
      >
        <icosahedronGeometry args={[0.7, 0]} />
      </mesh>

      <mesh position={[-1.4, -0.8, -0.4]} material={glassMaterial}>
        <sphereGeometry args={[0.35, 32, 32]} />
      </mesh>
      <mesh position={[1.3, 0.9, 0.3]} material={chromeMaterial}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>
    </group>
  );
}

