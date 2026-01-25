import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Globe2, Info, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: '3D Planetarium | CosmosEdu',
  description: 'Interaktywne 3D Planetarium - eksploruj planety Układu Słonecznego',
};

export default function PlanetariumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-planetarium-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,180,220,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,180,220,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-planetarium-glow/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Top navigation bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-planetarium-panel/80 backdrop-blur-md border-b border-planetarium-border">
        <nav className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Powrót do CosmosEdu</span>
          </Link>

          {/* Title */}
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-planetarium-glow" />
            <span className="font-display font-bold text-white">3D Planetarium</span>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-4">
            <Link
              href="/planetarium"
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Planety</span>
            </Link>
            <Link
              href="/planetarium/credits"
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Credits</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-12 min-h-screen">{children}</main>
    </div>
  );
}
