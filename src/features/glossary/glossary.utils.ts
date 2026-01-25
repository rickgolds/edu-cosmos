import { GLOSSARY_TERMS, type GlossaryTerm } from './glossary.data';

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find all glossary terms that appear in the given text
 * Returns unique terms (based on definition to handle EN/PL variants)
 */
export function findTermsInText(text: string): GlossaryTerm[] {
  const foundTerms: GlossaryTerm[] = [];
  const addedDefinitions = new Set<string>();

  for (const term of GLOSSARY_TERMS) {
    // Skip if we already have a term with the same definition
    if (addedDefinitions.has(term.definition)) continue;

    // Check Polish term
    const polishRegex = new RegExp(`\\b${escapeRegex(term.term)}\\b`, 'gi');
    if (polishRegex.test(text)) {
      foundTerms.push(term);
      addedDefinitions.add(term.definition);
      continue;
    }

    // Check English term if available
    if (term.termEn) {
      const englishRegex = new RegExp(`\\b${escapeRegex(term.termEn)}\\b`, 'gi');
      if (englishRegex.test(text)) {
        foundTerms.push(term);
        addedDefinitions.add(term.definition);
      }
    }
  }

  return foundTerms;
}

/**
 * Result of highlighting terms in text
 */
export interface HighlightedSegment {
  text: string;
  term?: GlossaryTerm;
  isHighlighted: boolean;
}

/**
 * Split text into segments, marking glossary terms
 * Used for inline highlighting with tooltips
 */
export function highlightTermsInText(text: string): HighlightedSegment[] {
  const terms = findTermsInText(text);

  if (terms.length === 0) {
    return [{ text, isHighlighted: false }];
  }

  // Build a combined regex for all terms
  const patterns: string[] = [];
  const termMap = new Map<string, GlossaryTerm>();

  for (const term of terms) {
    const polishPattern = escapeRegex(term.term);
    patterns.push(polishPattern);
    termMap.set(term.term.toLowerCase(), term);

    if (term.termEn) {
      const englishPattern = escapeRegex(term.termEn);
      patterns.push(englishPattern);
      termMap.set(term.termEn.toLowerCase(), term);
    }
  }

  // Sort by length (longest first) to match "black hole" before "hole"
  patterns.sort((a, b) => b.length - a.length);

  const combinedRegex = new RegExp(`\\b(${patterns.join('|')})\\b`, 'gi');

  const segments: HighlightedSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        isHighlighted: false,
      });
    }

    // Add matched term
    const matchedText = match[0];
    const term = termMap.get(matchedText.toLowerCase());

    segments.push({
      text: matchedText,
      term,
      isHighlighted: true,
    });

    lastIndex = match.index + matchedText.length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      isHighlighted: false,
    });
  }

  return segments;
}

/**
 * Get a short preview of the definition (first sentence)
 */
export function getDefinitionPreview(definition: string, maxLength: number = 100): string {
  const firstSentence = definition.split(/[.!?]/)[0];
  if (firstSentence.length <= maxLength) {
    return firstSentence + '.';
  }
  return firstSentence.slice(0, maxLength).trim() + '...';
}
