'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CosmicBackground } from '@/components/home';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Layout wrapper that conditionally shows Navbar/Footer
 * Hides them for immersive experiences like Planetarium
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Routes that should have no Navbar/Footer (immersive mode)
  const isImmersive = pathname?.startsWith('/planetarium');

  if (isImmersive) {
    // Full-screen immersive mode - no navbar, no footer, no background effects
    return (
      <div className="min-h-screen bg-[#030308]">
        {children}
      </div>
    );
  }

  // Normal layout with Navbar, Footer, and cosmic background on every page
  return (
    <>
      <CosmicBackground />

      <Navbar />

      <main className="flex-1 relative z-10">
        {children}
      </main>

      <Footer />
    </>
  );
}
