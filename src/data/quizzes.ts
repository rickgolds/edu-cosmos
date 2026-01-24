import type { Quiz } from '@/features/quiz-engine';
import { LESSON_CATEGORIES } from '@/lib/constants';

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
        explanation: 'Jowisz jest największą planetą w Układzie Słonecznym. Ma średnicę 139 820 km – ponad 11 razy większą niż Ziemia.'
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
        explanation: 'Nasza galaktyka to Droga Mleczna (Milky Way). Jest to galaktyka spiralna zawierająca 100-400 miliardów gwiazd.'
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
        explanation: 'Rok świetlny to jednostka odległości – dystans, jaki światło pokonuje w ciągu jednego roku (około 9,46 biliona km).'
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
        explanation: 'Słońce widziane z kosmosu jest białe. Widzimy je jako żółte z Ziemi, ponieważ atmosfera rozprasza światło niebieskie.'
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
        explanation: 'Saturn ma ponad 140 znanych księżyców (stan na 2023), wyprzedzając Jowisza z około 95 księżycami.'
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
        explanation: 'Pierścienie Saturna są najbardziej widoczne i znane. Wszystkie gazowe olbrzymy mają pierścienie, ale tylko Saturna są łatwo widoczne.'
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
        explanation: 'Wenus ma średnicę 12 104 km, podczas gdy Ziemia ma 12 742 km. To różnica zaledwie 5%, dlatego Wenus nazywana jest "bliźniaczką Ziemi".'
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
        explanation: 'Pas Asteroidów znajduje się między orbitami Marsa i Jowisza. Zawiera miliony asteroid, ale ich łączna masa to tylko około 4% masy Księżyca.'
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
        explanation: 'Oś obrotu Urana jest nachylona o 98°, co oznacza, że planeta praktycznie "toczy się" wokół Słońca. Prawdopodobnie spowodowała to kolizja z dużym ciałem.'
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
        explanation: 'Pas Kuipera to region za orbitą Neptuna zawierający miliardy lodowych ciał, w tym planety karłowate jak Pluton i Eris.'
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
        explanation: 'Niebieskie gwiazdy są najgorętsze (powyżej 10 000 K). Czerwone są najchłodniejsze (około 3000 K). To odwrotnie niż intuicja!'
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
        explanation: 'Gwiazdy o masie powyżej około 25 mas Słońca po eksplozji supernowej tworzą czarne dziury. Mniejsze mogą tworzyć gwiazdy neutronowe.'
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
        explanation: 'Gwiazdy czerpią energię z fuzji jądrowej – łączenia lekkich jąder (głównie wodoru) w cięższe (hel), uwalniając ogromne ilości energii.'
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
        explanation: 'Proxima Centauri (część układu Alpha Centauri) jest najbliższą gwiazdą do Słońca, odległą o 4,24 roku świetlnego.'
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
        explanation: 'Jurij Gagarin z ZSRR został pierwszym człowiekiem w kosmosie 12 kwietnia 1961 roku podczas misji Wostok 1.'
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
        explanation: 'Neil Armstrong i Buzz Aldrin wylądowali na Księżycu 20 lipca 1969 roku podczas misji Apollo 11.'
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
        explanation: 'Voyager 1, wystrzelony w 1977 roku, jako pierwszy obiekt stworzony przez człowieka opuścił heliosferę w 2012 roku.'
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
        explanation: 'ISS (International Space Station) to Międzynarodowa Stacja Kosmiczna, działająca na orbicie od 1998 roku.'
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
        explanation: 'Curiosity (od 2012) i Perseverance (od 2021) to obecnie działające łaziki NASA na Marsie.'
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
