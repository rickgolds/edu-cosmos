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
- **Quizy** - Interaktywne testy wiedzy z wyjaśnieniami odpowiedzi
- **Biblioteka NASA** - Wyszukiwarka milionów zdjęć i filmów z archiwum NASA
- **Śledzenie postępów** - Panel statystyk, osiągnięć i historii aktywności (localStorage)
- **Adaptacyjna nauka** - Spersonalizowane rekomendacje, mapa umiejętności, system powtórek (spaced repetition) i diagnostyka błędnych przekonań
- **Asteroid Watch** - Śledzenie asteroid zbliżających się do Ziemi

## Stack technologiczny

### Frontend
- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: TailwindCSS
- **Animacje**: Framer Motion

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
│   ├── page.tsx               # Landing page
│   ├── apod/                  # APOD (Astronomy Picture of the Day)
│   ├── lessons/               # Lekcje
│   ├── quizzes/               # Quizy
│   ├── library/               # Biblioteka NASA
│   ├── progress/              # Dashboard postępu
│   ├── planetarium/           # 3D Planetarium
│   │   ├── page.tsx          # Główny widok Układu Słonecznego
│   │   ├── [planet]/         # Dynamiczne strony planet
│   │   └── credits/          # Źródła i podziękowania
│   ├── asteroid-watch/        # Śledzenie asteroid
│   ├── learning/              # Adaptacyjna nauka
│   └── about/                 # O aplikacji
├── components/ui/              # Reusable UI components (design system)
├── features/                   # Feature modules (logika domenowa)
│   ├── apod/                  # APOD feature
│   ├── lessons/               # Lekcje feature
│   ├── quiz-engine/           # Silnik quizów
│   ├── library/               # NASA Library feature
│   ├── progress/              # Progress tracking
│   ├── adaptive/              # Adaptacyjna nauka (rekomendacje, spaced repetition, diagnostyka)
│   └── planetarium/           # 3D Planetarium feature
│       ├── components/        # Komponenty 3D (PlanetMesh, HUD, etc.)
│       ├── scenes/            # Sceny Three.js
│       ├── camera/            # Kontrola kamery
│       ├── state/             # Zarządzanie stanem
│       ├── ui/                # Komponenty UI planetarium
│       └── data/              # Dane orbit i pozycji planet
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities
└── data/                       # Statyczne dane (lekcje, quizy)

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

## Architektura

Aplikacja oparta jest na **feature-based modularnej architekturze**:

1. **Feature modules** - Każda domena ma własny folder z:
   - `*.types.ts` - Definicje typów
   - `*.service.ts` - Logika dostępu do danych
   - Komponenty React specyficzne dla feature'a

2. **Shared UI** - Reusable components w `components/ui/`

3. **Hooks** - Custom hooks dla logiki cross-cutting

4. **State Management** - Custom hooks z useState/useCallback dla stanu planetarium

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
