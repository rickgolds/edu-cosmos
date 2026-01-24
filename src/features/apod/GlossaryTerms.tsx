'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

// Static glossary data - can be moved to database later
const GLOSSARY: Record<string, string> = {
  'galaxy': 'Układ gwiazd, gazu, pyłu i ciemnej materii związanych grawitacyjnie. Nasza galaktyka to Droga Mleczna.',
  'galaktyka': 'Układ gwiazd, gazu, pyłu i ciemnej materii związanych grawitacyjnie. Nasza galaktyka to Droga Mleczna.',
  'nebula': 'Obłok gazu i pyłu w przestrzeni kosmicznej. Mgławice mogą być miejscami narodzin gwiazd.',
  'mgławica': 'Obłok gazu i pyłu w przestrzeni kosmicznej. Mgławice mogą być miejscami narodzin gwiazd.',
  'supernova': 'Gwałtowna eksplozja gwiazdy pod koniec jej życia, uwalniająca ogromne ilości energii.',
  'black hole': 'Obszar czasoprzestrzeni o tak silnej grawitacji, że nic, nawet światło, nie może z niego uciec.',
  'czarna dziura': 'Obszar czasoprzestrzeni o tak silnej grawitacji, że nic, nawet światło, nie może z niego uciec.',
  'quasar': 'Niezwykle jasne jądro odległej galaktyki, zasilane przez supermasywną czarną dziurę.',
  'pulsar': 'Szybko rotująca gwiazda neutronowa emitująca regularne impulsy promieniowania.',
  'neutron star': 'Niezwykle gęsty pozostałość po eksplozji supernowej, złożona głównie z neutronów.',
  'gwiazda neutronowa': 'Niezwykle gęsty pozostałość po eksplozji supernowej, złożona głównie z neutronów.',
  'dwarf': 'W astronomii odnosi się do gwiazd lub planet mniejszych od typowych. Np. biały karzeł, brązowy karzeł.',
  'karzeł': 'W astronomii odnosi się do gwiazd lub planet mniejszych od typowych. Np. biały karzeł, brązowy karzeł.',
  'red giant': 'Gwiazda w późnej fazie ewolucji, która znacznie się rozszerzyła i schłodziła.',
  'czerwony olbrzym': 'Gwiazda w późnej fazie ewolucji, która znacznie się rozszerzyła i schłodziła.',
  'solar system': 'Słońce wraz z wszystkimi ciałami niebieskimi krążącymi wokół niego.',
  'układ słoneczny': 'Słońce wraz z wszystkimi ciałami niebieskimi krążącymi wokół niego.',
  'asteroid': 'Mały skalisty obiekt krążący wokół Słońca, głównie między Marsem a Jowiszem.',
  'asteroida': 'Mały skalisty obiekt krążący wokół Słońca, głównie między Marsem a Jowiszem.',
  'comet': 'Ciało niebieskie zbudowane z lodu i pyłu, które zbliżając się do Słońca tworzy ogon.',
  'kometa': 'Ciało niebieskie zbudowane z lodu i pyłu, które zbliżając się do Słońca tworzy ogon.',
  'exoplanet': 'Planeta krążąca wokół innej gwiazdy niż Słońce.',
  'egzoplaneta': 'Planeta krążąca wokół innej gwiazdy niż Słońce.',
  'light-year': 'Jednostka odległości równa dystansowi, jaki światło pokonuje w ciągu roku (~9.46 biliona km).',
  'rok świetlny': 'Jednostka odległości równa dystansowi, jaki światło pokonuje w ciągu roku (~9.46 biliona km).',
  'parsec': 'Jednostka odległości astronomicznej równa około 3.26 roku świetlnego.',
  'parsek': 'Jednostka odległości astronomicznej równa około 3.26 roku świetlnego.',
  'redshift': 'Przesunięcie widma światła ku czerwieni, wskazujące na oddalanie się obiektu od obserwatora.',
  'przesunięcie ku czerwieni': 'Przesunięcie widma światła ku czerwieni, wskazujące na oddalanie się obiektu od obserwatora.',
  'cosmic ray': 'Wysokoenergetyczne cząstki pochodzące z kosmosu, głównie protony i jądra atomowe.',
  'promieniowanie kosmiczne': 'Wysokoenergetyczne cząstki pochodzące z kosmosu, głównie protony i jądra atomowe.',
  'orbit': 'Trajektoria, po której jedno ciało niebieskie krąży wokół drugiego pod wpływem grawitacji.',
  'orbita': 'Trajektoria, po której jedno ciało niebieskie krąży wokół drugiego pod wpływem grawitacji.',
  'eclipse': 'Zjawisko astronomiczne, gdy jedno ciało niebieskie zasłania drugie.',
  'zaćmienie': 'Zjawisko astronomiczne, gdy jedno ciało niebieskie zasłania drugie.',
  'aurora': 'Świecenie atmosfery spowodowane interakcją cząstek wiatru słonecznego z polem magnetycznym.',
  'zorza': 'Świecenie atmosfery spowodowane interakcją cząstek wiatru słonecznego z polem magnetycznym.',
  'telescope': 'Instrument optyczny służący do obserwacji odległych obiektów poprzez zbieranie promieniowania.',
  'teleskop': 'Instrument optyczny służący do obserwacji odległych obiektów poprzez zbieranie promieniowania.',
};

interface GlossaryTermsProps {
  text: string;
}

export function GlossaryTerms({ text }: GlossaryTermsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Find terms that appear in the text
  const foundTerms = Object.entries(GLOSSARY).filter(([term]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    return regex.test(text);
  });

  // Remove duplicates (e.g., English and Polish versions)
  const uniqueTerms = foundTerms.reduce((acc, [term, definition]) => {
    const existingDef = acc.find(([, def]) => def === definition);
    if (!existingDef) {
      acc.push([term, definition]);
    }
    return acc;
  }, [] as [string, string][]);

  if (uniqueTerms.length === 0) {
    return null;
  }

  const displayedTerms = isExpanded ? uniqueTerms : uniqueTerms.slice(0, 3);

  return (
    <Card padding="md">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-accent-cyan" />
        <h3 className="font-display font-semibold text-white">Słowniczek pojęć</h3>
        <Badge variant="cyan" size="sm">
          {uniqueTerms.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {displayedTerms.map(([term, definition]) => (
          <div
            key={term}
            className="p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border"
          >
            <span className="font-medium text-accent-purple capitalize">{term}</span>
            <p className="text-sm text-gray-400 mt-1">{definition}</p>
          </div>
        ))}
      </div>

      {uniqueTerms.length > 3 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-accent-cyan hover:text-accent-cyan/80 flex items-center gap-1 transition-colors"
        >
          {isExpanded ? (
            <>
              Pokaż mniej <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Pokaż więcej ({uniqueTerms.length - 3}) <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </Card>
  );
}
