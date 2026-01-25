# Tekstury Planet - Instrukcja

Ten katalog powinien zawierać tekstury planet dla 3D Planetarium.

## Wymagane pliki

Poniższa lista pokazuje oczekiwane nazwy plików:

### Podstawowe tekstury (wymagane)
- `mercury_texture.jpg`
- `venus_texture.jpg`
- `earth_texture.jpg`
- `mars_texture.jpg`
- `jupiter_texture.jpg`
- `saturn_texture.jpg`
- `uranus_texture.jpg`
- `neptune_texture.jpg`

### Dodatkowe (opcjonalne)
- `earth_normal.jpg` - mapa normalna dla Ziemi
- `saturn_rings.png` - tekstura pierścieni Saturna (z kanałem alfa)

## Skąd pobrać tekstury

### Opcja 1: Solar System Scope (ZALECANE)
URL: https://www.solarsystemscope.com/textures/
Licencja: CC BY 4.0 (wymaga attribution)
- Pobierz "2K" lub "4K" tekstury w formacie JPG
- Zmień nazwy plików zgodnie z powyższą konwencją

### Opcja 2: NASA Visible Earth
URL: https://visibleearth.nasa.gov
Licencja: Public Domain
- Najlepsze dla Ziemi (Blue Marble collection)
- Szukaj: "Blue Marble" dla tekstury Ziemi

### Opcja 3: Planet Pixel Emporium
URL: http://planetpixelemporium.com
Licencja: Free for non-commercial use
- Dobre dla projektów edukacyjnych

## Zalecane rozmiary

- **Wysoka jakość**: 4096x2048 px lub 2048x1024 px
- **Standardowa jakość**: 1024x512 px
- **Mobilne urządzenia**: 512x256 px (jeśli wydajność jest priorytetem)

## Format plików

- Tekstury planet: **JPG** (mniejszy rozmiar, brak przezroczystości)
- Pierścienie Saturna: **PNG** (wymagana przezroczystość)

## Fallback

Jeśli tekstury nie są dostępne, planetarium wyświetli planety jako kolorowe sfery
używając kolorów zdefiniowanych w kodzie. Aplikacja będzie działać poprawnie,
ale bez szczegółowych tekstur.

## Attribution

Jeśli używasz tekstur z Solar System Scope, dodaj attribution:
"Planet textures by Solar System Scope (CC BY 4.0)"

Szczegóły attribution znajdują się na stronie /planetarium/credits
