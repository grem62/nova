"use client";

import { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SceneLighting } from "./SceneLighting";
import { HeroObject } from "./HeroObject";
import { sceneState } from "@/lib/sceneState";

function CameraController() {
  const { camera } = useThree();
  const baseZ = 6;

  useFrame(() => {
    const targetZ = baseZ + sceneState.cameraOffsetZ;
    // R3F camera updates are imperative in the render loop.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneLighting />
        <HeroObject />
        <EffectComposer multisampling={2}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.4}
          />
        </EffectComposer>
      </Suspense>
      <CameraController />
    </Canvas>
  );
}
