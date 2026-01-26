'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

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

  // Normal layout with Navbar and Footer
  return (
    <>
      {/* Stars background overlay */}
      <div className="fixed inset-0 stars-bg opacity-30 pointer-events-none z-0" />

      {/* Gradient overlays */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-glow-purple opacity-20 blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-glow-cyan opacity-20 blur-3xl pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 relative z-10">
        {children}
      </main>

      <Footer />
    </>
  );
}
