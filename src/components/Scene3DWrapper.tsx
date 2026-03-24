"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-[#0c0c0f]" />,
});

export default function Scene3DWrapper() {
  return <Scene3D />;
}
