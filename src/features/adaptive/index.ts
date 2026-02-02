// Types
export type {
  TagStat,
  QuestionAttempt,
  MisconceptionFlag,
  Recommendation,
  RecommendationState,
  RecommendationReason,
  AdaptiveProgressData,
  MasteryUpdateParams,
  MasteryUpdateResult,
  ReviewQueueItem,
  MisconceptionRule,
  AdaptiveEngineConfig,
} from './adaptive.types';
export { DEFAULT_ADAPTIVE_CONFIG } from './adaptive.types';

// Tags
export {
  ADAPTIVE_TAGS,
  ALL_TAGS,
  TAG_LABELS,
  TAG_GROUPS,
  DIFFICULTY_MAP,
  DIFFICULTY_LABELS_PL,
  type AdaptiveTag,
  type DifficultyLevel,
} from './adaptive.tags';

// Engine
export {
  clamp,
  addDays,
  getToday,
  parseISODate,
  isDateDueOrPast,
  daysBetween,
  createInitialTagStat,
  initializeTagStats,
  ensureAllTagsExist,
  calculateMasteryDelta,
  calculateNextReviewDate,
  updateTagStat,
  processMasteryUpdate,
  computeReviewQueue,
  getWeakestTags,
  getOverallMastery,
  getUnseenTags,
} from './adaptive.engine';

// Misconceptions
export {
  MISCONCEPTION_RULES,
  getMisconceptionRuleById,
  evaluateMisconceptionRules,
  resolveMisconception,
  getActiveMisconceptions,
  getMisconceptionsWithRules,
  getMisconceptionTags,
} from './adaptive.misconceptions';

// Recommendations
export {
  getLessonTags,
  getQuizTags,
  generateRecommendations,
  isRecommendationsCacheValid,
  getRecommendationReasonText,
  type LessonWithTags,
  type QuizWithTags,
  type GenerateRecommendationsParams,
} from './adaptive.recommendations';

// Selectors
export {
  getTagStatsSortedByMastery,
  getTagStatsSortedByRecent,
  getTagStatsGrouped,
  getMasteryLevel,
  getProgressSummary,
  getAttemptsForTag,
  getRecentAttempts,
  getAccuracyByTag,
  getActiveMisconceptionDetails,
  getRecommendationsByType,
  getTopRecommendation,
  hasRecommendations,
} from './adaptive.selectors';

// Components
export {
  MasteryBar,
  MasteryBarCompact,
  TagChip,
  TagChipList,
  RecommendationCard,
  RecommendationCardCompact,
  SkillMap,
  WeakAreasCard,
  DiagnosticsPanel,
  DiagnosticsBadge,
  DailyMission,
  DailyMissionBanner,
} from './components';
