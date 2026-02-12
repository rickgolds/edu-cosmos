import { Metadata } from 'next';
import {
  Rocket,
  BookOpen,
  Brain,
  Search,
  BarChart3,
  Code,
  Database,
  Palette,
  ExternalLink,
  User,
  GraduationCap,
  Target,
  Users,
  Cpu,
  Globe,
  Layers,
  Zap,
  Monitor,
  Smartphone,
  Cloud,
  GitBranch,
  Box,
  FlaskConical,
  Orbit,
  Sparkles,
} from 'lucide-react';
import { Card, CardTitle, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'O projekcie | Praca inżynierska',
  description:
    'CosmosEdu - Internetowa aplikacja edukacyjna o tematyce kosmicznej. Praca inżynierska Gracjana Zalewskiego, Politechnika Koszalińska.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-4xl font-display font-bold mb-4">
          <Rocket className="w-10 h-10 text-accent-cyan" />
          <span className="text-gradient">CosmosEdu</span>
        </div>
        <h1 className="text-2xl text-white mb-2">
          Internetowa aplikacja edukacyjna o tematyce kosmicznej
        </h1>
        <p className="text-gray-400">
          Praca inżynierska | Politechnika Koszalińska | Wydział Elektroniki i Informatyki
        </p>
      </div>

      {/* Author section */}
      <Card padding="lg" className="mb-8 border-accent-cyan/30">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 flex items-center justify-center">
              <User className="w-10 h-10 text-accent-cyan" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-white">Gracjan Zalewski</h3>
              <p className="text-gray-400">Autor pracy inżynierskiej</p>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <GraduationCap className="w-5 h-5 text-accent-purple mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Politechnika Koszalińska</p>
                <p className="text-sm text-gray-400">Wydział Elektroniki i Informatyki</p>
              </div>
            </div>
            <div className="pt-2">
              <Badge variant="cyan" className="mr-2">
                Praca inżynierska
              </Badge>
              <Badge variant="default">2025</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== KONTEKST I TŁO TEORETYCZNE ==================== */}
      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
          <Globe className="w-7 h-7 text-accent-cyan" />
          Kontekst i tło teoretyczne
        </h2>

        {/* Rozwój technologii hardware */}
        <Card padding="lg" className="mb-6">
          <CardTitle as="h3" className="mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent-purple" />
            Rozwój technologii sprzętowych (hardware)
          </CardTitle>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Dynamiczny rozwój technologii sprzętowych w ciągu ostatnich dekad fundamentalnie zmienił
              sposób, w jaki użytkownicy konsumują treści cyfrowe. Współczesne urządzenia – od
              komputerów stacjonarnych, przez laptopy, po smartfony i tablety – oferują wydajność
              obliczeniową, która jeszcze 20 lat temu była dostępna wyłącznie w specjalistycznych
              centrach obliczeniowych.
            </p>
            <p>
              <strong>Procesory graficzne (GPU)</strong> ewoluowały od prostych układów do renderowania
              grafiki 2D do zaawansowanych jednostek obliczeniowych zdolnych do renderowania
              fotorealistycznych scen 3D w czasie rzeczywistym. Technologie takie jak WebGL i WebGPU
              umożliwiają wykorzystanie tej mocy obliczeniowej bezpośrednio w przeglądarce
              internetowej, co otwiera nowe możliwości dla aplikacji edukacyjnych wykorzystujących
              wizualizacje trójwymiarowe.
            </p>
            <p>
              <strong>Urządzenia mobilne</strong> stanowią obecnie dominującą platformę dostępu do
              internetu. Według danych StatCounter, w 2024 roku ponad 59% globalnego ruchu
              internetowego pochodziło z urządzeń mobilnych. Ta zmiana wymusza na twórcach aplikacji
              webowych projektowanie z myślą o responsywności i optymalizacji wydajności na
              urządzeniach o ograniczonych zasobach pamięci i mocy obliczeniowej.
            </p>
            <p>
              Rozwój technologii wyświetlaczy – od ekranów LCD, przez OLED, po Retina i wyświetlacze o
              wysokiej częstotliwości odświeżania (120Hz+) – stawia nowe wymagania przed aplikacjami
              webowymi w zakresie jakości renderowanych treści i płynności animacji.
            </p>
          </div>
        </Card>

        {/* Rozwój technologii software */}
        <Card padding="lg" className="mb-6">
          <CardTitle as="h3" className="mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-accent-cyan" />
            Ewolucja technologii programistycznych (software)
          </CardTitle>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Historia rozwoju aplikacji internetowych to droga od statycznych stron HTML, przez
              dynamiczne aplikacje PHP, aż po współczesne Single Page Applications (SPA) i aplikacje
              renderowane po stronie serwera (SSR). Każdy etap tej ewolucji przynosił nowe możliwości,
              ale również nowe wyzwania.
            </p>
            <p>
              <strong>JavaScript</strong>, początkowo prosty język skryptowy do walidacji formularzy,
              przekształcił się w uniwersalne narzędzie programistyczne. Wprowadzenie standardu
              ECMAScript 6 (2015) oraz kolejnych wersji przyniosło nowoczesne konstrukcje językowe:
              klasy, moduły, async/await, destructuring. Te zmiany umożliwiły tworzenie bardziej
              złożonych i łatwiejszych w utrzymaniu aplikacji.
            </p>
            <p>
              <strong>TypeScript</strong>, stworzony przez Microsoft w 2012 roku, rozwiązał jeden z
              głównych problemów JavaScriptu – brak statycznego typowania. Dzięki systemowi typów,
              TypeScript pozwala na wykrywanie błędów na etapie kompilacji, co znacząco redukuje liczbę
              błędów runtime i ułatwia refaktoryzację kodu w dużych projektach.
            </p>
            <p>
              Pojawienie się <strong>bibliotek i frameworków</strong> takich jak React (2013), Vue.js
              (2014) czy Angular (2016) zrewolucjonizowało sposób budowania interfejsów użytkownika.
              Koncepcja komponentów wielokrotnego użytku, wirtualny DOM i reaktywne zarządzanie stanem
              stały się standardem w branży.
            </p>
            <p>
              <strong>Next.js</strong>, framework oparty na React, wprowadził hybrydowe podejście
              łączące renderowanie po stronie serwera (SSR), generowanie statyczne (SSG) i renderowanie
              po stronie klienta (CSR). App Router wprowadzony w wersji 13 (2022) przyniósł React
              Server Components, co fundamentalnie zmieniło architekturę aplikacji React.
            </p>
          </div>
        </Card>

        {/* Grafika 3D w przeglądarce */}
        <Card padding="lg" className="mb-6">
          <CardTitle as="h3" className="mb-4 flex items-center gap-2">
            <Box className="w-5 h-5 text-accent-purple" />
            Grafika 3D w aplikacjach webowych
          </CardTitle>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Renderowanie grafiki trójwymiarowej w przeglądarce internetowej stało się możliwe dzięki
              technologii <strong>WebGL</strong> (Web Graphics Library), która zapewnia niskopoziomowy
              dostęp do GPU bez konieczności instalowania dodatkowych wtyczek. WebGL, oparty na
              standardzie OpenGL ES, jest wspierany przez wszystkie nowoczesne przeglądarki.
            </p>
            <p>
              <strong>Three.js</strong>, biblioteka JavaScript stworzona przez Ricardo Cabell (Mr.doob)
              w 2010 roku, znacząco uprościła pracę z WebGL, dostarczając wysokopoziomowe API do
              tworzenia scen 3D, obsługi kamer, oświetlenia, materiałów i animacji. Three.js stał się
              de facto standardem dla grafiki 3D w przeglądarce.
            </p>
            <p>
              <strong>React Three Fiber</strong> (R3F) to renderer React dla Three.js, który pozwala
              na deklaratywne tworzenie scen 3D z wykorzystaniem składni JSX. R3F integruje świat 3D z
              ekosystemem React, umożliwiając wykorzystanie hooków, kontekstu i innych wzorców
              reaktywnego programowania w aplikacjach 3D.
            </p>
            <p>
              Wyzwania związane z grafiką 3D w przeglądarce obejmują optymalizację wydajności na
              urządzeniach mobilnych, zarządzanie pamięcią GPU, oraz zapewnienie płynności animacji
              przy zachowaniu niskiego zużycia baterii. Techniki takie jak Level of Detail (LOD), lazy
              loading zasobów i adaptacyjna jakość renderowania są kluczowe dla tworzenia
              responsywnych aplikacji 3D.
            </p>
          </div>
        </Card>

        {/* Edukacja astronomiczna */}
        <Card padding="lg" className="mb-6">
          <CardTitle as="h3" className="mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-accent-cyan" />
            Edukacja astronomiczna w erze cyfrowej
          </CardTitle>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Astronomia, jedna z najstarszych nauk, przeżywa renesans zainteresowania dzięki
              spektakularnym odkryciom ostatnich lat: pierwszemu zdjęciu czarnej dziury (2019),
              wystrzeleniu teleskopu Jamesa Webba (2021), oraz misjom na Marsa prowadzonym przez NASA,
              SpaceX i inne agencje kosmiczne.
            </p>
            <p>
              <strong>NASA</strong> (National Aeronautics and Space Administration) odgrywa kluczową
              rolę w popularyzacji wiedzy astronomicznej, udostępniając publicznie ogromne ilości
              danych, zdjęć i filmów poprzez otwarte API. Program APOD (Astronomy Picture of the Day),
              działający od 1995 roku, codziennie prezentuje nowe zdjęcie astronomiczne z opisem
              przygotowanym przez profesjonalnych astronomów.
            </p>
            <p>
              Interaktywne aplikacje edukacyjne stanowią nowoczesne narzędzie w nauczaniu astronomii.
              Badania pedagogiczne wskazują, że <strong>wizualizacje 3D</strong> znacząco poprawiają
              zrozumienie koncepcji przestrzennych, takich jak rozmiary i odległości w Układzie
              Słonecznym, orbity planet czy fazy Księżyca.
            </p>
            <p>
              <strong>Gamifikacja</strong> – wprowadzanie elementów gier do procesu edukacyjnego –
              zwiększa zaangażowanie uczniów i motywację do nauki. Quizy, systemy punktów, osiągnięcia
              i śledzenie postępów to techniki skutecznie wykorzystywane w nowoczesnych platformach
              e-learningowych.
            </p>
          </div>
        </Card>

        {/* API i integracja danych */}
        <Card padding="lg" className="mb-6">
          <CardTitle as="h3" className="mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-accent-purple" />
            Integracja z zewnętrznymi źródłami danych (API)
          </CardTitle>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Współczesne aplikacje webowe rzadko działają w izolacji – integracja z zewnętrznymi
              usługami poprzez <strong>API</strong> (Application Programming Interface) stała się
              standardem. REST API, oparte na protokole HTTP i formacie JSON, dominuje w komunikacji
              między systemami.
            </p>
            <p>
              NASA udostępnia szereg publicznych API, w tym:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>
                <strong>APOD API</strong> – Astronomy Picture of the Day, codzienne zdjęcia z opisami
              </li>
              <li>
                <strong>NASA Images API</strong> – miliony zdjęć i filmów z archiwum NASA
              </li>
              <li>
                <strong>NeoWs API</strong> – Near Earth Object Web Service, dane o asteroidach
              </li>
              <li>
                <strong>Mars Rover Photos API</strong> – zdjęcia z łazików marsjańskich
              </li>
            </ul>
            <p>
              Wyzwania związane z integracją API obejmują obsługę błędów sieciowych, zarządzanie
              limitami zapytań (rate limiting), cachowanie odpowiedzi dla poprawy wydajności oraz
              walidację otrzymywanych danych. W aplikacjach TypeScript biblioteki takie jak Zod
              umożliwiają runtime validation schematów danych, zapewniając type safety nawet dla
              danych z zewnętrznych źródeł.
            </p>
          </div>
        </Card>
      </div>

      {/* ==================== CEL PRACY ==================== */}
      <Card padding="lg" className="mb-8 border-accent-purple/30">
        <CardTitle as="h2" className="mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-accent-purple" />
          Cel pracy
        </CardTitle>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
          <p>
            Celem pracy jest zaprojektowanie oraz implementacja internetowej aplikacji o charakterze
            informacyjno-interaktywnym, która będzie pobierała, przetwarzała oraz prezentowała
            użytkownikom aktualne dane astronomiczne pochodzące z API udostępnianych przez NASA.
          </p>
          <p>
            Od strony technicznej zadaniem jest stworzenie kompletnej i modularnej struktury aplikacji
            opartej o komponenty, implementacja mechanizmów integracji ze źródłami danych (API NASA),
            zastosowanie rozwiązań poprawiających wydajność oraz opracowanie intuicyjnego,
            estetycznego interfejsu użytkownika umożliwiającego interakcję z treściami m.in. poprzez
            quizy, testy wiedzy oraz wizualizacje danych.
          </p>
        </div>
      </Card>

      {/* ==================== RODZAJ APLIKACJI ==================== */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-accent-cyan" />
          Rodzaj aplikacji
        </CardTitle>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
          <p>
            Aplikacja ma charakter <strong>informacyjno-interaktywny</strong>. Oznacza to, że
            użytkownik może nie tylko przeglądać informacje, ale również aktywnie z nimi współpracować,
            np. poprzez odpowiadanie na pytania w quizach, rozwiązywanie testów wiedzy czy przeglądanie
            interaktywnych wizualizacji planet.
          </p>
          <p>
            <strong>Grupa docelowa:</strong> użytkownicy zainteresowani tematyką astronomiczną,
            pasjonaci nauki i technologii oraz osoby poszukujące ciekawych i atrakcyjnych informacji o
            kosmosie.
          </p>
        </div>
      </Card>

      {/* ==================== ZADANIA TECHNICZNE ==================== */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-accent-purple" />
          Zrealizowane zadania techniczne
        </CardTitle>
        <div className="space-y-3">
          <TaskItem
            title="Architektura aplikacji frontendowej"
            description="Zaprojektowanie i implementacja modularnej struktury opartej na komponentach React z wykorzystaniem Next.js App Router"
            completed
          />
          <TaskItem
            title="Integracja z API NASA"
            description="Dynamiczne pobieranie danych z APOD API, NASA Images API i NeoWs API z obsługą cachowania i walidacji"
            completed
          />
          <TaskItem
            title="Zarządzanie stanem aplikacji"
            description="Implementacja custom hooks z useState/useCallback oraz localStorage dla persystencji danych użytkownika"
            completed
          />
          <TaskItem
            title="Moduły interaktywne"
            description="Silnik quizów z wieloma typami pytań, system lekcji z mikro-modułami, śledzenie postępów i osiągnięć"
            completed
          />
          <TaskItem
            title="Wizualizacje 3D"
            description="Interaktywne 3D Planetarium z wykorzystaniem Three.js i React Three Fiber – model Układu Słonecznego z eksploracją planet"
            completed
          />
          <TaskItem
            title="Adaptacyjna nauka"
            description="System spersonalizowanych rekomendacji, mapa umiejętności, spaced repetition i diagnostyka błędnych przekonań"
            completed
          />
          <TaskItem
            title="Laboratoria i symulacje"
            description="Interaktywne symulacje grawitacji i czasu podróży kosmicznej z konfigurowalnymi parametrami"
            completed
          />
          <TaskItem
            title="Animowane tło i strona główna"
            description="Canvas starfield z migoczącymi gwiazdami i kometami, dynamiczna strona główna z sekcjami: APOD, asteroidy, quiz dnia, karuzela planet, liczniki"
            completed
          />
          <TaskItem
            title="Optymalizacja wydajności"
            description="Lazy loading komponentów, optymalizacja dla urządzeń mobilnych, adaptacyjna jakość renderowania 3D"
            completed
          />
          <TaskItem
            title="Responsywny interfejs"
            description="Design system z komponentami UI, pełna responsywność na urządzenia mobilne i desktopowe"
            completed
          />
        </div>
      </Card>

      {/* ==================== FUNKCJONALNOŚCI ==================== */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent-cyan" />
          Funkcjonalności aplikacji
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureItem
            icon={<Box className="w-5 h-5" />}
            title="3D Planetarium"
            description="Interaktywny model Układu Słonecznego z możliwością eksploracji planet w 3D, HUD w stylu Mission Control"
          />
          <FeatureItem
            icon={<Rocket className="w-5 h-5" />}
            title="Kosmos dziś (APOD)"
            description="Codzienne zdjęcie astronomiczne NASA z opisem i słowniczkiem pojęć"
          />
          <FeatureItem
            icon={<BookOpen className="w-5 h-5" />}
            title="Lekcje"
            description="15 mikro-modułów edukacyjnych (5-7 min) z ilustracjami i quizem na końcu"
          />
          <FeatureItem
            icon={<Brain className="w-5 h-5" />}
            title="Quizy i Quiz dnia"
            description="4 quizy tematyczne (32 pytania), codzienny quiz dnia z interaktywnym podglądem"
          />
          <FeatureItem
            icon={<Search className="w-5 h-5" />}
            title="Biblioteka NASA"
            description="Wyszukiwarka milionów zdjęć i filmów z archiwum NASA"
          />
          <FeatureItem
            icon={<BarChart3 className="w-5 h-5" />}
            title="Śledzenie postępów"
            description="Panel statystyk, osiągnięć, serii dni i historii aktywności użytkownika"
          />
          <FeatureItem
            icon={<Orbit className="w-5 h-5" />}
            title="Asteroid Watch"
            description="Śledzenie asteroid zbliżających się do Ziemi w czasie rzeczywistym (NeoWs API)"
          />
          <FeatureItem
            icon={<FlaskConical className="w-5 h-5" />}
            title="Laboratoria"
            description="Interaktywne symulacje grawitacji i czasu podróży kosmicznej"
          />
          <FeatureItem
            icon={<BookOpen className="w-5 h-5" />}
            title="Słowniczek pojęć"
            description="62 pojęcia astronomiczne z kategoriami, powiązaniami i terminem dnia"
          />
          <FeatureItem
            icon={<Sparkles className="w-5 h-5" />}
            title="Adaptacyjna nauka"
            description="Spersonalizowane rekomendacje, mapa umiejętności i system powtórek"
          />
          <FeatureItem
            icon={<Globe className="w-5 h-5" />}
            title="Dynamiczna strona główna"
            description="Sekcje: APOD + asteroidy, karuzela planet, quiz dnia, animowane liczniki, widget postępów"
          />
          <FeatureItem
            icon={<Smartphone className="w-5 h-5" />}
            title="Responsywność"
            description="Pełna optymalizacja dla urządzeń mobilnych iOS i Android"
          />
        </div>
      </Card>

      {/* ==================== STACK TECHNOLOGICZNY ==================== */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-accent-purple" />
          Stack technologiczny
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TechItem
            icon={<Monitor className="w-5 h-5" />}
            title="Frontend"
            items={['Next.js 14 (App Router)', 'React 18', 'TypeScript', 'TailwindCSS']}
          />
          <TechItem
            icon={<Box className="w-5 h-5" />}
            title="Grafika 3D"
            items={['Three.js', 'React Three Fiber', 'Drei', 'GLSL Shaders']}
          />
          <TechItem
            icon={<Database className="w-5 h-5" />}
            title="Dane i API"
            items={['NASA APOD API', 'NASA Images API', 'NASA NeoWs API', 'Zod (walidacja)']}
          />
          <TechItem
            icon={<Palette className="w-5 h-5" />}
            title="UI/UX"
            items={['Custom Design System', 'Canvas API (starfield)', 'Lucide Icons', 'Responsive Design']}
          />
          <TechItem
            icon={<GitBranch className="w-5 h-5" />}
            title="DevOps"
            items={['Git + Git LFS', 'Vercel (hosting)', 'ESLint', 'GitHub Actions']}
          />
          <TechItem
            icon={<Zap className="w-5 h-5" />}
            title="Optymalizacja"
            items={['Lazy Loading', 'Image Optimization', 'Mobile-first', 'Caching']}
          />
        </div>
      </Card>

      {/* ==================== ARCHITEKTURA ==================== */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-accent-cyan" />
          Architektura aplikacji
        </CardTitle>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
          <p>
            Aplikacja oparta jest na architekturze <strong>feature-based modularnej</strong>, gdzie
            każda domena funkcjonalna (APOD, lekcje, quizy, biblioteka, planetarium, asteroidy,
            laboratoria, słowniczek, adaptacyjna nauka, postęp) ma własny folder z typami, serwisami
            i komponentami. Komponenty strony głównej wydzielone są do <code>components/home/</code>,
            a współdzielony design system do <code>components/ui/</code>.
          </p>
          <div className="bg-cosmos-darker rounded-lg p-4 font-mono text-sm">
            <pre className="text-gray-400 overflow-x-auto">
{`src/
├── app/                    # Next.js App Router
│   ├── planetarium/        # 3D Planetarium
│   ├── apod/              # APOD module
│   ├── lessons/           # Lekcje
│   ├── quizzes/           # Quizy
│   ├── glossary/          # Słowniczek pojęć
│   ├── asteroid-watch/    # Asteroid Watch
│   ├── labs/              # Laboratoria
│   ├── library/           # Biblioteka NASA
│   ├── progress/          # Dashboard postępu
│   ├── learning/          # Adaptacyjna nauka
│   └── about/             # O projekcie
├── components/
│   ├── ui/                # Design System (Button, Card, Badge, Navbar...)
│   └── home/              # Strona główna (CosmicBackground, Quiz dnia, Karuzela...)
├── features/               # Feature modules
│   ├── planetarium/       # 3D scenes, camera, state, data
│   ├── apod/              # APOD service, types, components
│   ├── asteroid-watch/    # NeoWs API, components
│   ├── glossary/          # 62 pojęcia, wyszukiwarka
│   ├── labs/              # Symulacje grawitacji i podróży
│   ├── adaptive/          # Rekomendacje, spaced repetition
│   ├── quiz-engine/       # Silnik quizów (reusable)
│   ├── lessons/           # Karty lekcji
│   ├── library/           # NASA Images search
│   └── progress/          # Dashboard, statystyki
├── hooks/                  # Custom hooks (useProgress, useLocalStorage)
├── lib/                    # Utilities (date-utils, constants, fetcher)
└── data/                   # 15 lekcji, 4 quizy (32 pytania)`}
            </pre>
          </div>
        </div>
      </Card>

      {/* ==================== ŹRÓDŁA DANYCH ==================== */}
      <Card padding="lg" className="mb-8">
        <CardTitle as="h2" className="mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-accent-purple" />
          Źródła danych
        </CardTitle>
        <div className="space-y-3">
          <DataSource
            name="NASA APOD API"
            description="Astronomy Picture of the Day – codzienne zdjęcia astronomiczne z opisami"
            url="https://api.nasa.gov/"
          />
          <DataSource
            name="NASA Images API"
            description="Ogromna biblioteka zdjęć i filmów z misji NASA"
            url="https://images.nasa.gov/"
          />
          <DataSource
            name="NASA NeoWs API"
            description="Near Earth Object Web Service – dane o asteroidach zbliżających się do Ziemi"
            url="https://api.nasa.gov/"
          />
          <DataSource
            name="Solar System Scope"
            description="Tekstury planet i ciał niebieskich (licencja CC BY 4.0)"
            url="https://www.solarsystemscope.com/textures/"
          />
        </div>
      </Card>

      {/* ==================== PODSUMOWANIE ==================== */}
      <Card padding="lg" className="mb-8 bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 border-accent-cyan/20">
        <CardTitle as="h2" className="mb-4">
          Podsumowanie
        </CardTitle>
        <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
          <p>
            Aplikacja CosmosEdu w pełni realizuje założenia pracy inżynierskiej, dostarczając
            kompletne rozwiązanie łączące nowoczesne technologie webowe z edukacją astronomiczną.
            Projekt demonstruje praktyczne zastosowanie:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>Frameworka Next.js 14 z App Router i React Server Components</li>
            <li>TypeScript dla zapewnienia type safety i jakości kodu</li>
            <li>Three.js i React Three Fiber dla interaktywnych wizualizacji 3D</li>
            <li>Canvas API dla animowanego kosmicznego tła z gwiazdami i kometami</li>
            <li>Integracji z zewnętrznymi API NASA (APOD, NeoWs, Images)</li>
            <li>Adaptacyjnej nauki z systemem rekomendacji i spaced repetition</li>
            <li>Interaktywnych laboratoriów z symulacjami fizycznymi</li>
            <li>Technik optymalizacji wydajności dla urządzeń mobilnych</li>
            <li>Architektury modularnej (12 feature modules) ułatwiającej rozwój i utrzymanie</li>
          </ul>
          <p>
            Aplikacja jest dostępna publicznie pod adresem{' '}
            <a
              href="https://edu-cosmos.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline"
            >
              edu-cosmos.vercel.app
            </a>
            , co pozwala na weryfikację zrealizowanych funkcjonalności.
          </p>
        </div>
      </Card>

      {/* Footer note */}
      <div className="text-center text-gray-500 text-sm border-t border-cosmos-border pt-8">
        <p className="text-base text-gray-400 mb-2">
          CosmosEdu &copy; {new Date().getFullYear()} Gracjan Zalewski
        </p>
        <p>
          Praca inżynierska &bull; Politechnika Koszalińska &bull; Wydział Elektroniki i Informatyki
        </p>
        <p className="mt-2 text-gray-500">
          Dane kosmiczne pochodzą z oficjalnych API NASA i są udostępniane publicznie.
        </p>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border">
      <div className="p-2 rounded-lg bg-accent-cyan/20 text-accent-cyan h-fit">{icon}</div>
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function TechItem({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="p-4 rounded-lg bg-cosmos-dark/50 border border-cosmos-border">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-accent-purple/20 text-accent-purple">{icon}</div>
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-400">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TaskItem({
  title,
  description,
  completed,
}: {
  title: string;
  description: string;
  completed?: boolean;
}) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
        }`}
      >
        {completed ? '✓' : '○'}
      </div>
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function DataSource({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg bg-cosmos-dark/50 border border-cosmos-border hover:border-accent-cyan/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-white">{name}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500" />
      </div>
    </a>
  );
}
