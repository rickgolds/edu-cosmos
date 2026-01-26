import type { Metadata } from 'next';
import './globals.css';
import { LayoutWrapper } from '@/components/ui/LayoutWrapper';

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
