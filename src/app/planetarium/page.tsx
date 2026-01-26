'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamic import for the Planetarium Shell (client-side only)
const PlanetariumShell = dynamic(
  () =>
    import('@/features/planetarium/scenes/PlanetariumShell').then(
      (mod) => mod.PlanetariumShell
    ),
  {
    ssr: false,
    loading: () => <PlanetariumLoader />,
  }
);

function PlanetariumLoader() {
  return (
    <div className="h-screen w-screen bg-[#030308] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500 tracking-wide">Ładowanie Planetarium...</p>
      </div>
    </div>
  );
}

export default function PlanetariumPage() {
  return <PlanetariumShell />;
}
