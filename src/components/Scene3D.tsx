"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sphere, Environment } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

function Blob() {
  const ref = useRef<Mesh>(null);
  return (
    <Sphere ref={ref} args={[1, 64, 64]}>
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.3}
        thickness={0.4}
        chromaticAberration={0.05}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.2}
        iridescence={0.2}
        iridescenceIOR={1}
        iridescenceThicknessRange={[0, 1400]}
        clearcoat={0.5}
        attenuationDistance={0.5}
        attenuationColor="#f59e0b"
        color="#1a1a24"
        transmission={0.95}
      />
    </Sphere>
  );
}

function FloatingOrbs() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[3, 1, -2]} scale={0.8}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-2.5, -0.5, -1.5]} scale={0.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.2} wireframe />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0.1} floatIntensity={1.2}>
        <mesh position={[0, 2, -3]} scale={0.4}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.25} wireframe />
        </mesh>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0c0c0f"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#f59e0b" intensity={0.5} />
        <pointLight position={[10, -5, 0]} color="#14b8a6" intensity={0.3} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Blob />
        </Float>
        <FloatingOrbs />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
