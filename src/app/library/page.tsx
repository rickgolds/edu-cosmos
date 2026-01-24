import { Metadata } from 'next';
import { LibrarySearch } from '@/features/library';

export const metadata: Metadata = {
  title: 'Biblioteka NASA',
  description: 'Przeszukuj ogromną bazę zdjęć i filmów NASA. Miliony zasobów z archiwum kosmicznej agencji.',
};

export default function LibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          Biblioteka NASA
        </h1>
        <p className="text-gray-400">
          Przeszukuj miliony zdjęć i filmów z archiwum NASA Images API.
        </p>
      </div>

      {/* Search component */}
      <LibrarySearch />
    </div>
  );
}
