/**
 * Adaptive Learning - Misconception Detection
 *
 * System reguł wykrywających typowe błędne przekonania.
 */

import { ADAPTIVE_TAGS, type AdaptiveTag } from './adaptive.tags';
import type { QuestionAttempt, MisconceptionFlag, MisconceptionRule } from './adaptive.types';

// ============================================================================
// MISCONCEPTION RULES
// ============================================================================

/**
 * Definicje reguł misconception
 */
export const MISCONCEPTION_RULES: MisconceptionRule[] = [
  // Reguła 1: Problemy z galaktykami
  {
    id: 'galaxies_confusion',
    title: 'Galaktyki',
    description: 'Trudności z rozumieniem galaktyk i ich typów',
    relatedTags: [ADAPTIVE_TAGS.GALAXIES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'galaktyki-wszechswiata',
    userMessage:
      'Zauważyliśmy trudności z tematem galaktyk. ' +
      'Pamiętaj: Droga Mleczna to galaktyka spiralna z poprzeczką, zawierająca 100-400 miliardów gwiazd!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.GALAXIES)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 2: Mylenie orbit z obrotami (dzień vs rok)
  {
    id: 'orbit_rotation_confusion',
    title: 'Orbity vs obroty',
    description: 'Mylenie okresu orbitalnego (rok) z okresem obrotu (dzień)',
    relatedTags: [ADAPTIVE_TAGS.ORBITS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'grawitacja-i-orbity',
    userMessage:
      'Zauważyliśmy, że możesz mylić okres orbitalny planety (rok) z jej okresem obrotu (dzień). ' +
      'Rok to czas obiegu wokół Słońca, a dzień to czas obrotu wokół własnej osi.',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const orbitErrors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.ORBITS)
      );
      return orbitErrors.length >= 2;
    },
  },

  // Reguła 3: Mylenie skali odległości kosmicznych
  {
    id: 'distance_scale_confusion',
    title: 'Skale odległości',
    description: 'Trudności z rozumieniem różnych jednostek odległości (km, AU, lata świetlne)',
    relatedTags: [ADAPTIVE_TAGS.SCALES_DISTANCES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'uklad-sloneczny-wprowadzenie',
    userMessage:
      'Zauważyliśmy, że możesz mieć trudności ze skalami odległości kosmicznych. ' +
      'Pamiętaj: AU (jednostka astronomiczna) to odległość Ziemia-Słońce (~150 mln km), ' +
      'a rok świetlny to odległość, jaką światło pokonuje w rok (~9,46 biliona km).',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const scaleErrors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.SCALES_DISTANCES)
      );
      return scaleErrors.length >= 2;
    },
  },

  // Reguła 4: Mylenie typów gwiazd z temperaturą (czerwone = gorące?)
  {
    id: 'star_color_temperature',
    title: 'Kolor gwiazd a temperatura',
    description: 'Błędne przekonanie, że czerwone gwiazdy są gorętsze niż niebieskie',
    relatedTags: [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM],
    minTriggerCount: 2,
    recommendedLessonSlug: 'rodzaje-gwiazd',
    userMessage:
      'Zauważyliśmy możliwy błąd w rozumieniu temperatury gwiazd. ' +
      'Wbrew intuicji, niebieskie gwiazdy są NAJGORĘTSZE (>10 000 K), ' +
      'a czerwone są najchłodniejsze (~3000 K)!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const relatedTags: AdaptiveTag[] = [ADAPTIVE_TAGS.STAR_TYPES, ADAPTIVE_TAGS.LIGHT_SPECTRUM];
      const starErrors = attempts.filter(
        (a) =>
          !a.isCorrect &&
          a.tags.some((t) => relatedTags.includes(t))
      );
      return starErrors.length >= 2;
    },
  },

  // Reguła 5: Ewolucja gwiazd - co zostaje po supernowej
  {
    id: 'stellar_remnants_confusion',
    title: 'Pozostałości po gwiazdach',
    description: 'Mylenie produktów końcowych ewolucji gwiazd (biały karzeł vs czarna dziura)',
    relatedTags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.BLACK_HOLES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'smierc-gwiazd',
    userMessage:
      'Zauważyliśmy, że możesz mylić końcowe etapy życia gwiazd. ' +
      'Gwiazdy podobne do Słońca stają się białymi karłami. ' +
      'Tylko bardzo masywne gwiazdy (>25 mas Słońca) tworzą czarne dziury!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const relatedTags: AdaptiveTag[] = [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.BLACK_HOLES];
      const evolutionErrors = attempts.filter(
        (a) =>
          !a.isCorrect &&
          a.tags.some((t) => relatedTags.includes(t))
      );
      return evolutionErrors.length >= 2;
    },
  },

  // Reguła 6: Fizyka rakiet
  {
    id: 'rocket_propulsion_confusion',
    title: 'Napęd rakietowy',
    description: 'Niezrozumienie zasady działania rakiet (III zasada dynamiki)',
    relatedTags: [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON],
    minTriggerCount: 2,
    recommendedLessonSlug: 'jak-dzialaja-rakiety',
    userMessage:
      'Zauważyliśmy, że możesz mieć trudności z zrozumieniem napędu rakietowego. ' +
      'Rakiety działają na zasadzie III zasady dynamiki Newtona: akcja = reakcja. ' +
      'Wyrzucają gazy w jednym kierunku, a same lecą w przeciwnym!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const relatedTags: AdaptiveTag[] = [ADAPTIVE_TAGS.ROCKETS, ADAPTIVE_TAGS.PHYSICS_NEWTON];
      const rocketErrors = attempts.filter(
        (a) =>
          !a.isCorrect &&
          a.tags.some((t) => relatedTags.includes(t))
      );
      return rocketErrors.length >= 2;
    },
  },

  // Reguła 7: Planety - podstawowe fakty
  {
    id: 'planets_basics_confusion',
    title: 'Podstawy planet',
    description: 'Trudności z podstawowymi faktami o planetach',
    relatedTags: [ADAPTIVE_TAGS.PLANETS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'planety-ukladu-slonecznego',
    userMessage:
      'Zauważyliśmy trudności z podstawowymi faktami o planetach. ' +
      'Pamiętaj: 8 planet, od Merkurego do Neptuna. Jowisz jest największy, a Saturn ma najpiękniejsze pierścienie!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.PLANETS)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 8: Podstawy gwiazd
  {
    id: 'stars_basics_confusion',
    title: 'Podstawy gwiazd',
    description: 'Trudności z podstawowymi faktami o gwiazdach',
    relatedTags: [ADAPTIVE_TAGS.STARS_BASICS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'zycie-gwiazd',
    userMessage:
      'Zauważyliśmy trudności z podstawami gwiazd. ' +
      'Gwiazdy to kule gorącego gazu, które świecą dzięki fuzji jądrowej. ' +
      'Słońce to nasza najbliższa gwiazda, a Proxima Centauri to następna!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.STARS_BASICS)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 9: Księżyce
  {
    id: 'moons_confusion',
    title: 'Księżyce',
    description: 'Trudności z wiedzą o księżycach planet',
    relatedTags: [ADAPTIVE_TAGS.MOONS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'ksiezyce-i-male-ciala',
    userMessage:
      'Zauważyliśmy trudności z tematem księżyców. ' +
      'Saturn ma najwięcej księżyców (>140). Nasz Księżyc powstał po kolizji Ziemi z planetą wielkości Marsa!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.MOONS)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 10: Podstawy Układu Słonecznego
  {
    id: 'solar_system_basics_confusion',
    title: 'Układ Słoneczny',
    description: 'Trudności z ogólną wiedzą o Układzie Słonecznym',
    relatedTags: [ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'uklad-sloneczny-wprowadzenie',
    userMessage:
      'Zauważyliśmy trudności z podstawami Układu Słonecznego. ' +
      'Nasz układ ma 8 planet, Słońce w centrum, pas asteroid między Marsem a Jowiszem, i Pas Kuipera za Neptunem!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.SOLAR_SYSTEM_BASICS)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 11: Asteroidy i komety
  {
    id: 'asteroids_comets_confusion',
    title: 'Asteroidy i komety',
    description: 'Trudności z rozróżnieniem asteroid i komet',
    relatedTags: [ADAPTIVE_TAGS.ASTEROIDS_COMETS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'ksiezyce-i-male-ciala',
    userMessage:
      'Zauważyliśmy trudności z asteroidami i kometami. ' +
      'Asteroidy to skaliste obiekty (głównie w Pasie Asteroid). ' +
      'Komety to lodowe ciała z ogonami widocznymi przy zbliżeniu do Słońca!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.ASTEROIDS_COMETS)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 12: Misje kosmiczne
  {
    id: 'space_missions_confusion',
    title: 'Misje kosmiczne',
    description: 'Trudności z wiedzą o misjach kosmicznych',
    relatedTags: [ADAPTIVE_TAGS.SPACE_MISSIONS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'historia-lotow-kosmicznych',
    userMessage:
      'Zauważyliśmy trudności z wiedzą o misjach kosmicznych. ' +
      'Gagarin był pierwszym człowiekiem w kosmosie (1961), Armstrong pierwszym na Księżycu (1969). ' +
      'Voyager 1 to najdalej podróżujący obiekt stworzony przez człowieka!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.SPACE_MISSIONS)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 13: Widmo światła
  {
    id: 'light_spectrum_confusion',
    title: 'Widmo światła',
    description: 'Trudności z rozumieniem spektrum światła i kolorów',
    relatedTags: [ADAPTIVE_TAGS.LIGHT_SPECTRUM],
    minTriggerCount: 2,
    recommendedLessonSlug: 'widmo-elektromagnetyczne',
    userMessage:
      'Zauważyliśmy trudności ze spektrum światła. ' +
      'Kolor obiektu zależy od jego temperatury! Niebieskie = najgorętsze, czerwone = najchłodniejsze. ' +
      'Atmosfera Ziemi zmienia kolory (dlatego Słońce wygląda na żółte).',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.LIGHT_SPECTRUM)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 14: Czarne dziury
  {
    id: 'black_holes_confusion',
    title: 'Czarne dziury',
    description: 'Trudności z rozumieniem czarnych dziur',
    relatedTags: [ADAPTIVE_TAGS.BLACK_HOLES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'smierc-gwiazd',
    userMessage:
      'Zauważyliśmy trudności z czarnymi dziurami. ' +
      'Czarna dziura to obszar, gdzie grawitacja jest tak silna, że nawet światło nie może uciec. ' +
      'Powstają z masywnych gwiazd (>25 mas Słońca) po eksplozji supernowej!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.BLACK_HOLES)
      );
      return errors.length >= 2;
    },
  },

  // Reguła 15: Typy gwiazd
  {
    id: 'star_types_confusion',
    title: 'Typy gwiazd',
    description: 'Trudności z klasyfikacją gwiazd',
    relatedTags: [ADAPTIVE_TAGS.STAR_TYPES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'rodzaje-gwiazd',
    userMessage:
      'Zauważyliśmy trudności z typami gwiazd. ' +
      'Gwiazdy klasyfikujemy wg temperatury (O, B, A, F, G, K, M). ' +
      'Słońce to gwiazda typu G (żółty karzeł). Czerwone karły są najliczniejsze!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const errors = attempts.filter(
        (a) => !a.isCorrect && a.tags.includes(ADAPTIVE_TAGS.STAR_TYPES)
      );
      return errors.length >= 2;
    },
  },
];

// ============================================================================
// MISCONCEPTION DETECTION
// ============================================================================

/**
 * Get a misconception rule by ID
 */
export function getMisconceptionRuleById(ruleId: string): MisconceptionRule | undefined {
  return MISCONCEPTION_RULES.find((r) => r.id === ruleId);
}

/**
 * Evaluate all misconception rules against attempts history
 * Returns newly detected misconceptions
 */
export function evaluateMisconceptionRules(
  attempts: QuestionAttempt[],
  existingMisconceptions: MisconceptionFlag[]
): MisconceptionFlag[] {
  const newMisconceptions: MisconceptionFlag[] = [];
  const now = new Date().toISOString();

  for (const rule of MISCONCEPTION_RULES) {
    // Check if this misconception is already flagged and not resolved
    const existingUnresolved = existingMisconceptions.find(
      (m) => m.ruleId === rule.id && !m.resolved
    );

    if (existingUnresolved) {
      // Already flagged and not resolved, skip
      continue;
    }

    // Check if there was a resolved misconception - only count attempts AFTER resolution
    const lastResolved = existingMisconceptions
      .filter((m) => m.ruleId === rule.id && m.resolved && m.resolvedAt)
      .sort((a, b) => new Date(b.resolvedAt!).getTime() - new Date(a.resolvedAt!).getTime())[0];

    // Filter attempts to only include those after the last resolution
    const relevantAttempts = lastResolved
      ? attempts.filter((a) => new Date(a.attemptedAt) > new Date(lastResolved.resolvedAt!))
      : attempts;

    // Check if rule condition is met with relevant attempts only
    if (rule.checkCondition(relevantAttempts)) {
      newMisconceptions.push({
        ruleId: rule.id,
        detectedAt: now,
        triggerCount: 1,
        resolved: false,
      });
    }
  }

  return newMisconceptions;
}

/**
 * Mark a misconception as resolved
 */
export function resolveMisconception(
  misconceptions: MisconceptionFlag[],
  ruleId: string
): MisconceptionFlag[] {
  return misconceptions.map((m) => {
    if (m.ruleId === ruleId && !m.resolved) {
      return {
        ...m,
        resolved: true,
        resolvedAt: new Date().toISOString(),
      };
    }
    return m;
  });
}

/**
 * Get active (unresolved) misconceptions
 */
export function getActiveMisconceptions(
  misconceptions: MisconceptionFlag[]
): MisconceptionFlag[] {
  return misconceptions.filter((m) => !m.resolved);
}

/**
 * Get misconceptions with their rules (for UI display)
 */
export function getMisconceptionsWithRules(
  misconceptions: MisconceptionFlag[]
): Array<{ flag: MisconceptionFlag; rule: MisconceptionRule }> {
  return misconceptions
    .map((flag) => {
      const rule = getMisconceptionRuleById(flag.ruleId);
      if (!rule) return null;
      return { flag, rule };
    })
    .filter((item): item is { flag: MisconceptionFlag; rule: MisconceptionRule } => item !== null);
}

/**
 * Get tags associated with active misconceptions
 */
export function getMisconceptionTags(
  misconceptions: MisconceptionFlag[]
): AdaptiveTag[] {
  const activeMisconceptions = getActiveMisconceptions(misconceptions);
  const tags = new Set<AdaptiveTag>();

  for (const m of activeMisconceptions) {
    const rule = getMisconceptionRuleById(m.ruleId);
    if (rule) {
      for (const tag of rule.relatedTags) {
        tags.add(tag);
      }
    }
  }

  return Array.from(tags);
}
