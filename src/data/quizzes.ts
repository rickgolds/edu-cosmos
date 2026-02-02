import type { Quiz } from '@/features/quiz-engine';
import { LESSON_CATEGORIES } from '@/lib/constants';
import { ADAPTIVE_TAGS } from '@/features/adaptive';

export const quizzes: Quiz[] = [
  {
    id: 'quick-quiz-1',
    title: 'Szybki Quiz - Kosmos',
    description: 'Sprawdź swoją wiedzę o kosmosie w 5 pytaniach!',
    category: 'quick',
    passingScore: 60,
    questions: [
      {
        id: 'qq1-1',
        question: 'Która planeta jest największa w Układzie Słonecznym?',
        options: [
          { id: 'a', text: 'Saturn', isCorrect: false },
          { id: 'b', text: 'Jowisz', isCorrect: true },
          { id: 'c', text: 'Neptun', isCorrect: false },
          { id: 'd', text: 'Uran', isCorrect: false }
        ],
        explanation: 'Jowisz jest największą planetą w Układzie Słonecznym. Ma średnicę 139 820 km – ponad 11 razy większą niż Ziemia.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 1,
      },
      {
        id: 'qq1-2',
        question: 'Jak nazywa się nasza galaktyka?',
        options: [
          { id: 'a', text: 'Andromeda', isCorrect: false },
          { id: 'b', text: 'Droga Mleczna', isCorrect: true },
          { id: 'c', text: 'Wielka Mgławica', isCorrect: false },
          { id: 'd', text: 'Orion', isCorrect: false }
        ],
        explanation: 'Nasza galaktyka to Droga Mleczna (Milky Way). Jest to galaktyka spiralna zawierająca 100-400 miliardów gwiazd.',
        tags: [ADAPTIVE_TAGS.GALAXIES],
        difficultyLevel: 1,
      },
      {
        id: 'qq1-3',
        question: 'Co to jest rok świetlny?',
        options: [
          { id: 'a', text: 'Jednostka czasu', isCorrect: false },
          { id: 'b', text: 'Jednostka odległości', isCorrect: true },
          { id: 'c', text: 'Jednostka masy', isCorrect: false },
          { id: 'd', text: 'Jednostka jasności', isCorrect: false }
        ],
        explanation: 'Rok świetlny to jednostka odległości – dystans, jaki światło pokonuje w ciągu jednego roku (około 9,46 biliona km).',
        tags: [ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 1,
      },
      {
        id: 'qq1-4',
        question: 'Jaki kolor ma Słońce widziane z kosmosu?',
        options: [
          { id: 'a', text: 'Żółty', isCorrect: false },
          { id: 'b', text: 'Pomarańczowy', isCorrect: false },
          { id: 'c', text: 'Biały', isCorrect: true },
          { id: 'd', text: 'Czerwony', isCorrect: false }
        ],
        explanation: 'Słońce widziane z kosmosu jest białe. Widzimy je jako żółte z Ziemi, ponieważ atmosfera rozprasza światło niebieskie.',
        tags: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 2,
      },
      {
        id: 'qq1-5',
        question: 'Która planeta ma najwięcej księżyców?',
        options: [
          { id: 'a', text: 'Jowisz', isCorrect: false },
          { id: 'b', text: 'Saturn', isCorrect: true },
          { id: 'c', text: 'Uran', isCorrect: false },
          { id: 'd', text: 'Neptun', isCorrect: false }
        ],
        explanation: 'Saturn ma ponad 140 znanych księżyców (stan na 2023), wyprzedzając Jowisza z około 95 księżycami.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.MOONS],
        difficultyLevel: 2,
      },
      {
        id: 'qq1-6',
        question: 'Galaktyka Andromedy jest w stosunku do Drogi Mlecznej:',
        options: [
          { id: 'a', text: 'Oddala się od nas', isCorrect: false },
          { id: 'b', text: 'Zbliża się do nas', isCorrect: true },
          { id: 'c', text: 'Stoi w miejscu', isCorrect: false },
          { id: 'd', text: 'Krąży wokół nas', isCorrect: false }
        ],
        explanation: 'Andromeda zbliża się do Drogi Mlecznej z prędkością ~110 km/s. Za około 4,5 miliarda lat obie galaktyki się zderzą!',
        tags: [ADAPTIVE_TAGS.GALAXIES, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      },
      {
        id: 'qq1-7',
        question: 'Jak daleko od Ziemi jest Słońce?',
        options: [
          { id: 'a', text: 'Około 150 milionów km', isCorrect: true },
          { id: 'b', text: 'Około 15 milionów km', isCorrect: false },
          { id: 'c', text: 'Około 1,5 miliarda km', isCorrect: false },
          { id: 'd', text: 'Około 15 miliardów km', isCorrect: false }
        ],
        explanation: 'Słońce jest oddalone od Ziemi o około 150 milionów km (1 AU - jednostka astronomiczna). Światło pokonuje tę odległość w około 8 minut.',
        tags: [ADAPTIVE_TAGS.SCALES_DISTANCES, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 1,
      },
      {
        id: 'qq1-8',
        question: 'Co napędza Słońce?',
        options: [
          { id: 'a', text: 'Spalanie wodoru', isCorrect: false },
          { id: 'b', text: 'Fuzja jądrowa', isCorrect: true },
          { id: 'c', text: 'Energia chemiczna', isCorrect: false },
          { id: 'd', text: 'Rozszczepienie atomów', isCorrect: false }
        ],
        explanation: 'Słońce czerpie energię z fuzji jądrowej - łączenia atomów wodoru w hel. Proces ten uwalnia ogromne ilości energii.',
        tags: [ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 2,
      },
      {
        id: 'qq1-9',
        question: 'Jak nazywa się największy księżyc w Układzie Słonecznym?',
        options: [
          { id: 'a', text: 'Tytan', isCorrect: false },
          { id: 'b', text: 'Ganimedes', isCorrect: true },
          { id: 'c', text: 'Europa', isCorrect: false },
          { id: 'd', text: 'Kallisto', isCorrect: false }
        ],
        explanation: 'Ganimedes (księżyc Jowisza) jest największym księżycem w Układzie Słonecznym - jest nawet większy od planety Merkury!',
        tags: [ADAPTIVE_TAGS.MOONS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 2,
      }
    ]
  },
  {
    id: 'solar-system-quiz',
    title: 'Quiz: Układ Słoneczny',
    description: 'Test wiedzy o naszym kosmicznym sąsiedztwie.',
    category: LESSON_CATEGORIES.SOLAR_SYSTEM,
    passingScore: 70,
    questions: [
      {
        id: 'ss-q1',
        question: 'Która planeta ma pierścienie widoczne gołym okiem przez teleskop?',
        options: [
          { id: 'a', text: 'Jowisz', isCorrect: false },
          { id: 'b', text: 'Saturn', isCorrect: true },
          { id: 'c', text: 'Uran', isCorrect: false },
          { id: 'd', text: 'Neptun', isCorrect: false }
        ],
        explanation: 'Pierścienie Saturna są najbardziej widoczne i znane. Wszystkie gazowe olbrzymy mają pierścienie, ale tylko Saturna są łatwo widoczne.',
        tags: [ADAPTIVE_TAGS.PLANETS],
        difficultyLevel: 1,
      },
      {
        id: 'ss-q2',
        question: 'Która planeta jest najbardziej podobna do Ziemi pod względem wielkości?',
        options: [
          { id: 'a', text: 'Mars', isCorrect: false },
          { id: 'b', text: 'Merkury', isCorrect: false },
          { id: 'c', text: 'Wenus', isCorrect: true },
          { id: 'd', text: 'Pluton', isCorrect: false }
        ],
        explanation: 'Wenus ma średnicę 12 104 km, podczas gdy Ziemia ma 12 742 km. To różnica zaledwie 5%, dlatego Wenus nazywana jest "bliźniaczką Ziemi".',
        tags: [ADAPTIVE_TAGS.PLANETS],
        difficultyLevel: 1,
      },
      {
        id: 'ss-q3',
        question: 'Gdzie znajduje się Pas Asteroidów?',
        options: [
          { id: 'a', text: 'Między Ziemią a Marsem', isCorrect: false },
          { id: 'b', text: 'Między Marsem a Jowiszem', isCorrect: true },
          { id: 'c', text: 'Między Saturnem a Uranem', isCorrect: false },
          { id: 'd', text: 'Za Neptunem', isCorrect: false }
        ],
        explanation: 'Pas Asteroidów znajduje się między orbitami Marsa i Jowisza. Zawiera miliony asteroid, ale ich łączna masa to tylko około 4% masy Księżyca.',
        tags: [ADAPTIVE_TAGS.ASTEROIDS_COMETS, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 2,
      },
      {
        id: 'ss-q4',
        question: 'Która planeta obraca się "na boku" (oś nachylona o prawie 90°)?',
        options: [
          { id: 'a', text: 'Neptune', isCorrect: false },
          { id: 'b', text: 'Saturn', isCorrect: false },
          { id: 'c', text: 'Uran', isCorrect: true },
          { id: 'd', text: 'Jowisz', isCorrect: false }
        ],
        explanation: 'Oś obrotu Urana jest nachylona o 98°, co oznacza, że planeta praktycznie "toczy się" wokół Słońca. Prawdopodobnie spowodowała to kolizja z dużym ciałem.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 2,
      },
      {
        id: 'ss-q5',
        question: 'Co to jest Pas Kuipera?',
        options: [
          { id: 'a', text: 'Pierścień wokół Saturna', isCorrect: false },
          { id: 'b', text: 'Region lodowych ciał za Neptunem', isCorrect: true },
          { id: 'c', text: 'Pas asteroid między Marsem a Jowiszem', isCorrect: false },
          { id: 'd', text: 'Chmura komet otaczająca Słońce', isCorrect: false }
        ],
        explanation: 'Pas Kuipera to region za orbitą Neptuna zawierający miliardy lodowych ciał, w tym planety karłowate jak Pluton i Eris.',
        tags: [ADAPTIVE_TAGS.ASTEROIDS_COMETS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 2,
      },
      {
        id: 'ss-q6',
        question: 'Która planeta jest najbliżej Słońca?',
        options: [
          { id: 'a', text: 'Wenus', isCorrect: false },
          { id: 'b', text: 'Merkury', isCorrect: true },
          { id: 'c', text: 'Mars', isCorrect: false },
          { id: 'd', text: 'Ziemia', isCorrect: false }
        ],
        explanation: 'Merkury jest najbliższą planetą do Słońca, w odległości około 58 milionów km. Rok na Merkurym trwa tylko 88 dni ziemskich.',
        tags: [ADAPTIVE_TAGS.PLANETS, ADAPTIVE_TAGS.ORBITS],
        difficultyLevel: 1,
      },
      {
        id: 'ss-q7',
        question: 'Skąd pochodzą komety?',
        options: [
          { id: 'a', text: 'Z Pasa Asteroid', isCorrect: false },
          { id: 'b', text: 'Z Pasa Kuipera i Obłoku Oorta', isCorrect: true },
          { id: 'c', text: 'Z Księżyca', isCorrect: false },
          { id: 'd', text: 'Z pierścieni Saturna', isCorrect: false }
        ],
        explanation: 'Komety pochodzą z Pasa Kuipera (krótkotrwałe) i Obłoku Oorta (długotrwałe). To lodowe ciała z początków Układu Słonecznego.',
        tags: [ADAPTIVE_TAGS.ASTEROIDS_COMETS],
        difficultyLevel: 2,
      },
      {
        id: 'ss-q8',
        question: 'Ile trwa jeden obieg Ziemi wokół Słońca?',
        options: [
          { id: 'a', text: '24 godziny', isCorrect: false },
          { id: 'b', text: '365,25 dni', isCorrect: true },
          { id: 'c', text: '28 dni', isCorrect: false },
          { id: 'd', text: '12 miesięcy księżycowych', isCorrect: false }
        ],
        explanation: 'Ziemia obiega Słońce w około 365,25 dni (rok). Dodatkowe 0,25 dnia to powód, dla którego mamy lata przestępne!',
        tags: [ADAPTIVE_TAGS.ORBITS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 1,
      }
    ]
  },
  {
    id: 'stars-quiz',
    title: 'Quiz: Gwiazdy i ich życie',
    description: 'Sprawdź swoją wiedzę o gwiazdach.',
    category: LESSON_CATEGORIES.STARS,
    passingScore: 70,
    questions: [
      {
        id: 'st-q1',
        question: 'Jakiego koloru są najgorętsze gwiazdy?',
        options: [
          { id: 'a', text: 'Czerwone', isCorrect: false },
          { id: 'b', text: 'Żółte', isCorrect: false },
          { id: 'c', text: 'Niebieskie', isCorrect: true },
          { id: 'd', text: 'Pomarańczowe', isCorrect: false }
        ],
        explanation: 'Niebieskie gwiazdy są najgorętsze (powyżej 10 000 K). Czerwone są najchłodniejsze (około 3000 K). To odwrotnie niż intuicja!',
        tags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
        difficultyLevel: 2,
      },
      {
        id: 'st-q2',
        question: 'Co pozostaje po eksplozji supernowej gwiazdy o bardzo dużej masie?',
        options: [
          { id: 'a', text: 'Biały karzeł', isCorrect: false },
          { id: 'b', text: 'Mgławica', isCorrect: false },
          { id: 'c', text: 'Czarna dziura', isCorrect: true },
          { id: 'd', text: 'Nic', isCorrect: false }
        ],
        explanation: 'Gwiazdy o masie powyżej około 25 mas Słońca po eksplozji supernowej tworzą czarne dziury. Mniejsze mogą tworzyć gwiazdy neutronowe.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.BLACK_HOLES],
        difficultyLevel: 2,
      },
      {
        id: 'st-q3',
        question: 'Jaki proces dostarcza energii gwiazdom?',
        options: [
          { id: 'a', text: 'Spalanie chemiczne', isCorrect: false },
          { id: 'b', text: 'Fuzja jądrowa', isCorrect: true },
          { id: 'c', text: 'Rozszczepienie atomu', isCorrect: false },
          { id: 'd', text: 'Grawitacja', isCorrect: false }
        ],
        explanation: 'Gwiazdy czerpią energię z fuzji jądrowej – łączenia lekkich jąder (głównie wodoru) w cięższe (hel), uwalniając ogromne ilości energii.',
        tags: [ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 1,
      },
      {
        id: 'st-q4',
        question: 'Jaka jest najbliższa gwiazda do Słońca?',
        options: [
          { id: 'a', text: 'Syriusz', isCorrect: false },
          { id: 'b', text: 'Alpha Centauri', isCorrect: false },
          { id: 'c', text: 'Proxima Centauri', isCorrect: true },
          { id: 'd', text: 'Betelgeza', isCorrect: false }
        ],
        explanation: 'Proxima Centauri (część układu Alpha Centauri) jest najbliższą gwiazdą do Słońca, odległą o 4,24 roku świetlnego.',
        tags: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.SCALES_DISTANCES],
        difficultyLevel: 2,
      },
      {
        id: 'st-q5',
        question: 'Jak nazywa się zjawisko wybuchu gwiazdy na końcu jej życia?',
        options: [
          { id: 'a', text: 'Nova', isCorrect: false },
          { id: 'b', text: 'Supernowa', isCorrect: true },
          { id: 'c', text: 'Hipernowa', isCorrect: false },
          { id: 'd', text: 'Gwiazda neutronowa', isCorrect: false }
        ],
        explanation: 'Supernowa to potężna eksplozja gwiazdy, która może świecić jaśniej niż cała galaktyka! Nova to słabszy, powtarzalny wybuch.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION],
        difficultyLevel: 2,
      },
      {
        id: 'st-q6',
        question: 'Co to jest czerwony karzeł?',
        options: [
          { id: 'a', text: 'Umierająca gwiazda', isCorrect: false },
          { id: 'b', text: 'Mała, chłodna gwiazda', isCorrect: true },
          { id: 'c', text: 'Planeta podobna do Marsa', isCorrect: false },
          { id: 'd', text: 'Czarna dziura', isCorrect: false }
        ],
        explanation: 'Czerwone karły to małe, chłodne gwiazdy typu M. Są najliczniejszym typem gwiazd w galaktyce i mogą żyć biliony lat!',
        tags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.STARS_BASICS],
        difficultyLevel: 2,
      },
      {
        id: 'st-q7',
        question: 'Co powstaje z gwiazdy podobnej do Słońca po jej śmierci?',
        options: [
          { id: 'a', text: 'Czarna dziura', isCorrect: false },
          { id: 'b', text: 'Biały karzeł', isCorrect: true },
          { id: 'c', text: 'Gwiazda neutronowa', isCorrect: false },
          { id: 'd', text: 'Nowa gwiazda', isCorrect: false }
        ],
        explanation: 'Gwiazdy o masie podobnej do Słońca kończą życie jako białe karły - gorące, ale małe pozostałości otoczone mgławicą planetarną.',
        tags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.STAR_TYPES],
        difficultyLevel: 2,
      }
    ]
  },
  {
    id: 'space-exploration-quiz',
    title: 'Quiz: Eksploracja kosmosu',
    description: 'Test wiedzy o misjach kosmicznych i odkryciach.',
    category: 'exploration',
    passingScore: 60,
    questions: [
      {
        id: 'ex-q1',
        question: 'Kto był pierwszym człowiekiem w kosmosie?',
        options: [
          { id: 'a', text: 'Neil Armstrong', isCorrect: false },
          { id: 'b', text: 'Jurij Gagarin', isCorrect: true },
          { id: 'c', text: 'Alan Shepard', isCorrect: false },
          { id: 'd', text: 'John Glenn', isCorrect: false }
        ],
        explanation: 'Jurij Gagarin z ZSRR został pierwszym człowiekiem w kosmosie 12 kwietnia 1961 roku podczas misji Wostok 1.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS],
        difficultyLevel: 1,
      },
      {
        id: 'ex-q2',
        question: 'W którym roku człowiek po raz pierwszy stanął na Księżycu?',
        options: [
          { id: 'a', text: '1965', isCorrect: false },
          { id: 'b', text: '1969', isCorrect: true },
          { id: 'c', text: '1972', isCorrect: false },
          { id: 'd', text: '1975', isCorrect: false }
        ],
        explanation: 'Neil Armstrong i Buzz Aldrin wylądowali na Księżycu 20 lipca 1969 roku podczas misji Apollo 11.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.MOONS],
        difficultyLevel: 1,
      },
      {
        id: 'ex-q3',
        question: 'Która sonda jako pierwsza opuściła Układ Słoneczny?',
        options: [
          { id: 'a', text: 'Pioneer 10', isCorrect: false },
          { id: 'b', text: 'Voyager 1', isCorrect: true },
          { id: 'c', text: 'New Horizons', isCorrect: false },
          { id: 'd', text: 'Cassini', isCorrect: false }
        ],
        explanation: 'Voyager 1, wystrzelony w 1977 roku, jako pierwszy obiekt stworzony przez człowieka opuścił heliosferę w 2012 roku.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 2,
      },
      {
        id: 'ex-q4',
        question: 'Jak nazywa się Międzynarodowa Stacja Kosmiczna po angielsku?',
        options: [
          { id: 'a', text: 'ISS', isCorrect: true },
          { id: 'b', text: 'MIR', isCorrect: false },
          { id: 'c', text: 'Skylab', isCorrect: false },
          { id: 'd', text: 'Tiangong', isCorrect: false }
        ],
        explanation: 'ISS (International Space Station) to Międzynarodowa Stacja Kosmiczna, działająca na orbicie od 1998 roku.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS],
        difficultyLevel: 1,
      },
      {
        id: 'ex-q5',
        question: 'Który łazik NASA obecnie bada Marsa?',
        options: [
          { id: 'a', text: 'Opportunity', isCorrect: false },
          { id: 'b', text: 'Spirit', isCorrect: false },
          { id: 'c', text: 'Curiosity i Perseverance', isCorrect: true },
          { id: 'd', text: 'Sojourner', isCorrect: false }
        ],
        explanation: 'Curiosity (od 2012) i Perseverance (od 2021) to obecnie działające łaziki NASA na Marsie.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.PLANETS],
        difficultyLevel: 2,
      },
      {
        id: 'ex-q6',
        question: 'Która sonda zbadała Plutona w 2015 roku?',
        options: [
          { id: 'a', text: 'Voyager 2', isCorrect: false },
          { id: 'b', text: 'New Horizons', isCorrect: true },
          { id: 'c', text: 'Pioneer 10', isCorrect: false },
          { id: 'd', text: 'Cassini', isCorrect: false }
        ],
        explanation: 'New Horizons przeleciała obok Plutona 14 lipca 2015, dostarczając pierwsze szczegółowe zdjęcia planety karłowatej.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
        difficultyLevel: 2,
      },
      {
        id: 'ex-q7',
        question: 'Jak nazywał się pierwszy sztuczny satelita Ziemi?',
        options: [
          { id: 'a', text: 'Explorer 1', isCorrect: false },
          { id: 'b', text: 'Sputnik 1', isCorrect: true },
          { id: 'c', text: 'Wostok 1', isCorrect: false },
          { id: 'd', text: 'Telstar', isCorrect: false }
        ],
        explanation: 'Sputnik 1, wystrzelony przez ZSRR 4 października 1957, był pierwszym sztucznym satelitą Ziemi, rozpoczynając erę kosmiczną.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS],
        difficultyLevel: 1,
      },
      {
        id: 'ex-q8',
        question: 'Który teleskop kosmiczny został wystrzelony w 1990 roku i działa do dziś?',
        options: [
          { id: 'a', text: 'James Webb', isCorrect: false },
          { id: 'b', text: 'Hubble', isCorrect: true },
          { id: 'c', text: 'Kepler', isCorrect: false },
          { id: 'd', text: 'Spitzer', isCorrect: false }
        ],
        explanation: 'Teleskop Hubble\'a działa na orbicie od 1990 roku i dostarczył tysiące przełomowych zdjęć Wszechświata.',
        tags: [ADAPTIVE_TAGS.SPACE_MISSIONS, ADAPTIVE_TAGS.GALAXIES],
        difficultyLevel: 2,
      }
    ]
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

export function getQuizzesByCategory(category: string): Quiz[] {
  return quizzes.filter((quiz) => quiz.category === category);
}

export function getQuickQuizzes(): Quiz[] {
  return quizzes.filter((quiz) => quiz.category === 'quick');
}
