import Link from 'next/link';
import { Home, Search, BookOpen } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card padding="lg" className="max-w-md w-full text-center">
        <div className="text-8xl font-display font-bold text-gradient mb-4">
          404
        </div>

        <h1 className="text-2xl font-display font-bold text-white mb-2">
          Strona nie znaleziona
        </h1>
        <p className="text-gray-400 mb-6">
          Wygląda na to, że ta strona zgubiła się gdzieś w kosmosie.
          Nie martw się, pomożemy Ci wrócić na właściwy kurs!
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button className="w-full" leftIcon={<Home className="w-4 h-4" />}>
              Strona główna
            </Button>
          </Link>
          <Link href="/lessons">
            <Button variant="secondary" className="w-full" leftIcon={<BookOpen className="w-4 h-4" />}>
              Przeglądaj lekcje
            </Button>
          </Link>
          <Link href="/library">
            <Button variant="ghost" className="w-full" leftIcon={<Search className="w-4 h-4" />}>
              Przeszukaj bibliotekę NASA
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
