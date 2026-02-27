"use client";

import { Color } from "three";

export function SceneLighting() {
  return (
    <>
      <color attach="background" args={["#050815"]} />
      <fog attach="fog" args={[new Color("#050815"), 10, 22]} />

      <ambientLight intensity={0.5} />

      <directionalLight
        position={[6, 10, 4]}
        intensity={2}
        color="#a5b4fc"
      />
      <directionalLight
        position={[-4, -6, -4]}
        intensity={1.4}
        color="#38bdf8"
      />
      <spotLight
        position={[0, 6, 8]}
        angle={0.6}
        penumbra={0.6}
        intensity={1.6}
        color="#f97316"
      />
    </>
  );
}

