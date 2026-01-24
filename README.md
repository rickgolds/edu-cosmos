# CosmosEdu - Kosmiczna Aplikacja Edukacyjna

Interaktywna aplikacja edukacyjna o kosmosie stworzona jako projekt pracy inżynierskiej.

## Funkcjonalności

- **Kosmos dziś (APOD)** - Codzienne zdjęcie astronomiczne NASA z opisem i słowniczkiem pojęć
- **Lekcje** - Mikro-moduły edukacyjne (5-7 min) o Układzie Słonecznym, gwiazdach, galaktykach, rakietach i teleskopach
- **Quizy** - Interaktywne testy wiedzy z wyjaśnieniami odpowiedzi
- **Biblioteka NASA** - Wyszukiwarka milionów zdjęć i filmów z archiwum NASA
- **Śledzenie postępów** - Panel statystyk, osiągnięć i historii aktywności (localStorage)

## Stack technologiczny

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: TailwindCSS
- **Walidacja**: Zod
- **Ikony**: Lucide React
- **API**: NASA APOD API, NASA Images API

## Wymagania

- Node.js 18+
- npm lub yarn

## Instalacja i uruchomienie

```bash
# 1. Klonowanie repozytorium (lub rozpakowanie archiwum)
cd cosmos-edu

# 2. Instalacja zależności
npm install

# 3. Konfiguracja zmiennych środowiskowych
# Skopiuj .env.example do .env.local (już jest utworzony z DEMO_KEY)
# Dla produkcji uzyskaj własny klucz na https://api.nasa.gov/

# 4. Uruchomienie w trybie deweloperskim
npm run dev

# Aplikacja będzie dostępna na http://localhost:3000
```

## Struktura projektu

```
src/
├── app/                    # Next.js App Router - strony i layouty
│   ├── page.tsx           # Landing page
│   ├── apod/              # APOD (Astronomy Picture of the Day)
│   ├── lessons/           # Lekcje
│   ├── quizzes/           # Quizy
│   ├── library/           # Biblioteka NASA
│   ├── progress/          # Dashboard postępu
│   └── about/             # O aplikacji
├── components/ui/          # Reusable UI components (design system)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Navbar.tsx
│   └── ...
├── features/               # Feature modules (logika domenowa)
│   ├── apod/              # APOD feature (service, types, components)
│   ├── lessons/           # Lekcje feature
│   ├── quiz-engine/       # Reusable quiz engine
│   ├── library/           # NASA Library feature
│   └── progress/          # Progress tracking feature
├── hooks/                  # Custom React hooks
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── useProgress.ts
├── lib/                    # Utilities
│   ├── constants.ts
│   ├── fetcher.ts
│   └── date-utils.ts
└── data/                   # Statyczne dane
    ├── lessons.ts         # Definicje lekcji
    └── quizzes.ts         # Definicje quizów
```

## Architektura

Aplikacja oparta jest na **feature-based modularnej architekturze**:

1. **Feature modules** - Każda domena ma własny folder z:
   - `*.types.ts` - Definicje typów
   - `*.service.ts` - Logika dostępu do danych
   - Komponenty React specyficzne dla feature'a

2. **Shared UI** - Reusable components w `components/ui/`

3. **Hooks** - Custom hooks dla logiki cross-cutting (localStorage, debounce, progress)

4. **Quiz Engine** - Współdzielony silnik quizów używany zarówno w lekcjach jak i quizach

## Zmienne środowiskowe

```env
# .env.local
NASA_API_KEY=your_api_key_here  # Uzyskaj na https://api.nasa.gov/
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Skrypty

```bash
npm run dev      # Uruchomienie w trybie deweloperskim
npm run build    # Build produkcyjny
npm run start    # Uruchomienie buildu produkcyjnego
npm run lint     # Linting
```

## Licencja

Projekt edukacyjny - praca inżynierska.

Dane kosmiczne pochodzą z oficjalnych API NASA i są udostępniane publicznie.
