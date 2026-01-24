import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: {
    default: 'CosmosEdu - Poznaj Kosmos',
    template: '%s | CosmosEdu',
  },
  description:
    'Interaktywna aplikacja edukacyjna o kosmosie. Codzienne zdjęcia NASA, lekcje o Układzie Słonecznym, quizy i biblioteka zasobów kosmicznych.',
  keywords: [
    'kosmos',
    'edukacja',
    'NASA',
    'astronomia',
    'układ słoneczny',
    'gwiazdy',
    'galaktyki',
    'rakiety',
  ],
  authors: [{ name: 'CosmosEdu Team' }],
  openGraph: {
    title: 'CosmosEdu - Poznaj Kosmos',
    description:
      'Interaktywna aplikacja edukacyjna o kosmosie. Codzienne zdjęcia NASA, lekcje i quizy.',
    type: 'website',
    locale: 'pl_PL',
    siteName: 'CosmosEdu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CosmosEdu - Poznaj Kosmos',
    description: 'Interaktywna aplikacja edukacyjna o kosmosie.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen flex flex-col">
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
      </body>
    </html>
  );
}
