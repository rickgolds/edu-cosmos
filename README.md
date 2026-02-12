# CosmosEdu - Kosmiczna Aplikacja Edukacyjna

Interaktywna aplikacja edukacyjna o kosmosie stworzona jako projekt pracy inżynierskiej.

**Autor:** Gracjan Zalewski
**Uczelnia:** Politechnika Koszalińska, Wydział Elektroniki i Informatyki
**Rok:** 2025

## Demo

Aplikacja jest dostępna pod adresem: [edu-cosmos.vercel.app](https://edu-cosmos.vercel.app)

## Funkcjonalności

- **3D Planetarium** - Interaktywny model Układu Słonecznego z możliwością eksploracji planet w 3D
- **Kosmos dziś (APOD)** - Codzienne zdjęcie astronomiczne NASA z opisem i słowniczkiem pojęć
- **Lekcje** - Mikro-moduły edukacyjne (5-7 min) o Układzie Słonecznym, gwiazdach, galaktykach, rakietach i teleskopach
- **Quizy** - Interaktywne testy wiedzy z wyjaśnieniami odpowiedzi i codziennym quizem dnia
- **Biblioteka NASA** - Wyszukiwarka milionów zdjęć i filmów z archiwum NASA
- **Śledzenie postępów** - Panel statystyk, osiągnięć i historii aktywności (localStorage)
- **Adaptacyjna nauka** - Spersonalizowane rekomendacje, mapa umiejętności, system powtórek (spaced repetition) i diagnostyka błędnych przekonań
- **Asteroid Watch** - Śledzenie asteroid zbliżających się do Ziemi
- **Laboratoria** - Interaktywne symulacje grawitacji i czasu podróży w kosmosie
- **Słowniczek pojęć** - 62 pojęcia astronomiczne z kategoriami i powiązaniami

## Stack technologiczny

### Frontend
- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: TailwindCSS
- **Grafika tła**: Canvas API (animowany starfield z migoczącymi gwiazdami i kometami)

### 3D Graphics
- **Three.js** - Silnik grafiki 3D
- **React Three Fiber** - React renderer dla Three.js
- **Drei** - Pomocnicze komponenty R3F

### Inne
- **Walidacja**: Zod
- **Ikony**: Lucide React
- **API**: NASA APOD API, NASA Images API, NASA NeoWs API

## Wymagania

- Node.js 18+
- npm lub yarn
- Git LFS (dla dużych plików tekstur i modeli 3D)

## Instalacja i uruchomienie

```bash
# 1. Klonowanie repozytorium
git clone https://github.com/rickgolds/edu-cosmos.git
cd edu-cosmos

# 2. Pobranie plików LFS (tekstury, modele 3D)
git lfs pull

# 3. Instalacja zależności
npm install

# 4. Konfiguracja zmiennych środowiskowych
cp .env.example .env.local
# Edytuj .env.local i dodaj swój klucz NASA API
# Uzyskaj klucz na https://api.nasa.gov/

# 5. Uruchomienie w trybie deweloperskim
npm run dev

# Aplikacja będzie dostępna na http://localhost:3000
```

## Struktura projektu

```
src/
├── app/                        # Next.js App Router - strony i layouty
│   ├── page.tsx               # Strona główna (dynamiczne sekcje)
│   ├── globals.css            # Style globalne (kosmiczne tło, karuzela, animacje)
│   ├── layout.tsx             # Root layout
│   ├── apod/                  # APOD (Astronomy Picture of the Day)
│   ├── lessons/               # Lekcje
│   ├── quizzes/               # Quizy
│   ├── library/               # Biblioteka NASA
│   ├── progress/              # Dashboard postępu
│   ├── glossary/              # Słowniczek pojęć
│   ├── planetarium/           # 3D Planetarium
│   │   ├── page.tsx          # Główny widok Układu Słonecznego
│   │   ├── [planet]/         # Dynamiczne strony planet
│   │   └── credits/          # Źródła i podziękowania
│   ├── asteroid-watch/        # Śledzenie asteroid
│   ├── labs/                  # Laboratoria (symulacje)
│   ├── learning/              # Adaptacyjna nauka
│   └── about/                 # O aplikacji
├── components/
│   ├── ui/                    # Reusable UI components (design system)
│   │   ├── Button.tsx         # Przyciski (primary, secondary, ghost, danger)
│   │   ├── Card.tsx           # Karty z wariantami i podkomponentami
│   │   ├── Badge.tsx          # Badge'e kolorowe
│   │   ├── Navbar.tsx         # Nawigacja z podświetleniem aktywnej trasy
│   │   ├── Footer.tsx         # Stopka
│   │   ├── LayoutWrapper.tsx  # Wrapper z kosmicznym tłem i layoutem
│   │   ├── Skeleton.tsx       # Loadery (skeleton screens)
│   │   ├── Tabs.tsx           # Zakładki
│   │   ├── Input.tsx          # Pola formularzy
│   │   └── ...                # Spinner, EmptyState, ErrorState
│   └── home/                  # Komponenty strony głównej
│       ├── CosmicBackground.tsx  # Animowane tło (canvas starfield + mgławice + komety)
│       ├── CosmosToday.tsx       # "Co dziś w kosmosie" (APOD + asteroidy + termin)
│       ├── AsteroidTicker.tsx    # Licznik NEO z API NASA
│       ├── TermOfTheDay.tsx      # Losowy termin dnia ze słowniczka
│       ├── StatsCounters.tsx     # Animowane liczniki statystyk
│       ├── PlanetCarousel.tsx    # Karuzela planet z teksturami
│       ├── HomeQuiz.tsx          # Quiz dnia (zmiana co 24h)
│       ├── ProgressWidget.tsx    # Widget postępu / CTA dla nowych
│       ├── ParallaxStars.tsx     # Gwiazdy z parallax (hero section)
│       └── index.ts              # Barrel export
├── features/                   # Feature modules (logika domenowa)
│   ├── adaptive/              # Adaptacyjna nauka (rekomendacje, spaced repetition)
│   ├── apod/                  # APOD feature (typy, serwis, karty)
│   ├── asteroid-watch/        # Asteroid Watch (NeoWs API, karty, edukacja)
│   ├── glossary/              # Słowniczek (62 pojęcia, kategorie, wyszukiwarka)
│   ├── labs/                  # Laboratoria (symulacja grawitacji, czasu podróży)
│   ├── lessons/               # Lekcje (karty, treść)
│   ├── library/               # NASA Library (wyszukiwarka zdjęć/filmów)
│   ├── planetarium/           # 3D Planetarium feature
│   │   ├── components/        # Komponenty 3D (PlanetMesh, HUD, etc.)
│   │   ├── scenes/            # Sceny Three.js
│   │   ├── camera/            # Kontrola kamery
│   │   ├── state/             # Zarządzanie stanem
│   │   ├── ui/                # Komponenty UI planetarium
│   │   └── data/              # Dane orbit i pozycji planet
│   ├── progress/              # Dashboard postępu
│   └── quiz-engine/           # Silnik quizów (typy, useQuiz, QuizView)
├── hooks/                      # Custom React hooks
│   ├── useProgress.ts         # Śledzenie postępów (v4, adaptive learning)
│   └── useLocalStorage.ts     # Persystentny storage
├── lib/                        # Utilities (date-utils, constants, fetcher)
└── data/                       # Statyczne dane
    ├── lessons.ts             # 15 mikro-lekcji
    └── quizzes.ts             # 4 quizy (32 pytania)

public/
└── planetarium/
    ├── textures/              # Tekstury planet (Git LFS)
    └── models/                # Modele 3D GLB (Git LFS)
```

## 3D Planetarium

Planetarium to interaktywny model Układu Słonecznego pozwalający na:

- **Widok orbitalny** - Przegląd wszystkich planet krążących wokół Słońca
- **Eksploracja planet** - Kliknięcie planety uruchamia animację lotu i pokazuje szczegóły
- **HUD w stylu Mission Control** - Wyświetlanie telemetrii (temperatura, grawitacja, księżyce)
- **Responsywność** - Zoptymalizowane dla urządzeń mobilnych (iOS/Android)

### Optymalizacje mobilne

- Wyłączone modele GLB na urządzeniach mobilnych (zapobiega crashom iOS)
- Niższa precyzja shaderów
- Tryb oszczędzania energii GPU
- Uproszczone efekty wizualne

## Strona główna

Strona główna składa się z dynamicznych sekcji (od góry):

1. **Hero** - Nagłówek z CTA
2. **Feature cards** - 6 kart modułów aplikacji
3. **"Co dziś w kosmosie"** - APOD + ticker asteroid + termin dnia (server-side fetch)
4. **Animowane liczniki** - Statystyki aplikacji z animacją przy scrollu
5. **Karuzela planet** - Horizontal scroll z teksturami planet i linkami do Planetarium
6. **Quiz dnia** - Codzienny quiz z podglądem pytania i interaktywną odpowiedzią
7. **Popularne lekcje** - Podgląd 3 pierwszych lekcji
8. **Widget postępów** - Statystyki powracającego użytkownika lub CTA dla nowego

## Kosmiczne tło

Całostronicowe animowane tło (`CosmicBackground`) renderowane na każdej stronie (poza trybem immersyjnym Planetarium):

- **Canvas starfield** - ~400 gwiazd z szybkim migotaniem (75% gwiazd), tintowane cyan/purple
- **Mgławice** - 6 dużych animowanych orbs (gradient blur, drift 30-50s)
- **Komety** - 8 spadających gwiazd z różnymi kątami i cyklami
- **Deep space gradient** - Wielowarstwowy gradient z winietą

## Architektura

Aplikacja oparta jest na **feature-based modularnej architekturze**:

1. **Feature modules** - Każda domena ma własny folder z:
   - `*.types.ts` - Definicje typów
   - `*.service.ts` - Logika dostępu do danych
   - Komponenty React specyficzne dla feature'a

2. **Shared UI** - Reusable components w `components/ui/`

3. **Home components** - Komponenty strony głównej w `components/home/`

4. **Hooks** - Custom hooks dla logiki cross-cutting

5. **State Management** - Custom hooks z useState/useCallback dla stanu planetarium

## Zmienne środowiskowe

```env
# .env.local
NEXT_PUBLIC_NASA_API_KEY=your_api_key_here  # Uzyskaj na https://api.nasa.gov/
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Skrypty

```bash
npm run dev      # Uruchomienie w trybie deweloperskim
npm run build    # Build produkcyjny
npm run start    # Uruchomienie buildu produkcyjnego
npm run lint     # Linting
```

## Deployment

Aplikacja jest zoptymalizowana pod deployment na Vercel:

```bash
# Instalacja Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Pamiętaj o:
- Włączeniu Git LFS w ustawieniach projektu Vercel
- Dodaniu zmiennej środowiskowej `NEXT_PUBLIC_NASA_API_KEY`

## Źródła danych i zasobów

- **NASA APOD API** - Codzienne zdjęcia astronomiczne
- **NASA Images API** - Biblioteka multimediów
- **NASA NeoWs API** - Dane o asteroidach
- **Solar System Scope** - Tekstury planet (CC BY 4.0)
- **NASA Visible Earth** - Tekstury Ziemi (Public Domain)

Pełna lista źródeł dostępna w aplikacji: `/planetarium/credits`

## Licencja

Projekt edukacyjny - praca inżynierska.

Dane kosmiczne pochodzą z oficjalnych API NASA i są udostępniane publicznie.
Tekstury planet wykorzystane zgodnie z licencjami CC BY 4.0 i Public Domain.

---

**CosmosEdu** © 2025 Gracjan Zalewski | Politechnika Koszalińska
