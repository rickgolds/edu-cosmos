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
  // Reguła 1: Mylenie orbit z obrotami (dzień vs rok)
  {
    id: 'orbit_rotation_confusion',
    title: 'Orbity vs obroty',
    description: 'Mylenie okresu orbitalnego (rok) z okresem obrotu (dzień)',
    relatedTags: [ADAPTIVE_TAGS.ORBITS, ADAPTIVE_TAGS.PLANETS],
    minTriggerCount: 2,
    recommendedLessonSlug: 'uklad-sloneczny-wprowadzenie',
    userMessage:
      'Zauważyliśmy, że możesz mylić okres orbitalny planety (rok) z jej okresem obrotu (dzień). ' +
      'Rok to czas obiegu wokół Słońca, a dzień to czas obrotu wokół własnej osi.',
    checkCondition: (attempts: QuestionAttempt[]) => {
      // Sprawdź błędy w pytaniach o orbity
      const relatedTags: AdaptiveTag[] = [ADAPTIVE_TAGS.ORBITS, ADAPTIVE_TAGS.PLANETS];
      const orbitErrors = attempts.filter(
        (a) =>
          !a.isCorrect &&
          a.tags.some((t) => relatedTags.includes(t))
      );
      return orbitErrors.length >= 2;
    },
  },

  // Reguła 2: Mylenie skali odległości kosmicznych
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

  // Reguła 3: Mylenie typów gwiazd z temperaturą (czerwone = gorące?)
  {
    id: 'star_color_temperature',
    title: 'Kolor gwiazd a temperatura',
    description: 'Błędne przekonanie, że czerwone gwiazdy są gorętsze niż niebieskie',
    relatedTags: [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.STAR_TYPES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'zycie-gwiazd',
    userMessage:
      'Zauważyliśmy możliwy błąd w rozumieniu temperatury gwiazd. ' +
      'Wbrew intuicji, niebieskie gwiazdy są NAJGORĘTSZE (>10 000 K), ' +
      'a czerwone są najchłodniejsze (~3000 K)!',
    checkCondition: (attempts: QuestionAttempt[]) => {
      const relatedTags: AdaptiveTag[] = [ADAPTIVE_TAGS.STARS_BASICS, ADAPTIVE_TAGS.STAR_TYPES];
      const starErrors = attempts.filter(
        (a) =>
          !a.isCorrect &&
          a.tags.some((t) => relatedTags.includes(t))
      );
      return starErrors.length >= 2;
    },
  },

  // Reguła 4: Ewolucja gwiazd - co zostaje po supernowej
  {
    id: 'stellar_remnants_confusion',
    title: 'Pozostałości po gwiazdach',
    description: 'Mylenie produktów końcowych ewolucji gwiazd (biały karzeł vs czarna dziura)',
    relatedTags: [ADAPTIVE_TAGS.STELLAR_EVOLUTION, ADAPTIVE_TAGS.BLACK_HOLES],
    minTriggerCount: 2,
    recommendedLessonSlug: 'zycie-gwiazd',
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

  // Reguła 5: Fizyka rakiet
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
    const existing = existingMisconceptions.find(
      (m) => m.ruleId === rule.id && !m.resolved
    );

    if (existing) {
      // Already flagged, skip
      continue;
    }

    // Check if rule condition is met
    if (rule.checkCondition(attempts)) {
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
