export interface CelestialBody {
  id: string;
  name: string;
  gravity: number; // m/s²
  emoji: string;
}

export interface TravelPreset {
  id: string;
  name: string;
  speedKmS: number;
  description: string;
}

export interface LabResult {
  labId: string;
  completedAt: string;
  score?: number;
}

export const CELESTIAL_BODIES: CelestialBody[] = [
  { id: 'earth', name: 'Ziemia', gravity: 9.81, emoji: '🌍' },
  { id: 'moon', name: 'Księżyc', gravity: 1.62, emoji: '🌙' },
  { id: 'mars', name: 'Mars', gravity: 3.71, emoji: '🔴' },
  { id: 'jupiter', name: 'Jowisz', gravity: 24.79, emoji: '🟠' },
  { id: 'venus', name: 'Wenus', gravity: 8.87, emoji: '🟡' },
  { id: 'mercury', name: 'Merkury', gravity: 3.7, emoji: '⚫' },
  { id: 'saturn', name: 'Saturn', gravity: 10.44, emoji: '🪐' },
  { id: 'sun', name: 'Słońce', gravity: 274, emoji: '☀️' },
];

export const TRAVEL_PRESETS: TravelPreset[] = [
  { id: 'walk', name: 'Pieszo', speedKmS: 0.0014, description: '5 km/h' },
  { id: 'car', name: 'Samochód', speedKmS: 0.033, description: '120 km/h' },
  { id: 'plane', name: 'Samolot', speedKmS: 0.25, description: '900 km/h' },
  { id: 'rocket', name: 'Rakieta (Apollo)', speedKmS: 11, description: '~40 000 km/h' },
  { id: 'voyager', name: 'Sonda Voyager', speedKmS: 17, description: '~61 000 km/h' },
  { id: 'light', name: 'Światło', speedKmS: 299792.458, description: 'c' },
];

export const TRAVEL_DESTINATIONS: { id: string; name: string; distanceKm: number }[] = [
  { id: 'moon', name: 'Księżyc', distanceKm: 384400 },
  { id: 'mars_min', name: 'Mars (minimum)', distanceKm: 54600000 },
  { id: 'mars_avg', name: 'Mars (średnio)', distanceKm: 225000000 },
  { id: 'au', name: '1 AU (do Słońca)', distanceKm: 149597870.7 },
  { id: 'jupiter', name: 'Jowisz', distanceKm: 628730000 },
];
