import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Planetarium | CosmosEdu',
  description: 'Interaktywne 3D Planetarium - eksploruj planety Układu Słonecznego',
};

/**
 * Planetarium layout - minimal wrapper
 * The PlanetariumShell handles its own full-screen UI
 */
export default function PlanetariumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
