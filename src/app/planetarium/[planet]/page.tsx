'use client';

import { useParams, notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { getPlanetById } from '@/features/planetarium';

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
        <p className="text-sm text-gray-500 tracking-wide">Loading Planetarium...</p>
      </div>
    </div>
  );
}

export default function PlanetViewPage() {
  const params = useParams();
  const planetId = params.planet as string;

  // Validate planet exists
  const planet = getPlanetById(planetId);
  if (!planet) {
    notFound();
  }

  // Use the unified PlanetariumShell with initial planet
  // This will show intro, then fly directly to the planet
  return <PlanetariumShell initialPlanetId={planetId} />;
}
