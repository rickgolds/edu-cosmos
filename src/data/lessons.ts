import { LESSON_CATEGORIES, DIFFICULTY_LEVELS } from '@/lib/constants';
import type { Question } from '@/features/quiz-engine';
import { ADAPTIVE_TAGS, type AdaptiveTag } from '@/features/adaptive';

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
  // Adaptive learning (v4)
  tags?: AdaptiveTag[];
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
    tags: [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.ORBITS],
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
        explanation: 'W Układzie Słonecznym jest 8 planet. Pluton został w 2006 roku przeklasyfikowany do kategorii planet karłowatych.',
        tags: [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.PLANETS],
        difficultyLevel: 1,
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
        explanation: 'Merkury to najbliższa Słońcu planeta. Jego odległość od Słońca wynosi średnio 58 milionów km.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 1,
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
        explanation: 'Układ Słoneczny powstał około 4,6 miliarda lat temu z obłoku gazu i pyłu (mgławicy słonecznej).',
        tags: [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 2: Planety Układu Słonecznego
  {
    slug: 'planety-ukladu-slonecznego',
    title: 'Planety Układu Słonecznego',
    description: 'Poznaj wszystkie 8 planet - od skalistego Merkurego po lodowego Neptuna.',
    category: LESSON_CATEGORIES.SOLAR_SYSTEM,
    level: DIFFICULTY_LEVELS.BEGINNER,
    duration: 8,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA11800/PIA11800~medium.jpg',
    tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.ORBITS, ADAPTIVE_TAGS.MOONS],
    contentBlocks: [
      {
        type: 'text',
        content: 'Układ Słoneczny zawiera 8 planet podzielonych na dwie grupy: planety skaliste (wewnętrzne) i gazowe olbrzymy (zewnętrzne). Każda z nich jest unikalna i fascynująca.'
      },
      {
        type: 'list',
        content: 'Planety skaliste (wewnętrzne):',
        items: [
          'Merkury – najmniejsza planeta, najbliżej Słońca, brak atmosfery',
          'Wenus – "bliźniaczka Ziemi" pod względem rozmiaru, ale piekielnie gorąca (465°C)',
          'Ziemia – jedyna znana planeta z życiem, z jednym księżycem',
          'Mars – "Czerwona Planeta", z najwyższą górą (Olympus Mons) w Układzie Słonecznym'
        ]
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Dzień na Wenus trwa dłużej niż jej rok! Wenus obraca się tak wolno, że jeden obrót wokół własnej osi zajmuje 243 dni ziemskie, podczas gdy rok trwa 225 dni.'
      },
      {
        type: 'list',
        content: 'Gazowe olbrzymy (zewnętrzne):',
        items: [
          'Jowisz – największa planeta, słynna Wielka Czerwona Plama, 95 księżyców',
          'Saturn – znany z pięknych pierścieni, 146 księżyców (rekord!)',
          'Uran – obraca się "na boku", ma pierścienie i 27 księżyców',
          'Neptun – najdalszy, najsilniejsze wiatry w Układzie Słonecznym (2100 km/h)'
        ]
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Jowisz jest tak masywny, że mógłby pomieścić ponad 1300 Ziem! Jego masa to 2,5 razy więcej niż wszystkie inne planety razem wzięte.'
      }
    ],
    quiz: [
      {
        id: 'planets-1',
        question: 'Która planeta jest największa w Układzie Słonecznym?',
        options: [
          { id: 'a', text: 'Saturn', isCorrect: false },
          { id: 'b', text: 'Jowisz', isCorrect: true },
          { id: 'c', text: 'Uran', isCorrect: false },
          { id: 'd', text: 'Neptun', isCorrect: false }
        ],
        explanation: 'Jowisz jest największą planetą – jego średnica to około 140 000 km, ponad 11 razy większa niż Ziemi.',
        tags: [ADAPTIVE_TAGS.PLANETS],
        difficultyLevel: 1,
      },
      {
        id: 'planets-2',
        question: 'Która planeta ma najwięcej księżyców?',
        options: [
          { id: 'a', text: 'Jowisz', isCorrect: false },
          { id: 'b', text: 'Saturn', isCorrect: true },
          { id: 'c', text: 'Uran', isCorrect: false },
          { id: 'd', text: 'Neptun', isCorrect: false }
        ],
        explanation: 'Saturn ma 146 znanych księżyców (stan na 2024), wyprzedzając Jowisza z 95 księżycami.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.MOONS],
        difficultyLevel: 2,
      },
      {
        id: 'planets-3',
        question: 'Która planeta obraca się "na boku"?',
        options: [
          { id: 'a', text: 'Saturn', isCorrect: false },
          { id: 'b', text: 'Neptun', isCorrect: false },
          { id: 'c', text: 'Uran', isCorrect: true },
          { id: 'd', text: 'Jowisz', isCorrect: false }
        ],
        explanation: 'Oś obrotu Urana jest nachylona o 98°, przez co planeta praktycznie "toczy się" po swojej orbicie.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 3: Księżyce i małe ciała
  {
    slug: 'ksiezyce-i-male-ciala',
    title: 'Księżyce, asteroidy i komety',
    description: 'Poznaj fascynujący świat księżyców planetarnych, asteroid i komet.',
    category: LESSON_CATEGORIES.SOLAR_SYSTEM,
    level: DIFFICULTY_LEVELS.INTERMEDIATE,
    duration: 7,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA19048/PIA19048~medium.jpg',
    tags: [ADAPTIVE_TAGS.MOONS, ADAPTIVE_TAGS.ASTEROIDS_COMETS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
    contentBlocks: [
      {
        type: 'text',
        content: 'Oprócz planet, Układ Słoneczny pełen jest mniejszych ciał: księżyców, asteroid, komet i planet karłowatych. Te obiekty opowiadają historię powstania naszego kosmicznego domu.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Ganimedes, księżyc Jowisza, jest większy od planety Merkury! To największy księżyc w Układzie Słonecznym.'
      },
      {
        type: 'list',
        content: 'Najciekawsze księżyce:',
        items: [
          'Ganimedes (Jowisz) – największy księżyc, ma własne pole magnetyczne',
          'Tytan (Saturn) – jedyny z gęstą atmosferą, ma jeziora metanu',
          'Europa (Jowisz) – pod lodową skorupą może kryć ocean życia',
          'Enceladus (Saturn) – gejzery wody, potencjalne siedlisko życia'
        ]
      },
      {
        type: 'text',
        content: 'Asteroidy to skaliste pozostałości z czasów formowania się planet. Większość znajduje się w Pasie Asteroid między Marsem a Jowiszem. Komety to "brudne kule śnieżne" z lodu i pyłu, które przy zbliżeniu do Słońca tworzą efektowne ogony.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Komety mają dwa ogony: pyłowy (zakrzywiony, biały) i jonowy (prosty, niebieski). Ogon jonowy zawsze wskazuje od Słońca!'
      }
    ],
    quiz: [
      {
        id: 'moons-1',
        question: 'Który księżyc jest największy w Układzie Słonecznym?',
        options: [
          { id: 'a', text: 'Tytan', isCorrect: false },
          { id: 'b', text: 'Ganimedes', isCorrect: true },
          { id: 'c', text: 'Europa', isCorrect: false },
          { id: 'd', text: 'Nasz Księżyc', isCorrect: false }
        ],
        explanation: 'Ganimedes (księżyc Jowisza) ma średnicę 5268 km – jest większy od Merkurego!',
        tags: [ADAPTIVE_TAGS.MOONS],
        difficultyLevel: 1,
      },
      {
        id: 'moons-2',
        question: 'Gdzie znajduje się Pas Asteroid?',
        options: [
          { id: 'a', text: 'Między Ziemią a Marsem', isCorrect: false },
          { id: 'b', text: 'Między Marsem a Jowiszem', isCorrect: true },
          { id: 'c', text: 'Za Neptunem', isCorrect: false },
          { id: 'd', text: 'Wokół Saturna', isCorrect: false }
        ],
        explanation: 'Pas Asteroid znajduje się między orbitami Marsa i Jowisza. Grawitacja Jowisza przeszkodziła w utworzeniu się tam planety.',
        tags: [ADAPTIVE_TAGS.ASTEROIDS_COMETS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 1,
      },
      {
        id: 'moons-3',
        question: 'Z czego głównie składają się komety?',
        options: [
          { id: 'a', text: 'Ze skał i metali', isCorrect: false },
          { id: 'b', text: 'Z lodu i pyłu', isCorrect: true },
          { id: 'c', text: 'Z gazu', isCorrect: false },
          { id: 'd', text: 'Z lawy', isCorrect: false }
        ],
        explanation: 'Komety składają się głównie z lodu (wody, dwutlenku węgla, metanu) i pyłu. Dlatego nazywane są "brudnymi kulami śnieżnymi".',
        tags: [ADAPTIVE_TAGS.ASTEROIDS_COMETS],
        difficultyLevel: 1,
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
    tags: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.STAR_TYPES],
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
        explanation: 'Gwiazdy rodzą się w mgławicach – obłokach gazu i pyłu, które kurczą się pod wpływem grawitacji.',
        tags: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.STELLAR_EVOLUTION],
        difficultyLevel: 1,
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
        explanation: 'Słońce jest za mało masywne, by eksplodować jako supernowa. Po fazie czerwonego olbrzyma stanie się białym karłem.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.STAR_TYPES],
        difficultyLevel: 2,
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
        explanation: 'Do rozpoczęcia fuzji wodoru w hel potrzebna jest temperatura około 10 milionów stopni Celsjusza.',
        tags: [ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 5: Rodzaje gwiazd
  {
    slug: 'rodzaje-gwiazd',
    title: 'Rodzaje gwiazd',
    description: 'Poznaj różnorodność gwiazd - od czerwonych karłów po niebieskie nadolbrzymy.',
    category: LESSON_CATEGORIES.STARS,
    level: DIFFICULTY_LEVELS.BEGINNER,
    duration: 6,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA18469/PIA18469~medium.jpg',
    tags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
    contentBlocks: [
      {
        type: 'text',
        content: 'Gwiazdy różnią się wielkością, masą, temperaturą i jasnością. Astronomowie klasyfikują je według widma – systemu OBAFGKM, gdzie O to najgorętsze, a M to najchłodniejsze gwiazdy.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Wbrew intuicji, niebieskie gwiazdy są NAJGORĘTSZE (powyżej 25 000 K), a czerwone NAJCHŁODNIEJSZE (poniżej 3500 K). To dlatego płomień palnika jest niebieski, a żar węgla czerwony!'
      },
      {
        type: 'list',
        content: 'Główne typy gwiazd według wielkości:',
        items: [
          'Czerwone karły – małe, chłodne, najliczniejsze (75% gwiazd)',
          'Żółte karły – jak Słońce, średnia wielkość i temperatura',
          'Olbrzymy – gwiazdy w późnym etapie życia, powiększone',
          'Nadolbrzymy – gigantyczne gwiazdy, np. Betelgeza',
          'Białe karły – gorące pozostałości po mniejszych gwiazdach'
        ]
      },
      {
        type: 'text',
        content: 'Słońce to gwiazda typu G (żółty karzeł) o temperaturze powierzchni około 5500°C. Jest średniej wielkości, ale w galaktyce zdecydowaną większość stanowią czerwone karły – małe, chłodne gwiazdy żyjące biliony lat.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Zapamiętaj klasyfikację spektralną: "Oh Be A Fine Girl/Guy Kiss Me" = O, B, A, F, G, K, M (od najgorętszych do najchłodniejszych).'
      }
    ],
    quiz: [
      {
        id: 'startypes-1',
        question: 'Jakiego koloru są najgorętsze gwiazdy?',
        options: [
          { id: 'a', text: 'Czerwonego', isCorrect: false },
          { id: 'b', text: 'Żółtego', isCorrect: false },
          { id: 'c', text: 'Niebieskiego', isCorrect: true },
          { id: 'd', text: 'Białego', isCorrect: false }
        ],
        explanation: 'Niebieskie gwiazdy są najgorętsze – ich temperatura przekracza 25 000 K. Czerwone gwiazdy są najchłodniejsze.',
        tags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 1,
      },
      {
        id: 'startypes-2',
        question: 'Jaki typ gwiazdy jest najliczniejszy w galaktyce?',
        options: [
          { id: 'a', text: 'Żółte karły', isCorrect: false },
          { id: 'b', text: 'Czerwone karły', isCorrect: true },
          { id: 'c', text: 'Niebieskie olbrzymy', isCorrect: false },
          { id: 'd', text: 'Białe karły', isCorrect: false }
        ],
        explanation: 'Czerwone karły stanowią około 75% wszystkich gwiazd. Są małe, chłodne i bardzo długowieczne.',
        tags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 2,
      },
      {
        id: 'startypes-3',
        question: 'Jakiego typu gwiazdą jest Słońce?',
        options: [
          { id: 'a', text: 'Czerwony karzeł', isCorrect: false },
          { id: 'b', text: 'Żółty karzeł (typ G)', isCorrect: true },
          { id: 'c', text: 'Biały karzeł', isCorrect: false },
          { id: 'd', text: 'Niebieski olbrzym', isCorrect: false }
        ],
        explanation: 'Słońce to żółty karzeł typu spektralnego G2V. Jest gwiazdą średniej wielkości i temperatury.',
        tags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 1,
      }
    ]
  },

  // Lekcja 6: Śmierć gwiazd
  {
    slug: 'smierc-gwiazd',
    title: 'Śmierć gwiazd',
    description: 'Supernowe, czarne dziury i gwiazdy neutronowe - spektakularne końce gwiazd.',
    category: LESSON_CATEGORIES.STARS,
    level: DIFFICULTY_LEVELS.ADVANCED,
    duration: 8,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA18917/PIA18917~medium.jpg',
    tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.BLACK_HOLES, ADAPTIVE_TAGS.STAR_TYPES],
    contentBlocks: [
      {
        type: 'text',
        content: 'Sposób, w jaki umiera gwiazda, zależy od jej masy. Małe gwiazdy kończą spokojnie, ale masywne gwiazdy wybuchają w spektakularnych eksplozjach zwanych supernowymi.'
      },
      {
        type: 'list',
        content: 'Los gwiazdy zależy od jej masy:',
        items: [
          'Masa < 8 mas Słońca → biały karzeł (jak nasze Słońce)',
          'Masa 8-25 mas Słońca → supernowa → gwiazda neutronowa',
          'Masa > 25 mas Słońca → supernowa → czarna dziura'
        ]
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Supernowa może przez krótki czas świecić jaśniej niż cała galaktyka! Ostatnia supernowa widoczna gołym okiem w naszej galaktyce była w 1604 roku (Supernowa Keplera).'
      },
      {
        type: 'text',
        content: 'Gwiazda neutronowa to niesamowicie gęsty obiekt – łyżeczka jej materii waży około miliarda ton! Czarna dziura to region, gdzie grawitacja jest tak silna, że nawet światło nie może uciec.'
      },
      {
        type: 'callout',
        calloutType: 'warning',
        content: 'Czarne dziury nie "zasysają" wszystkiego wokół! Na bezpiecznej odległości zachowują się jak zwykłe obiekty masywne. Gdyby Słońce stało się czarną dziurą, Ziemia dalej krążyłaby po tej samej orbicie.'
      }
    ],
    quiz: [
      {
        id: 'stardeath-1',
        question: 'Co pozostaje po eksplozji supernowej bardzo masywnej gwiazdy (>25 mas Słońca)?',
        options: [
          { id: 'a', text: 'Biały karzeł', isCorrect: false },
          { id: 'b', text: 'Gwiazda neutronowa', isCorrect: false },
          { id: 'c', text: 'Czarna dziura', isCorrect: true },
          { id: 'd', text: 'Nic - gwiazda znika całkowicie', isCorrect: false }
        ],
        explanation: 'Gwiazdy o masie powyżej 25 mas Słońca po supernowej tworzą czarne dziury. Mniej masywne tworzą gwiazdy neutronowe.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.BLACK_HOLES],
        difficultyLevel: 2,
      },
      {
        id: 'stardeath-2',
        question: 'Co to jest gwiazda neutronowa?',
        options: [
          { id: 'a', text: 'Gwiazda składająca się głównie z neutronów', isCorrect: true },
          { id: 'b', text: 'Gwiazda bez ładunku elektrycznego', isCorrect: false },
          { id: 'c', text: 'Bardzo młoda gwiazda', isCorrect: false },
          { id: 'd', text: 'Gwiazda nieemitująca światła', isCorrect: false }
        ],
        explanation: 'Gwiazda neutronowa to pozostałość po supernowej, składająca się głównie z neutronów. Jest niesamowicie gęsta – promień ~10 km, masa ~1,5 masy Słońca.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION],
        difficultyLevel: 2,
      },
      {
        id: 'stardeath-3',
        question: 'Co stanie się ze Słońcem na końcu jego życia?',
        options: [
          { id: 'a', text: 'Eksploduje jako supernowa', isCorrect: false },
          { id: 'b', text: 'Stanie się białym karłem', isCorrect: true },
          { id: 'c', text: 'Stanie się czarną dziurą', isCorrect: false },
          { id: 'd', text: 'Stanie się gwiazdą neutronową', isCorrect: false }
        ],
        explanation: 'Słońce ma za małą masę na supernową. Po fazie czerwonego olbrzyma odrzuci zewnętrzne warstwy i stanie się białym karłem.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.STAR_TYPES],
        difficultyLevel: 2,
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
    tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.BLACK_HOLES, ADAPTIVE_TAGS.SCALES_DISTANCES],
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
        explanation: 'Droga Mleczna jest galaktyką spiralną z poprzeczką (SBbc). Ma wyraźne ramiona spiralne i centralną poprzeczkę.',
        tags: [ADAPTIVE_TAGS.GALAXIES],
        difficultyLevel: 1,
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
        explanation: 'W centrum Drogi Mlecznej znajduje się supermasywna czarna dziura Sagittarius A* o masie około 4 milionów mas Słońca.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.BLACK_HOLES],
        difficultyLevel: 2,
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
        explanation: 'Szacuje się, że w obserwowalnym Wszechświecie istnieje co najmniej 200 miliardów galaktyk, a niektóre szacunki mówią nawet o 2 bilionach.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 8: Droga Mleczna - nasza galaktyka
  {
    slug: 'droga-mleczna',
    title: 'Droga Mleczna - nasz dom',
    description: 'Poznaj naszą galaktykę - jej budowę, historię i przyszłość.',
    category: LESSON_CATEGORIES.GALAXIES,
    level: DIFFICULTY_LEVELS.BEGINNER,
    duration: 6,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA12348/PIA12348~medium.jpg',
    tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.SCALES_DISTANCES],
    contentBlocks: [
      {
        type: 'text',
        content: 'Droga Mleczna to nasza galaktyka domowa. Jest to galaktyka spiralna z poprzeczką, zawierająca od 100 do 400 miliardów gwiazd. Jej średnica wynosi około 100 000 lat świetlnych.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Słońce znajduje się w Ramieniu Oriona, około 26 000 lat świetlnych od centrum galaktyki. Jeden obieg wokół centrum zajmuje nam około 230 milionów lat!'
      },
      {
        type: 'list',
        content: 'Budowa Drogi Mlecznej:',
        items: [
          'Jądro – gęste centrum z supermasywną czarną dziurą Sagittarius A*',
          'Poprzeczka – wydłużona struktura w centrum',
          'Ramiona spiralne – gdzie rodzą się nowe gwiazdy',
          'Dysk – płaski obszar, gdzie znajduje się większość gwiazd',
          'Halo – sferyczna otoczka ze starymi gwiazdami i ciemną materią'
        ]
      },
      {
        type: 'text',
        content: 'Nazwa "Droga Mleczna" pochodzi od mlecznego pasa światła widocznego na nocnym niebie. To światło miliardów odległych gwiazd w płaszczyźnie naszej galaktyki.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Najlepiej Drogę Mleczną widać z dala od świateł miast, w bezksiężycową noc. Warto wybrać się w ciemne miejsce latem, gdy centrum galaktyki jest wysoko nad horyzontem!'
      }
    ],
    quiz: [
      {
        id: 'mw-1',
        question: 'Ile gwiazd zawiera Droga Mleczna?',
        options: [
          { id: 'a', text: 'Około 1 milion', isCorrect: false },
          { id: 'b', text: 'Około 100-400 miliardów', isCorrect: true },
          { id: 'c', text: 'Około 1 bilion', isCorrect: false },
          { id: 'd', text: 'Dokładnie 8', isCorrect: false }
        ],
        explanation: 'Droga Mleczna zawiera szacunkowo 100-400 miliardów gwiazd. Dokładna liczba jest trudna do określenia.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 1,
      },
      {
        id: 'mw-2',
        question: 'Jak daleko od centrum galaktyki znajduje się Słońce?',
        options: [
          { id: 'a', text: 'W samym centrum', isCorrect: false },
          { id: 'b', text: 'Około 26 000 lat świetlnych', isCorrect: true },
          { id: 'c', text: 'Na samym krańcu', isCorrect: false },
          { id: 'd', text: 'Około 1 milion lat świetlnych', isCorrect: false }
        ],
        explanation: 'Słońce znajduje się około 26 000 lat świetlnych od centrum Drogi Mlecznej, w Ramieniu Oriona.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      },
      {
        id: 'mw-3',
        question: 'Co znajduje się w centrum Drogi Mlecznej?',
        options: [
          { id: 'a', text: 'Ogromna gwiazda', isCorrect: false },
          { id: 'b', text: 'Supermasywna czarna dziura', isCorrect: true },
          { id: 'c', text: 'Pustka', isCorrect: false },
          { id: 'd', text: 'Inna galaktyka', isCorrect: false }
        ],
        explanation: 'W centrum Drogi Mlecznej znajduje się supermasywna czarna dziura Sagittarius A* o masie około 4 milionów mas Słońca.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.BLACK_HOLES],
        difficultyLevel: 1,
      }
    ]
  },

  // Lekcja 9: Grupy i gromady galaktyk
  {
    slug: 'grupy-galaktyk',
    title: 'Grupy i gromady galaktyk',
    description: 'Odkryj, jak galaktyki łączą się w większe struktury Wszechświata.',
    category: LESSON_CATEGORIES.GALAXIES,
    level: DIFFICULTY_LEVELS.ADVANCED,
    duration: 7,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA16884/PIA16884~medium.jpg',
    tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.SCALES_DISTANCES],
    contentBlocks: [
      {
        type: 'text',
        content: 'Galaktyki nie istnieją w izolacji – tworzą grupy, gromady i supergromady. Te kosmiczne struktury są największymi znanymi obiektami we Wszechświecie.'
      },
      {
        type: 'list',
        content: 'Hierarchia struktur galaktycznych:',
        items: [
          'Grupy lokalne – kilka do kilkudziesięciu galaktyk (np. nasza Grupa Lokalna)',
          'Gromady – setki do tysięcy galaktyk (np. Gromada w Pannie)',
          'Supergromady – grupy gromad (np. Supergromada Laniakea)',
          'Włókna i ściany – największe struktury, tworzące "kosmiczną sieć"'
        ]
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Grupa Lokalna zawiera ponad 80 galaktyk, w tym Drogę Mleczną, Andromedę (M31) i Galaktykę Trójkąta (M33). Ma średnicę około 10 milionów lat świetlnych.'
      },
      {
        type: 'text',
        content: 'Galaktyka Andromedy to najbliższa duża galaktyka spiralna. Zbliża się do nas z prędkością 110 km/s i za około 4,5 miliarda lat zderzy się z Drogą Mleczną, tworząc nową galaktykę eliptyczną.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Andromedę można zobaczyć gołym okiem! To najdalszy obiekt widoczny bez teleskopu – znajduje się 2,5 miliona lat świetlnych od nas.'
      }
    ],
    quiz: [
      {
        id: 'galgroup-1',
        question: 'Jak nazywa się grupa galaktyk, do której należy Droga Mleczna?',
        options: [
          { id: 'a', text: 'Gromada w Pannie', isCorrect: false },
          { id: 'b', text: 'Grupa Lokalna', isCorrect: true },
          { id: 'c', text: 'Supergromada Laniakea', isCorrect: false },
          { id: 'd', text: 'Gromada Coma', isCorrect: false }
        ],
        explanation: 'Droga Mleczna należy do Grupy Lokalnej, która zawiera ponad 80 galaktyk, w tym Andromedę.',
        tags: [ADAPTIVE_TAGS.GALAXIES],
        difficultyLevel: 2,
      },
      {
        id: 'galgroup-2',
        question: 'Co stanie się z Drogą Mleczną za około 4,5 miliarda lat?',
        options: [
          { id: 'a', text: 'Zniknie', isCorrect: false },
          { id: 'b', text: 'Zderzy się z Andromedą', isCorrect: true },
          { id: 'c', text: 'Stanie się czarną dziurą', isCorrect: false },
          { id: 'd', text: 'Oddali się od innych galaktyk', isCorrect: false }
        ],
        explanation: 'Andromeda zbliża się do nas z prędkością 110 km/s. Za ~4,5 miliarda lat obie galaktyki się zderzą i połączą.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      },
      {
        id: 'galgroup-3',
        question: 'Jak daleko od nas jest galaktyka Andromedy?',
        options: [
          { id: 'a', text: '26 000 lat świetlnych', isCorrect: false },
          { id: 'b', text: '2,5 miliona lat świetlnych', isCorrect: true },
          { id: 'c', text: '100 milionów lat świetlnych', isCorrect: false },
          { id: 'd', text: '1 miliard lat świetlnych', isCorrect: false }
        ],
        explanation: 'Andromeda (M31) znajduje się około 2,5 miliona lat świetlnych od nas. To najdalszy obiekt widoczny gołym okiem.',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
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
    imageUrl: 'https://images-assets.nasa.gov/image/sts131-s-062/sts131-s-062~medium.jpg',
    tags: [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON, ADAPTIVE_TAGS.GRAVITY],
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
        explanation: 'Rakiety działają na zasadzie trzeciej zasady dynamiki Newtona: akcja = reakcja. Wyrzucane gazy pchają rakietę w przeciwnym kierunku.',
        tags: [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON],
        difficultyLevel: 1,
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
        explanation: 'Prędkość ucieczki z Ziemi wynosi około 11,2 km/s (ponad 40 000 km/h). To minimalna prędkość potrzebna do opuszczenia pola grawitacyjnego Ziemi.',
        tags: [ADAPTIVE_TAGS.GRAVITY, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
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
        explanation: 'Rakieta wytwarza ciąg poprzez wyrzucanie masy (spalin), nie potrzebując zewnętrznego medium (jak powietrze) do odpychania się.',
        tags: [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 11: Historia lotów kosmicznych
  {
    slug: 'historia-lotow-kosmicznych',
    title: 'Historia lotów kosmicznych',
    description: 'Od Sputnika do ISS - poznaj kamienie milowe eksploracji kosmosu.',
    category: LESSON_CATEGORIES.ROCKETS,
    level: DIFFICULTY_LEVELS.BEGINNER,
    duration: 7,
    imageUrl: 'https://images-assets.nasa.gov/image/s69-40022/s69-40022~medium.jpg',
    tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.ROCKETS],
    contentBlocks: [
      {
        type: 'text',
        content: 'Historia lotów kosmicznych rozpoczęła się w latach 50. XX wieku, w czasach zimnej wojny między USA a ZSRR. Ta rywalizacja, zwana "wyścigiem kosmicznym", przyspieszyła rozwój technologii rakietowej.'
      },
      {
        type: 'list',
        content: 'Kamienie milowe eksploracji kosmosu:',
        items: [
          '1957 – Sputnik 1, pierwszy sztuczny satelita (ZSRR)',
          '1961 – Jurij Gagarin, pierwszy człowiek w kosmosie (ZSRR)',
          '1969 – Apollo 11, pierwsze lądowanie na Księżycu (USA)',
          '1971 – Salut 1, pierwsza stacja kosmiczna (ZSRR)',
          '1981 – Start programu Space Shuttle (USA)',
          '1998 – Początek budowy ISS'
        ]
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Lot Jurija Gagarina trwał zaledwie 108 minut, podczas których okrążył Ziemię jeden raz. Jego słowa "Pójechali!" stały się symbolem początku ery kosmicznej.'
      },
      {
        type: 'text',
        content: 'Współcześnie eksploracja kosmosu przeżywa renesans. Prywatne firmy jak SpaceX, Blue Origin i Virgin Galactic rewolucjonizują dostęp do kosmosu, a plany kolonizacji Marsa stają się coraz bardziej realne.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Program Artemis NASA planuje powrót ludzi na Księżyc, a następnie loty na Marsa. Artemis II (lot załogowy wokół Księżyca) zaplanowany jest na 2025 rok.'
      }
    ],
    quiz: [
      {
        id: 'spacehist-1',
        question: 'Kto był pierwszym człowiekiem w kosmosie?',
        options: [
          { id: 'a', text: 'Neil Armstrong', isCorrect: false },
          { id: 'b', text: 'Jurij Gagarin', isCorrect: true },
          { id: 'c', text: 'Alan Shepard', isCorrect: false },
          { id: 'd', text: 'John Glenn', isCorrect: false }
        ],
        explanation: 'Jurij Gagarin z ZSRR był pierwszym człowiekiem w kosmosie. Jego lot odbył się 12 kwietnia 1961 roku.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS],
        difficultyLevel: 1,
      },
      {
        id: 'spacehist-2',
        question: 'W którym roku człowiek po raz pierwszy stanął na Księżycu?',
        options: [
          { id: 'a', text: '1965', isCorrect: false },
          { id: 'b', text: '1969', isCorrect: true },
          { id: 'c', text: '1972', isCorrect: false },
          { id: 'd', text: '1961', isCorrect: false }
        ],
        explanation: 'Neil Armstrong i Buzz Aldrin wylądowali na Księżycu 20 lipca 1969 roku podczas misji Apollo 11.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.MOONS],
        difficultyLevel: 1,
      },
      {
        id: 'spacehist-3',
        question: 'Jak nazywał się pierwszy sztuczny satelita?',
        options: [
          { id: 'a', text: 'Explorer 1', isCorrect: false },
          { id: 'b', text: 'Sputnik 1', isCorrect: true },
          { id: 'c', text: 'Wostok 1', isCorrect: false },
          { id: 'd', text: 'Apollo 1', isCorrect: false }
        ],
        explanation: 'Sputnik 1, wystrzelony przez ZSRR 4 października 1957 roku, był pierwszym sztucznym satelitą Ziemi.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS],
        difficultyLevel: 1,
      }
    ]
  },

  // Lekcja 12: Grawitacja i orbity
  {
    slug: 'grawitacja-i-orbity',
    title: 'Grawitacja i orbity',
    description: 'Zrozum, jak grawitacja utrzymuje planety na orbitach i satelity w kosmosie.',
    category: LESSON_CATEGORIES.ROCKETS,
    level: DIFFICULTY_LEVELS.INTERMEDIATE,
    duration: 7,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA00342/PIA00342~medium.jpg',
    tags: [ADAPTIVE_TAGS.GRAVITY, ADAPTIVE_TAGS.ORBITS, ADAPTIVE_TAGS.PHYSICS_NEWTON],
    contentBlocks: [
      {
        type: 'text',
        content: 'Grawitacja to siła przyciągania między wszystkimi obiektami posiadającymi masę. Im większa masa i im mniejsza odległość, tym silniejsza grawitacja. To ona utrzymuje planety na orbitach wokół Słońca.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Orbita to ciągłe "spadanie" wokół obiektu centralnego. Satelita krąży tak szybko, że choć ciągle spada ku Ziemi, to Ziemia "zakrzywia się" pod nim równie szybko!'
      },
      {
        type: 'list',
        content: 'Rodzaje orbit:',
        items: [
          'LEO (Low Earth Orbit) – 160-2000 km, ISS krąży na ~400 km',
          'MEO (Medium Earth Orbit) – 2000-35786 km, satelity GPS',
          'GEO (Geostationary Orbit) – 35786 km, satelity TV',
          'HEO (Highly Elliptical Orbit) – bardzo eliptyczne orbity'
        ]
      },
      {
        type: 'text',
        content: 'Orbita geostacjonarna jest szczególna – satelita na tej orbicie krąży z taką samą prędkością, z jaką obraca się Ziemia. Dzięki temu zawsze "wisi" nad tym samym punktem na równiku.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Im wyższa orbita, tym wolniej porusza się satelita. ISS na wysokości 400 km okrąża Ziemię w 90 minut, ale satelita geostacjonarny na 35786 km potrzebuje dokładnie 24 godziny.'
      }
    ],
    quiz: [
      {
        id: 'gravity-1',
        question: 'Co utrzymuje planety na orbitach wokół Słońca?',
        options: [
          { id: 'a', text: 'Magnetyzm', isCorrect: false },
          { id: 'b', text: 'Grawitacja', isCorrect: true },
          { id: 'c', text: 'Wiatr słoneczny', isCorrect: false },
          { id: 'd', text: 'Ciemna energia', isCorrect: false }
        ],
        explanation: 'Grawitacja Słońca utrzymuje planety na ich orbitach. Jest to siła przyciągania między masami.',
        tags: [ADAPTIVE_TAGS.GRAVITY, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 1,
      },
      {
        id: 'gravity-2',
        question: 'Na jakiej wysokości krąży orbita geostacjonarna?',
        options: [
          { id: 'a', text: '400 km', isCorrect: false },
          { id: 'b', text: '2000 km', isCorrect: false },
          { id: 'c', text: '35 786 km', isCorrect: true },
          { id: 'd', text: '384 000 km', isCorrect: false }
        ],
        explanation: 'Orbita geostacjonarna znajduje się na wysokości 35 786 km. Satelita na tej orbicie krąży z taką samą prędkością jak obrót Ziemi.',
        tags: [ADAPTIVE_TAGS.ORBITS, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      },
      {
        id: 'gravity-3',
        question: 'Na jakiej wysokości krąży Międzynarodowa Stacja Kosmiczna (ISS)?',
        options: [
          { id: 'a', text: 'Około 100 km', isCorrect: false },
          { id: 'b', text: 'Około 400 km', isCorrect: true },
          { id: 'c', text: 'Około 10 000 km', isCorrect: false },
          { id: 'd', text: 'Około 36 000 km', isCorrect: false }
        ],
        explanation: 'ISS krąży na niskiej orbicie (LEO) na wysokości około 400 km nad powierzchnią Ziemi.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 1,
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
    tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM, ADAPTIVE_TAGS.SPACE_MISSIONS],
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
        explanation: 'Teleskopy kosmiczne działają ponad atmosferą, która powoduje turbulencje i pochłania część promieniowania, zakłócając obserwacje.',
        tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 1,
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
        explanation: 'Teleskop Hubble\'a został wystrzelony 24 kwietnia 1990 roku i działa do dziś, dostarczając niezwykłych obrazów kosmosu.',
        tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.SPACE_MISSIONS],
        difficultyLevel: 2,
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
        explanation: 'JWST obserwuje głównie w podczerwieni, co pozwala mu widzieć przez obłoki pyłu i obserwować bardzo odległe, "przesunięte ku czerwieni" obiekty.',
        tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 14: Teleskop Jamesa Webba
  {
    slug: 'teleskop-jamesa-webba',
    title: 'Teleskop Jamesa Webba',
    description: 'Poznaj najpotężniejszy teleskop kosmiczny w historii ludzkości.',
    category: LESSON_CATEGORIES.TELESCOPES,
    level: DIFFICULTY_LEVELS.INTERMEDIATE,
    duration: 7,
    imageUrl: 'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e002151/GSFC_20171208_Archive_e002151~medium.jpg',
    tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM, ADAPTIVE_TAGS.SPACE_MISSIONS],
    contentBlocks: [
      {
        type: 'text',
        content: 'Teleskop Kosmiczny Jamesa Webba (JWST) to największy i najpotężniejszy teleskop kosmiczny w historii. Wystrzelony 25 grudnia 2021 roku, obserwuje Wszechświat w podczerwieni z punktu L2, 1,5 miliona km od Ziemi.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Główne lustro JWST ma średnicę 6,5 metra i składa się z 18 sześciokątnych segmentów pokrytych złotem. Jest prawie 3 razy większe od lustra Hubble\'a!'
      },
      {
        type: 'list',
        content: 'Główne cele naukowe JWST:',
        items: [
          'Obserwacja pierwszych galaktyk powstałych po Wielkim Wybuchu',
          'Badanie atmosfer egzoplanet (w tym poszukiwanie biomarkerów)',
          'Studiowanie narodzin gwiazd i układów planetarnych',
          'Obserwacje obiektów Układu Słonecznego w podczerwieni'
        ]
      },
      {
        type: 'text',
        content: 'JWST obserwuje w podczerwieni, co pozwala mu "widzieć" przez obłoki pyłu kosmicznego i obserwować bardzo odległe obiekty, których światło zostało rozciągnięte (przesunięte ku czerwieni) przez rozszerzanie się Wszechświata.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Osłona przeciwsłoneczna JWST ma rozmiar kortu tenisowego i chłodzi instrumenty do -233°C. Bez tego zimna detektor podczerwieni "widziałby" własne ciepło!'
      }
    ],
    quiz: [
      {
        id: 'jwst-1',
        question: 'W jakim zakresie promieniowania obserwuje JWST?',
        options: [
          { id: 'a', text: 'Promieniowanie rentgenowskie', isCorrect: false },
          { id: 'b', text: 'Światło widzialne', isCorrect: false },
          { id: 'c', text: 'Podczerwień', isCorrect: true },
          { id: 'd', text: 'Fale radiowe', isCorrect: false }
        ],
        explanation: 'JWST obserwuje głównie w podczerwieni, co pozwala widzieć przez pył kosmiczny i obserwować bardzo odległe galaktyki.',
        tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 1,
      },
      {
        id: 'jwst-2',
        question: 'Jak daleko od Ziemi znajduje się JWST?',
        options: [
          { id: 'a', text: '400 km (jak ISS)', isCorrect: false },
          { id: 'b', text: '36 000 km', isCorrect: false },
          { id: 'c', text: '1,5 miliona km (punkt L2)', isCorrect: true },
          { id: 'd', text: '384 000 km (jak Księżyc)', isCorrect: false }
        ],
        explanation: 'JWST znajduje się w punkcie Lagrange\'a L2, około 1,5 miliona km od Ziemi, w cieniu naszej planety.',
        tags: [ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      },
      {
        id: 'jwst-3',
        question: 'Jaką średnicę ma główne lustro JWST?',
        options: [
          { id: 'a', text: '2,4 metra', isCorrect: false },
          { id: 'b', text: '6,5 metra', isCorrect: true },
          { id: 'c', text: '10 metrów', isCorrect: false },
          { id: 'd', text: '1 metr', isCorrect: false }
        ],
        explanation: 'Główne lustro JWST ma średnicę 6,5 metra i składa się z 18 sześciokątnych segmentów pokrytych złotem.',
        tags: [ADAPTIVE_TAGS.TELESCOPES],
        difficultyLevel: 2,
      }
    ]
  },

  // Lekcja 15: Widmo elektromagnetyczne
  {
    slug: 'widmo-elektromagnetyczne',
    title: 'Widmo elektromagnetyczne',
    description: 'Zrozum, jak różne rodzaje światła pozwalają nam poznawać kosmos.',
    category: LESSON_CATEGORIES.TELESCOPES,
    level: DIFFICULTY_LEVELS.ADVANCED,
    duration: 8,
    imageUrl: 'https://images-assets.nasa.gov/image/PIA16695/PIA16695~medium.jpg',
    tags: [ADAPTIVE_TAGS.LIGHT_SPECTRUM, ADAPTIVE_TAGS.TELESCOPES, ADAPTIVE_TAGS.STARS_BASICS],
    contentBlocks: [
      {
        type: 'text',
        content: 'Światło widzialne to tylko mały fragment widma elektromagnetycznego. Astronomowie używają teleskopów obserwujących w różnych zakresach – od fal radiowych po promieniowanie gamma – aby poznać pełen obraz Wszechświata.'
      },
      {
        type: 'list',
        content: 'Widmo elektromagnetyczne (od najdłuższych do najkrótszych fal):',
        items: [
          'Fale radiowe – pulsary, zimny gaz, tło kosmiczne',
          'Mikrofale – promieniowanie tła (CMB), echo Wielkiego Wybuchu',
          'Podczerwień – chłodne obiekty, gaz i pył, odległe galaktyki',
          'Światło widzialne – gwiazdy, galaktyki (to, co widzą nasze oczy)',
          'Ultrafiolet – gorące gwiazdy, aktywne galaktyki',
          'Promieniowanie rentgenowskie – czarne dziury, pozostałości supernowych',
          'Promieniowanie gamma – najbardziej energetyczne zjawiska (GRB)'
        ]
      },
      {
        type: 'callout',
        calloutType: 'info',
        content: 'Atmosfera Ziemi blokuje większość promieniowania elektromagnetycznego – przepuszcza głównie światło widzialne i fale radiowe. Dlatego teleskopy rentgenowskie i gamma muszą być umieszczone w kosmosie.'
      },
      {
        type: 'text',
        content: 'Temperatura obiektu determinuje, w jakim zakresie najbardziej promieniuje. Bardzo gorące obiekty (miliony stopni) świecą w promieniach X, chłodne (dziesiątki kelwinów) w podczerwieni. To prawo Wiena.'
      },
      {
        type: 'callout',
        calloutType: 'tip',
        content: 'Przesunięcie ku czerwieni odległych galaktyk rozciąga ich światło z widzialnego do podczerwieni. JWST obserwuje te "przesunięte" galaktyki, widząc Wszechświat, gdy miał zaledwie kilkaset milionów lat!'
      }
    ],
    quiz: [
      {
        id: 'spectrum-1',
        question: 'Które promieniowanie ma najkrótszą długość fali?',
        options: [
          { id: 'a', text: 'Fale radiowe', isCorrect: false },
          { id: 'b', text: 'Światło widzialne', isCorrect: false },
          { id: 'c', text: 'Promieniowanie gamma', isCorrect: true },
          { id: 'd', text: 'Podczerwień', isCorrect: false }
        ],
        explanation: 'Promieniowanie gamma ma najkrótszą długość fali i najwyższą energię ze wszystkich rodzajów promieniowania elektromagnetycznego.',
        tags: [ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 2,
      },
      {
        id: 'spectrum-2',
        question: 'Dlaczego teleskopy rentgenowskie muszą być w kosmosie?',
        options: [
          { id: 'a', text: 'Bo są za ciężkie', isCorrect: false },
          { id: 'b', text: 'Bo atmosfera blokuje promieniowanie X', isCorrect: true },
          { id: 'c', text: 'Bo potrzebują próżni', isCorrect: false },
          { id: 'd', text: 'Bo na Ziemi jest za zimno', isCorrect: false }
        ],
        explanation: 'Atmosfera Ziemi pochłania promieniowanie rentgenowskie i gamma. To dobrze dla nas, ale wymusza umieszczenie teleskopów w kosmosie.',
        tags: [ADAPTIVE_TAGS.LIGHT_SPECTRUM, ADAPTIVE_TAGS.TELESCOPES],
        difficultyLevel: 2,
      },
      {
        id: 'spectrum-3',
        question: 'W jakim zakresie promieniuje zimny gaz międzygwiezdny?',
        options: [
          { id: 'a', text: 'Promieniowanie gamma', isCorrect: false },
          { id: 'b', text: 'Światło widzialne', isCorrect: false },
          { id: 'c', text: 'Fale radiowe i podczerwień', isCorrect: true },
          { id: 'd', text: 'Promieniowanie rentgenowskie', isCorrect: false }
        ],
        explanation: 'Zimny gaz promieniuje w falach radiowych i podczerwieni. Im chłodniejszy obiekt, tym dłuższa fala emitowanego promieniowania.',
        tags: [ADAPTIVE_TAGS.LIGHT_SPECTRUM, ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 2,
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
  return Array.from(new Set(lessons.map((lesson) => lesson.category)));
}
