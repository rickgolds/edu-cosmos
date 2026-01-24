import { LESSON_CATEGORIES, DIFFICULTY_LEVELS } from '@/lib/constants';
import type { Question } from '@/features/quiz-engine';

// Content block types
export type ContentBlockType = 'text' | 'image' | 'callout' | 'list';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  calloutType?: 'info' | 'warning' | 'tip';
  items?: string[];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number; // minutes
  imageUrl: string;
  contentBlocks: ContentBlock[];
  quiz: Question[];
}

export const lessons: Lesson[] = [
  // === UKŁAD SŁONECZNY ===
  {
    slug: 'uklad-sloneczny-wprowadzenie',
    title: 'Układ Słoneczny - Wprowadzenie',
    description: 'Poznaj podstawy naszego kosmicznego sąsiedztwa: Słońce, planety i inne ciała niebieskie.',
    category: LESSON_CATEGORIES.SOLAR_SYSTEM,
    level: DIFFICULTY_LEVELS.BEGINNER,
    duration: 5,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA17046/PIA17046~medium.jpg',
    contentBlocks: [
      {
        type: 'text',
        content: 'Układ Słoneczny to nasz kosmiczny dom. Składa się ze Słońca – gwiazdy centralnej – oraz wszystkich ciał niebieskich, które krążą wokół niego pod wpływem grawitacji.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Układ Słoneczny powstał około 4,6 miliarda lat temu z obłoku gazu i pyłu zwanego mgławicą słoneczną.'
      },
      {
        type: 'text',
        content: 'W naszym układzie znajduje się 8 planet, które dzielimy na dwie grupy: planety skaliste (Merkury, Wenus, Ziemia, Mars) oraz gazowe olbrzymy (Jowisz, Saturn, Uran, Neptun).'
      },
      {
        type: 'list',
        content: 'Główne składniki Układu Słonecznego:',
        items: [
          'Słońce – gwiazda centralna (99,86% masy układu)',
          '8 planet i ich księżyce',
          'Planety karłowate (np. Pluton, Ceres)',
          'Asteroidy i komety',
          'Pas Kuipera i Obłok Oorta'
        ]
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Zapamiętaj kolejność planet: "Moja Bardzo Wysoka Żyrafa Ma Jednak Uszy Normalne" (Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran, Neptun).'
      }
    ],
    quiz: [
      {
        id: 'ss-intro-1',
        question: 'Ile planet znajduje się w Układzie Słonecznym?',
        options: [
          { id: 'a', text: '7', isCorrect: false },
          { id: 'b', text: '8', isCorrect: true },
          { id: 'c', text: '9', isCorrect: false },
          { id: 'd', text: '10', isCorrect: false }
        ],
        explanation: 'W Układzie Słonecznym jest 8 planet. Pluton został w 2006 roku przeklasyfikowany do kategorii planet karłowatych.'
      },
      {
        id: 'ss-intro-2',
        question: 'Która planeta jest najbliżej Słońca?',
        options: [
          { id: 'a', text: 'Wenus', isCorrect: false },
          { id: 'b', text: 'Mars', isCorrect: false },
          { id: 'c', text: 'Merkury', isCorrect: true },
          { id: 'd', text: 'Ziemia', isCorrect: false }
        ],
        explanation: 'Merkury to najbliższa Słońcu planeta. Jego odległość od Słońca wynosi średnio 58 milionów km.'
      },
      {
        id: 'ss-intro-3',
        question: 'Ile lat temu powstał Układ Słoneczny?',
        options: [
          { id: 'a', text: 'Około 1 miliard lat', isCorrect: false },
          { id: 'b', text: 'Około 4,6 miliarda lat', isCorrect: true },
          { id: 'c', text: 'Około 10 miliardów lat', isCorrect: false },
          { id: 'd', text: 'Około 100 milionów lat', isCorrect: false }
        ],
        explanation: 'Układ Słoneczny powstał około 4,6 miliarda lat temu z obłoku gazu i pyłu (mgławicy słonecznej).'
      }
    ]
  },

  // === GWIAZDY ===
  {
    slug: 'zycie-gwiazd',
    title: 'Życie gwiazd',
    description: 'Dowiedz się, jak rodzą się, żyją i umierają gwiazdy we Wszechświecie.',
    category: LESSON_CATEGORIES.STARS,
    level: DIFFICULTY_LEVELS.INTERMEDIATE,
    duration: 7,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA17563/PIA17563~medium.jpg',
    contentBlocks: [
      {
        type: 'text',
        content: 'Gwiazdy to ogromne kule gorącej plazmy, w których zachodzą reakcje termojądrowe. Każda gwiazda przechodzi przez określone etapy życia, od narodzin w mgławicy do spektakularnej śmierci.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Słońce jest gwiazdą typu G (żółty karzeł) i znajduje się mniej więcej w połowie swojego życia – ma około 4,6 miliarda lat i będzie świecić jeszcze przez podobny okres.'
      },
      {
        type: 'text',
        content: 'Gwiazdy rodzą się w mgławicach – gigantycznych obłokach gazu i pyłu. Gdy fragment mgławicy zaczyna się kurczyć pod wpływem grawitacji, powstaje protogwiazda. Gdy temperatura w jej jądrze osiągnie około 10 milionów stopni, rozpoczynają się reakcje termojądrowe.'
      },
      {
        type: 'list',
        content: 'Etapy życia gwiazdy podobnej do Słońca:',
        items: [
          'Mgławica → Protogwiazda',
          'Gwiazda ciągu głównego (jak nasze Słońce)',
          'Czerwony olbrzym',
          'Mgławica planetarna + Biały karzeł',
          'Czarny karzeł (teoretycznie)'
        ]
      },
      {
        type: 'text',
        content: 'Los gwiazdy zależy od jej masy. Gwiazdy masywniejsze od Słońca mogą eksplodować jako supernowe, pozostawiając po sobie gwiazdy neutronowe lub czarne dziury.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Im większa masa gwiazdy, tym krócej ona żyje! Masywne gwiazdy spalają swoje paliwo znacznie szybciej niż mniejsze.'
      }
    ],
    quiz: [
      {
        id: 'stars-1',
        question: 'Gdzie rodzą się gwiazdy?',
        options: [
          { id: 'a', text: 'W czarnych dziurach', isCorrect: false },
          { id: 'b', text: 'W mgławicach', isCorrect: true },
          { id: 'c', text: 'Na powierzchni innych gwiazd', isCorrect: false },
          { id: 'd', text: 'W galaktycznych jądrach', isCorrect: false }
        ],
        explanation: 'Gwiazdy rodzą się w mgławicach – obłokach gazu i pyłu, które kurczą się pod wpływem grawitacji.'
      },
      {
        id: 'stars-2',
        question: 'Co stanie się ze Słońcem na końcu jego życia?',
        options: [
          { id: 'a', text: 'Eksploduje jako supernowa', isCorrect: false },
          { id: 'b', text: 'Stanie się czarną dziurą', isCorrect: false },
          { id: 'c', text: 'Stanie się białym karłem', isCorrect: true },
          { id: 'd', text: 'Zniknie całkowicie', isCorrect: false }
        ],
        explanation: 'Słońce jest za mało masywne, by eksplodować jako supernowa. Po fazie czerwonego olbrzyma stanie się białym karłem.'
      },
      {
        id: 'stars-3',
        question: 'Jaka temperatura jest potrzebna do rozpoczęcia fuzji jądrowej w gwieździe?',
        options: [
          { id: 'a', text: 'Około 1000 stopni', isCorrect: false },
          { id: 'b', text: 'Około 1 milion stopni', isCorrect: false },
          { id: 'c', text: 'Około 10 milionów stopni', isCorrect: true },
          { id: 'd', text: 'Około 1 miliard stopni', isCorrect: false }
        ],
        explanation: 'Do rozpoczęcia fuzji wodoru w hel potrzebna jest temperatura około 10 milionów stopni Celsjusza.'
      }
    ]
  },

  // === GALAKTYKI ===
  {
    slug: 'galaktyki-wszechswiata',
    title: 'Galaktyki Wszechświata',
    description: 'Poznaj różne typy galaktyk i naszą kosmiczną ojczyznę – Drogę Mleczną.',
    category: LESSON_CATEGORIES.GALAXIES,
    level: DIFFICULTY_LEVELS.INTERMEDIATE,
    duration: 6,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA04921/PIA04921~medium.jpg',
    contentBlocks: [
      {
        type: 'text',
        content: 'Galaktyki to ogromne układy gwiazd, gazu, pyłu i ciemnej materii związane grawitacyjnie. Szacuje się, że w obserwowalnym Wszechświecie istnieje co najmniej 200 miliardów galaktyk!'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Nasza galaktyka – Droga Mleczna – zawiera od 100 do 400 miliardów gwiazd. Słońce znajduje się w jednym z ramion spiralnych, około 26 000 lat świetlnych od centrum.'
      },
      {
        type: 'list',
        content: 'Główne typy galaktyk:',
        items: [
          'Spiralne (jak Droga Mleczna i Andromeda) – mają ramiona spiralne',
          'Eliptyczne – kształt elipsoidalny, brak wyraźnej struktury',
          'Soczewkowate – pośrednie między spiralnymi a eliptycznymi',
          'Nieregularne – bez określonego kształtu'
        ]
      },
      {
        type: 'text',
        content: 'W centrum większości dużych galaktyk znajdują się supermasywne czarne dziury. Czarna dziura w centrum Drogi Mlecznej nazywa się Sagittarius A* i ma masę około 4 milionów mas Słońca.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Za około 4,5 miliarda lat Droga Mleczna zderzy się z galaktyką Andromedy! Obie galaktyki połączą się w jedną większą galaktykę eliptyczną.'
      }
    ],
    quiz: [
      {
        id: 'gal-1',
        question: 'Jakiego typu jest galaktyka Droga Mleczna?',
        options: [
          { id: 'a', text: 'Eliptyczna', isCorrect: false },
          { id: 'b', text: 'Spiralna', isCorrect: true },
          { id: 'c', text: 'Nieregularna', isCorrect: false },
          { id: 'd', text: 'Soczewkowata', isCorrect: false }
        ],
        explanation: 'Droga Mleczna jest galaktyką spiralną z poprzeczką (SBbc). Ma wyraźne ramiona spiralne i centralną poprzeczkę.'
      },
      {
        id: 'gal-2',
        question: 'Co znajduje się w centrum Drogi Mlecznej?',
        options: [
          { id: 'a', text: 'Bardzo jasna gwiazda', isCorrect: false },
          { id: 'b', text: 'Supermasywna czarna dziura', isCorrect: true },
          { id: 'c', text: 'Pustka', isCorrect: false },
          { id: 'd', text: 'Inna mała galaktyka', isCorrect: false }
        ],
        explanation: 'W centrum Drogi Mlecznej znajduje się supermasywna czarna dziura Sagittarius A* o masie około 4 milionów mas Słońca.'
      },
      {
        id: 'gal-3',
        question: 'Ile szacunkowo galaktyk jest w obserwowalnym Wszechświecie?',
        options: [
          { id: 'a', text: 'Około 1 milion', isCorrect: false },
          { id: 'b', text: 'Około 1 miliard', isCorrect: false },
          { id: 'c', text: 'Co najmniej 200 miliardów', isCorrect: true },
          { id: 'd', text: 'Dokładnie 8', isCorrect: false }
        ],
        explanation: 'Szacuje się, że w obserwowalnym Wszechświecie istnieje co najmniej 200 miliardów galaktyk, a niektóre szacunki mówią nawet o 2 bilionach.'
      }
    ]
  },

  // === RAKIETY ===
  {
    slug: 'jak-dzialaja-rakiety',
    title: 'Jak działają rakiety?',
    description: 'Poznaj zasady fizyki, które pozwalają nam podróżować w kosmos.',
    category: LESSON_CATEGORIES.ROCKETS,
    level: DIFFICULTY_LEVELS.BEGINNER,
    duration: 5,
    imageUrl: 'https://images-assets.nasa.gov/image/KSC-20200530-PH-SPX01_0006/KSC-20200530-PH-SPX01_0006~medium.jpg',
    contentBlocks: [
      {
        type: 'text',
        content: 'Rakiety działają na zasadzie trzeciej zasady dynamiki Newtona: każda akcja wywołuje równą i przeciwnie skierowaną reakcję. Gdy silnik rakiety wyrzuca gazy w jednym kierunku, rakieta porusza się w przeciwnym.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Rakieta to jedyny pojazd, który może działać w próżni kosmicznej, ponieważ nie potrzebuje powietrza do "odpychania się".'
      },
      {
        type: 'text',
        content: 'Aby uciec z grawitacji Ziemi, rakieta musi osiągnąć prędkość ucieczki wynoszącą około 11,2 km/s (ponad 40 000 km/h). To ogromne wyzwanie inżynierskie!'
      },
      {
        type: 'list',
        content: 'Główne elementy rakiety:',
        items: [
          'Silniki – wytwarzają ciąg poprzez spalanie paliwa',
          'Zbiorniki paliwa – zawierają paliwo i utleniacz',
          'Człon (stopień) – sekcja rakiety, która może być odrzucona',
          'Ładunek (payload) – satelita, sonda lub kapsuła załogowa'
        ]
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Współczesne rakiety wielokrotnego użytku (jak Falcon 9 SpaceX) mogą lądować z powrotem na Ziemi, co znacznie obniża koszty lotów kosmicznych.'
      }
    ],
    quiz: [
      {
        id: 'rocket-1',
        question: 'Na jakiej zasadzie fizyki działają rakiety?',
        options: [
          { id: 'a', text: 'Pierwsza zasada dynamiki Newtona', isCorrect: false },
          { id: 'b', text: 'Druga zasada dynamiki Newtona', isCorrect: false },
          { id: 'c', text: 'Trzecia zasada dynamiki Newtona', isCorrect: true },
          { id: 'd', text: 'Zasada zachowania energii', isCorrect: false }
        ],
        explanation: 'Rakiety działają na zasadzie trzeciej zasady dynamiki Newtona: akcja = reakcja. Wyrzucane gazy pchają rakietę w przeciwnym kierunku.'
      },
      {
        id: 'rocket-2',
        question: 'Jaka jest prędkość ucieczki z Ziemi?',
        options: [
          { id: 'a', text: 'Około 1 km/s', isCorrect: false },
          { id: 'b', text: 'Około 11 km/s', isCorrect: true },
          { id: 'c', text: 'Około 100 km/s', isCorrect: false },
          { id: 'd', text: 'Około 1000 km/s', isCorrect: false }
        ],
        explanation: 'Prędkość ucieczki z Ziemi wynosi około 11,2 km/s (ponad 40 000 km/h). To minimalna prędkość potrzebna do opuszczenia pola grawitacyjnego Ziemi.'
      },
      {
        id: 'rocket-3',
        question: 'Dlaczego rakieta może działać w próżni kosmicznej?',
        options: [
          { id: 'a', text: 'Bo ma specjalne skrzydła', isCorrect: false },
          { id: 'b', text: 'Bo odpycha się od cząsteczek kosmicznych', isCorrect: false },
          { id: 'c', text: 'Bo nie potrzebuje powietrza do wytworzenia ciągu', isCorrect: true },
          { id: 'd', text: 'Bo używa energii słonecznej', isCorrect: false }
        ],
        explanation: 'Rakieta wytwarza ciąg poprzez wyrzucanie masy (spalin), nie potrzebując zewnętrznego medium (jak powietrze) do odpychania się.'
      }
    ]
  },

  // === TELESKOPY ===
  {
    slug: 'teleskopy-kosmiczne',
    title: 'Teleskopy kosmiczne',
    description: 'Odkryj, jak teleskopy umieszczone w kosmosie pomagają nam badać Wszechświat.',
    category: LESSON_CATEGORIES.TELESCOPES,
    level: DIFFICULTY_LEVELS.INTERMEDIATE,
    duration: 6,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA14094/PIA14094~medium.jpg',
    contentBlocks: [
      {
        type: 'text',
        content: 'Teleskopy kosmiczne to instrumenty astronomiczne umieszczone na orbicie Ziemi lub w głębokim kosmosie. Działają ponad atmosferą, która zakłóca i pochłania część promieniowania.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Teleskop Hubble\'a działa nieprzerwanie od 1990 roku! Dostarczył setki tysięcy zdjęć i zrewolucjonizował naszą wiedzę o Wszechświecie.'
      },
      {
        type: 'list',
        content: 'Najważniejsze teleskopy kosmiczne:',
        items: [
          'Hubble Space Telescope – światło widzialne i UV',
          'James Webb Space Telescope – podczerwień, najnowocześniejszy',
          'Chandra X-ray Observatory – promieniowanie rentgenowskie',
          'Spitzer Space Telescope – podczerwień (zakończył misję w 2020)'
        ]
      },
      {
        type: 'text',
        content: 'Teleskop Jamesa Webba (JWST), wystrzelony w 2021 roku, jest największym i najpotężniejszym teleskopem kosmicznym. Jego główne lustro ma średnicę 6,5 metra i pozwala obserwować najodleglejsze galaktyki.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'JWST obserwuje Wszechświat w podczerwieni, co pozwala "widzieć" przez obłoki pyłu i obserwować bardzo odległe (a więc młode) galaktyki.'
      }
    ],
    quiz: [
      {
        id: 'tel-1',
        question: 'Dlaczego teleskopy kosmiczne dają lepsze obrazy niż naziemne?',
        options: [
          { id: 'a', text: 'Bo są większe', isCorrect: false },
          { id: 'b', text: 'Bo działają ponad atmosferą', isCorrect: true },
          { id: 'c', text: 'Bo są bliżej gwiazd', isCorrect: false },
          { id: 'd', text: 'Bo używają lepszego szkła', isCorrect: false }
        ],
        explanation: 'Teleskopy kosmiczne działają ponad atmosferą, która powoduje turbulencje i pochłania część promieniowania, zakłócając obserwacje.'
      },
      {
        id: 'tel-2',
        question: 'Od którego roku działa Teleskop Hubble\'a?',
        options: [
          { id: 'a', text: '1980', isCorrect: false },
          { id: 'b', text: '1990', isCorrect: true },
          { id: 'c', text: '2000', isCorrect: false },
          { id: 'd', text: '2010', isCorrect: false }
        ],
        explanation: 'Teleskop Hubble\'a został wystrzelony 24 kwietnia 1990 roku i działa do dziś, dostarczając niezwykłych obrazów kosmosu.'
      },
      {
        id: 'tel-3',
        question: 'W jakim zakresie promieniowania obserwuje Teleskop Jamesa Webba?',
        options: [
          { id: 'a', text: 'Promieniowanie rentgenowskie', isCorrect: false },
          { id: 'b', text: 'Światło widzialne', isCorrect: false },
          { id: 'c', text: 'Podczerwień', isCorrect: true },
          { id: 'd', text: 'Fale radiowe', isCorrect: false }
        ],
        explanation: 'JWST obserwuje głównie w podczerwieni, co pozwala mu widzieć przez obłoki pyłu i obserwować bardzo odległe, "przesunięte ku czerwieni" obiekty.'
      }
    ]
  }
];

// Helper functions
export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonsByCategory(category: string): Lesson[] {
  return lessons.filter((lesson) => lesson.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(lessons.map((lesson) => lesson.category))];
}
