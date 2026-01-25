export interface GlossaryTerm {
  id: string;
  term: string;
  termEn?: string;
  definition: string;
  category: 'astronomy' | 'physics' | 'space-exploration' | 'celestial-bodies' | 'instruments';
  related?: string[]; // IDs of related terms
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Astronomy - podstawowe pojęcia
  {
    id: 'galaxy',
    term: 'galaktyka',
    termEn: 'galaxy',
    definition: 'Układ gwiazd, gazu, pyłu i ciemnej materii związanych grawitacyjnie. Nasza galaktyka to Droga Mleczna, zawierająca 100-400 miliardów gwiazd.',
    category: 'astronomy',
    related: ['milky-way', 'dark-matter', 'star'],
  },
  {
    id: 'milky-way',
    term: 'Droga Mleczna',
    termEn: 'Milky Way',
    definition: 'Nasza galaktyka spiralna, w której znajduje się Układ Słoneczny. Ma średnicę około 100 000 lat świetlnych.',
    category: 'astronomy',
    related: ['galaxy', 'solar-system'],
  },
  {
    id: 'nebula',
    term: 'mgławica',
    termEn: 'nebula',
    definition: 'Obłok gazu i pyłu w przestrzeni kosmicznej. Mgławice mogą być miejscami narodzin gwiazd lub pozostałościami po ich śmierci.',
    category: 'astronomy',
    related: ['star', 'supernova'],
  },
  {
    id: 'supernova',
    term: 'supernowa',
    termEn: 'supernova',
    definition: 'Gwałtowna eksplozja masywnej gwiazdy pod koniec jej życia, uwalniająca ogromne ilości energii. Może świecić jaśniej niż cała galaktyka.',
    category: 'astronomy',
    related: ['star', 'neutron-star', 'black-hole'],
  },
  {
    id: 'black-hole',
    term: 'czarna dziura',
    termEn: 'black hole',
    definition: 'Obszar czasoprzestrzeni o tak silnej grawitacji, że nic, nawet światło, nie może z niego uciec. Powstaje po śmierci masywnych gwiazd.',
    category: 'astronomy',
    related: ['supernova', 'event-horizon', 'singularity'],
  },
  {
    id: 'event-horizon',
    term: 'horyzont zdarzeń',
    termEn: 'event horizon',
    definition: 'Granica czarnej dziury, poza którą nic nie może uciec. Wszystko co przekroczy horyzont zdarzeń, jest nieodwracalnie pochłaniane.',
    category: 'astronomy',
    related: ['black-hole'],
  },
  {
    id: 'quasar',
    term: 'kwazar',
    termEn: 'quasar',
    definition: 'Niezwykle jasne jądro odległej galaktyki, zasilane przez supermasywną czarną dziurę aktywnie pochłaniającą materię.',
    category: 'astronomy',
    related: ['black-hole', 'galaxy'],
  },
  {
    id: 'pulsar',
    term: 'pulsar',
    termEn: 'pulsar',
    definition: 'Szybko rotująca gwiazda neutronowa emitująca regularne impulsy promieniowania elektromagnetycznego.',
    category: 'astronomy',
    related: ['neutron-star', 'supernova'],
  },
  {
    id: 'neutron-star',
    term: 'gwiazda neutronowa',
    termEn: 'neutron star',
    definition: 'Niezwykle gęsta pozostałość po eksplozji supernowej, złożona głównie z neutronów. Łyżeczka jej materii waży miliardy ton.',
    category: 'astronomy',
    related: ['supernova', 'pulsar'],
  },
  {
    id: 'star',
    term: 'gwiazda',
    termEn: 'star',
    definition: 'Kula gorącej plazmy utrzymywana przez własną grawitację, w której zachodzą reakcje fuzji jądrowej. Słońce jest najbliższą nam gwiazdą.',
    category: 'astronomy',
    related: ['sun', 'fusion', 'red-giant'],
  },
  {
    id: 'red-giant',
    term: 'czerwony olbrzym',
    termEn: 'red giant',
    definition: 'Gwiazda w późnej fazie ewolucji, która znacznie się rozszerzyła i schłodziła. Słońce stanie się czerwonym olbrzymem za około 5 mld lat.',
    category: 'astronomy',
    related: ['star', 'white-dwarf'],
  },
  {
    id: 'white-dwarf',
    term: 'biały karzeł',
    termEn: 'white dwarf',
    definition: 'Końcowe stadium ewolucji gwiazd o małej i średniej masie. Gorący, gęsty obiekt wielkości Ziemi, powoli stygający przez miliardy lat.',
    category: 'astronomy',
    related: ['red-giant', 'star'],
  },
  {
    id: 'dark-matter',
    term: 'ciemna materia',
    termEn: 'dark matter',
    definition: 'Hipotetyczna forma materii nieemitująca światła, wykrywalna tylko przez efekty grawitacyjne. Stanowi około 27% Wszechświata.',
    category: 'astronomy',
    related: ['dark-energy', 'galaxy'],
  },
  {
    id: 'dark-energy',
    term: 'ciemna energia',
    termEn: 'dark energy',
    definition: 'Tajemnicza forma energii powodująca przyspieszającą ekspansję Wszechświata. Stanowi około 68% całkowitej energii kosmosu.',
    category: 'astronomy',
    related: ['dark-matter', 'big-bang'],
  },
  {
    id: 'big-bang',
    term: 'Wielki Wybuch',
    termEn: 'Big Bang',
    definition: 'Teoria opisująca początek Wszechświata około 13.8 miliarda lat temu, gdy cała materia i energia były skondensowane w jednym punkcie.',
    category: 'astronomy',
    related: ['cosmic-background-radiation'],
  },
  {
    id: 'cosmic-background-radiation',
    term: 'promieniowanie tła',
    termEn: 'cosmic microwave background',
    definition: 'Najstarsze światło we Wszechświecie, emitowane około 380 000 lat po Wielkim Wybuchu. Dowód na teorię Wielkiego Wybuchu.',
    category: 'astronomy',
    related: ['big-bang'],
  },

  // Jednostki i pomiary
  {
    id: 'light-year',
    term: 'rok świetlny',
    termEn: 'light-year',
    definition: 'Jednostka odległości równa dystansowi, jaki światło pokonuje w ciągu roku – około 9.46 biliona km (9.46 × 10¹² km).',
    category: 'physics',
    related: ['parsec', 'au'],
  },
  {
    id: 'parsec',
    term: 'parsek',
    termEn: 'parsec',
    definition: 'Jednostka odległości astronomicznej równa około 3.26 roku świetlnego (~31 bilionów km). Używana głównie przez astronomów.',
    category: 'physics',
    related: ['light-year'],
  },
  {
    id: 'au',
    term: 'jednostka astronomiczna',
    termEn: 'astronomical unit (AU)',
    definition: 'Średnia odległość Ziemi od Słońca, około 150 milionów km. Używana do mierzenia odległości w Układzie Słonecznym.',
    category: 'physics',
    related: ['solar-system', 'light-year'],
  },
  {
    id: 'redshift',
    term: 'przesunięcie ku czerwieni',
    termEn: 'redshift',
    definition: 'Przesunięcie widma światła ku dłuższym falom (czerwieni), wskazujące na oddalanie się obiektu. Kluczowe dla pomiaru odległości galaktyk.',
    category: 'physics',
    related: ['doppler-effect'],
  },
  {
    id: 'doppler-effect',
    term: 'efekt Dopplera',
    termEn: 'Doppler effect',
    definition: 'Zmiana częstotliwości fali (dźwięku, światła) ze względu na ruch źródła lub obserwatora. W astronomii używany do badania ruchu gwiazd.',
    category: 'physics',
    related: ['redshift'],
  },

  // Fizyka kosmiczna
  {
    id: 'fusion',
    term: 'fuzja jądrowa',
    termEn: 'nuclear fusion',
    definition: 'Proces łączenia lekkich jąder atomowych w cięższe, uwalniający ogromne ilości energii. Źródło energii gwiazd.',
    category: 'physics',
    related: ['star', 'sun'],
  },
  {
    id: 'gravity',
    term: 'grawitacja',
    termEn: 'gravity',
    definition: 'Siła przyciągania między obiektami posiadającymi masę. Im większa masa i mniejsza odległość, tym silniejsza grawitacja.',
    category: 'physics',
    related: ['mass', 'orbit'],
  },
  {
    id: 'orbit',
    term: 'orbita',
    termEn: 'orbit',
    definition: 'Trajektoria, po której jedno ciało niebieskie krąży wokół drugiego pod wpływem grawitacji. Ziemia orbituje wokół Słońca.',
    category: 'physics',
    related: ['gravity', 'solar-system'],
  },
  {
    id: 'escape-velocity',
    term: 'prędkość ucieczki',
    termEn: 'escape velocity',
    definition: 'Minimalna prędkość potrzebna do opuszczenia pola grawitacyjnego ciała niebieskiego. Dla Ziemi wynosi 11.2 km/s.',
    category: 'physics',
    related: ['gravity', 'rocket'],
  },
  {
    id: 'cosmic-ray',
    term: 'promieniowanie kosmiczne',
    termEn: 'cosmic ray',
    definition: 'Wysokoenergetyczne cząstki pochodzące z kosmosu, głównie protony i jądra atomowe. Stanowią zagrożenie dla astronautów.',
    category: 'physics',
    related: ['radiation'],
  },
  {
    id: 'sol',
    term: 'sol',
    termEn: 'sol',
    definition: 'Marsjański dzień słoneczny, trwający około 24 godziny i 39 minut. Używany do liczenia dni misji łazików na Marsie.',
    category: 'space-exploration',
    related: ['mars', 'rover'],
  },

  // Ciała niebieskie
  {
    id: 'sun',
    term: 'Słońce',
    termEn: 'Sun',
    definition: 'Gwiazda centralna Układu Słonecznego, zawierająca 99.86% jego masy. Typu spektralnego G2V, wiek około 4.6 miliarda lat.',
    category: 'celestial-bodies',
    related: ['star', 'solar-system'],
  },
  {
    id: 'solar-system',
    term: 'Układ Słoneczny',
    termEn: 'Solar System',
    definition: 'Słońce wraz z wszystkimi ciałami niebieskimi krążącymi wokół niego: 8 planet, planety karłowate, asteroidy, komety.',
    category: 'celestial-bodies',
    related: ['sun', 'planet'],
  },
  {
    id: 'planet',
    term: 'planeta',
    termEn: 'planet',
    definition: 'Ciało niebieskie krążące wokół gwiazdy, o masie wystarczającej do uzyskania kulistego kształtu i oczyszczenia swojej orbity.',
    category: 'celestial-bodies',
    related: ['exoplanet', 'solar-system'],
  },
  {
    id: 'exoplanet',
    term: 'egzoplaneta',
    termEn: 'exoplanet',
    definition: 'Planeta krążąca wokół innej gwiazdy niż Słońce. Odkryto już ponad 5000 egzoplanet, niektóre w strefie zamieszkiwalnej.',
    category: 'celestial-bodies',
    related: ['planet', 'habitable-zone'],
  },
  {
    id: 'habitable-zone',
    term: 'strefa zamieszkiwalna',
    termEn: 'habitable zone',
    definition: 'Obszar wokół gwiazdy, gdzie warunki mogą pozwalać na istnienie wody w stanie ciekłym na powierzchni planety.',
    category: 'celestial-bodies',
    related: ['exoplanet'],
  },
  {
    id: 'asteroid',
    term: 'asteroida',
    termEn: 'asteroid',
    definition: 'Mały skalisty obiekt krążący wokół Słońca, głównie w pasie asteroid między Marsem a Jowiszem. Pozostałość po formowaniu planet.',
    category: 'celestial-bodies',
    related: ['neo', 'meteor'],
  },
  {
    id: 'neo',
    term: 'NEO',
    termEn: 'Near-Earth Object',
    definition: 'Obiekt bliski Ziemi – asteroida lub kometa, której orbita zbliża ją do orbity Ziemi. Monitorowane pod kątem potencjalnego zagrożenia.',
    category: 'celestial-bodies',
    related: ['asteroid', 'comet'],
  },
  {
    id: 'comet',
    term: 'kometa',
    termEn: 'comet',
    definition: 'Ciało niebieskie zbudowane z lodu i pyłu, które zbliżając się do Słońca tworzy charakterystyczny ogon gazów i pyłu.',
    category: 'celestial-bodies',
    related: ['asteroid', 'oort-cloud'],
  },
  {
    id: 'oort-cloud',
    term: 'Obłok Oorta',
    termEn: 'Oort Cloud',
    definition: 'Hipotetyczna sferyczna powłoka lodowych ciał otaczająca Układ Słoneczny na odległości do 100 000 AU. Źródło komet długookresowych.',
    category: 'celestial-bodies',
    related: ['comet', 'kuiper-belt'],
  },
  {
    id: 'kuiper-belt',
    term: 'Pas Kuipera',
    termEn: 'Kuiper Belt',
    definition: 'Region lodowych ciał za orbitą Neptuna, zawierający planety karłowate jak Pluton i Eris. Rozciąga się od 30 do 50 AU od Słońca.',
    category: 'celestial-bodies',
    related: ['oort-cloud', 'dwarf-planet'],
  },
  {
    id: 'dwarf-planet',
    term: 'planeta karłowata',
    termEn: 'dwarf planet',
    definition: 'Ciało niebieskie o kulistym kształcie, ale niewystarczającej masie do oczyszczenia swojej orbity. Przykłady: Pluton, Ceres, Eris.',
    category: 'celestial-bodies',
    related: ['planet', 'kuiper-belt'],
  },
  {
    id: 'meteor',
    term: 'meteor',
    termEn: 'meteor',
    definition: 'Zjawisko świetlne ("spadająca gwiazda") powstające gdy meteoroid spala się w atmosferze Ziemi.',
    category: 'celestial-bodies',
    related: ['meteorite', 'asteroid'],
  },
  {
    id: 'meteorite',
    term: 'meteoryt',
    termEn: 'meteorite',
    definition: 'Fragment materii kosmicznej, który przetrwał przelot przez atmosferę i spadł na powierzchnię Ziemi.',
    category: 'celestial-bodies',
    related: ['meteor', 'asteroid'],
  },
  {
    id: 'mars',
    term: 'Mars',
    termEn: 'Mars',
    definition: 'Czwarta planeta od Słońca, zwana "Czerwoną Planetą". Cel wielu misji kosmicznych, potencjalny cel kolonizacji.',
    category: 'celestial-bodies',
    related: ['rover', 'sol'],
  },
  {
    id: 'eclipse',
    term: 'zaćmienie',
    termEn: 'eclipse',
    definition: 'Zjawisko astronomiczne, gdy jedno ciało niebieskie zasłania drugie. Zaćmienie Słońca lub Księżyca.',
    category: 'celestial-bodies',
    related: ['sun', 'moon'],
  },
  {
    id: 'moon',
    term: 'Księżyc',
    termEn: 'Moon',
    definition: 'Naturalny satelita Ziemi, jedyny obiekt poza Ziemią, na którym stanął człowiek (misje Apollo 1969-1972).',
    category: 'celestial-bodies',
    related: ['eclipse', 'tide'],
  },
  {
    id: 'aurora',
    term: 'zorza polarna',
    termEn: 'aurora',
    definition: 'Świecenie górnej atmosfery spowodowane interakcją cząstek wiatru słonecznego z polem magnetycznym Ziemi.',
    category: 'celestial-bodies',
    related: ['solar-wind', 'magnetosphere'],
  },
  {
    id: 'solar-wind',
    term: 'wiatr słoneczny',
    termEn: 'solar wind',
    definition: 'Strumień naładowanych cząstek (głównie protonów i elektronów) emitowanych przez Słońce z prędkością 400-800 km/s.',
    category: 'celestial-bodies',
    related: ['aurora', 'sun'],
  },

  // Eksploracja kosmosu
  {
    id: 'rocket',
    term: 'rakieta',
    termEn: 'rocket',
    definition: 'Pojazd wykorzystujący zasadę akcji i reakcji do poruszania się. Jedyny sposób na opuszczenie grawitacji Ziemi.',
    category: 'space-exploration',
    related: ['escape-velocity', 'spacecraft'],
  },
  {
    id: 'spacecraft',
    term: 'statek kosmiczny',
    termEn: 'spacecraft',
    definition: 'Pojazd zaprojektowany do podróży lub operacji w przestrzeni kosmicznej. Może być załogowy lub bezzałogowy.',
    category: 'space-exploration',
    related: ['rocket', 'satellite'],
  },
  {
    id: 'satellite',
    term: 'satelita',
    termEn: 'satellite',
    definition: 'Obiekt krążący wokół ciała niebieskiego. Może być naturalny (księżyc) lub sztuczny (wypuszczony przez człowieka).',
    category: 'space-exploration',
    related: ['orbit', 'spacecraft'],
  },
  {
    id: 'rover',
    term: 'łazik',
    termEn: 'rover',
    definition: 'Pojazd kosmiczny zaprojektowany do poruszania się po powierzchni planety lub księżyca. Curiosity i Perseverance badają Marsa.',
    category: 'space-exploration',
    related: ['mars', 'sol'],
  },
  {
    id: 'iss',
    term: 'Międzynarodowa Stacja Kosmiczna',
    termEn: 'International Space Station (ISS)',
    definition: 'Największa struktura zbudowana przez człowieka w kosmosie, orbitująca Ziemię od 1998 roku. Laboratorium na orbicie.',
    category: 'space-exploration',
    related: ['orbit', 'astronaut'],
  },
  {
    id: 'astronaut',
    term: 'astronauta',
    termEn: 'astronaut',
    definition: 'Osoba wyszkolona do podróży i pracy w przestrzeni kosmicznej. W Rosji nazywani kosmonautami, w Chinach taikonautami.',
    category: 'space-exploration',
    related: ['iss', 'spacecraft'],
  },

  // Instrumenty
  {
    id: 'telescope',
    term: 'teleskop',
    termEn: 'telescope',
    definition: 'Instrument optyczny służący do obserwacji odległych obiektów poprzez zbieranie i ogniskowanie promieniowania elektromagnetycznego.',
    category: 'instruments',
    related: ['hubble', 'jwst'],
  },
  {
    id: 'hubble',
    term: 'Teleskop Hubble\'a',
    termEn: 'Hubble Space Telescope',
    definition: 'Teleskop kosmiczny na orbicie Ziemi od 1990 roku. Dostarczył rewolucyjnych obrazów kosmosu w świetle widzialnym i UV.',
    category: 'instruments',
    related: ['telescope', 'jwst'],
  },
  {
    id: 'jwst',
    term: 'Teleskop Jamesa Webba',
    termEn: 'James Webb Space Telescope',
    definition: 'Największy teleskop kosmiczny, wystrzelony w 2021 roku. Obserwuje w podczerwieni, pozwalając widzieć najodleglejsze galaktyki.',
    category: 'instruments',
    related: ['telescope', 'hubble'],
  },
  {
    id: 'spectrometer',
    term: 'spektrometr',
    termEn: 'spectrometer',
    definition: 'Instrument do analizy widma światła. Pozwala określić skład chemiczny, temperaturę i prędkość odległych obiektów.',
    category: 'instruments',
    related: ['redshift', 'telescope'],
  },
];

// Helper functions
export function getTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((term) => term.id === id);
}

export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((term) => term.category === category);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.termEn?.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
  );
}

export const GLOSSARY_CATEGORIES = {
  astronomy: 'Astronomia',
  physics: 'Fizyka',
  'space-exploration': 'Eksploracja kosmosu',
  'celestial-bodies': 'Ciała niebieskie',
  instruments: 'Instrumenty',
} as const;
