export const SECTION_OPTIONS = [
  { key: "mix", label: "Mix" },
  { key: "feedback", label: "Feedback" },
  { key: "similarity", label: "Similarity" },
  { key: "profile", label: "Profile" },
];

export const SECTION_FIELDS = {
  mix: [
    { key: "hybridGenre", label: "Genre match", type: "hybridGenre" },
    { key: "hybridCf", label: "Similar listeners", type: "hybridCf" },
  ],
  feedback: [
    { key: "feedbackLike", label: "Like boost", min: 0, max: 200 },
    { key: "feedbackDislike", label: "Dislike penalty", min: 0, max: 200 },
    { key: "feedbackLibrary", label: "Library boost", min: 0, max: 200 },
    { key: "feedbackSkip", label: "Skip penalty", min: 0, max: 200 },
  ],
  similarity: [
    { key: "cfTrackWeight", label: "Track similarity" },
    { key: "cfArtistWeight", label: "Artist similarity" },
  ],
  profile: [
    { key: "learningRate", label: "Learning rate" },
    { key: "maxShift", label: "Max shift" },
    { key: "playThreshold", label: "Play threshold", min: 0, max: 200 },
    { key: "halfLifeDays", label: "Decay days", min: 1, max: 365 },
  ],
};

export const DEFAULT_SETTINGS = {
  hybridGenre: 50,
  hybridCf: 50,
  feedbackLike: 130,
  feedbackDislike: 112,
  feedbackLibrary: 147,
  feedbackSkip: 153,
  cfTrackWeight: 70,
  cfArtistWeight: 30,
  learningRate: 10,
  maxShift: 30,
  playThreshold: 65,
  halfLifeDays: 122,
};

export function normalizePercent(value, fallback = 50) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.round(value * 100);
}

export function normalizeNumber(value, fallback = 0) {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return value;
}

export function getSafeHybridValues(config) {
  const genre = normalizePercent(config?.hybridWeights?.genre, 50);
  const cf = normalizePercent(config?.hybridWeights?.cf, 50);

  if (genre + cf === 100) {
    return { genre, cf };
  }

  return {
    genre,
    cf: 100 - genre,
  };
}

export function mapConfigToSettings(config) {
  const safeHybrid = getSafeHybridValues(config);

  return {
    hybridGenre: safeHybrid.genre,
    hybridCf: safeHybrid.cf,

    feedbackLike: normalizePercent(config?.feedbackMultipliers?.like, 130),
    feedbackDislike: normalizePercent(config?.feedbackMultipliers?.dislike, 112),
    feedbackLibrary: normalizePercent(config?.feedbackMultipliers?.library, 147),
    feedbackSkip: normalizePercent(config?.feedbackMultipliers?.skip, 153),

    cfTrackWeight: normalizePercent(
      config?.cfWeights?.trackWeight ?? config?.cfWeights?.track,
      70
    ),
    cfArtistWeight: normalizePercent(
      config?.cfWeights?.artistWeight ?? config?.cfWeights?.artist,
      30
    ),

    learningRate: normalizePercent(config?.profileEvolution?.learningRate, 10),
    maxShift: normalizePercent(config?.profileEvolution?.maxShift, 30),

    playThreshold: normalizeNumber(config?.playCount?.threshold, 65),
    halfLifeDays: normalizeNumber(config?.playCount?.halfLifeDays, 122),
  };
}

export function mapConfigToMeta(config) {
  return {
    updatedAt: config?.updatedAt || "",
    updatedBy: config?.updatedBy || "",
  };
}

export function buildPayload(settings) {
  const normalizedGenre = settings.hybridGenre / 100;
  const normalizedCf = 1 - normalizedGenre;

  return {
    hybridWeights: {
      genre: normalizedGenre,
      cf: normalizedCf,
    },
    feedbackMultipliers: {
      like: settings.feedbackLike / 100,
      dislike: settings.feedbackDislike / 100,
      library: settings.feedbackLibrary / 100,
      skip: settings.feedbackSkip / 100,
    },
    cfWeights: {
      track: settings.cfTrackWeight / 100,
      artist: settings.cfArtistWeight / 100,
    },
    profileEvolution: {
      learningRate: settings.learningRate / 100,
      maxShift: settings.maxShift / 100,
    },
    playCount: {
      threshold: settings.playThreshold,
      halfLifeDays: settings.halfLifeDays,
    },
  };
}