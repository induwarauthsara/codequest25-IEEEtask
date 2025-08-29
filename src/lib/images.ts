// Image paths configuration for team members
// This helps ensure all image paths are consistent and correctly referenced

export const teamImages = {
  likitha: '/assets/likitha.5571cd8e.jpg',
  noji: '/assets/noji.8520b926.jpg', 
  chamudi: '/assets/chamudi.42c865f3.jpg',
  dineth: '/assets/dineth.4687f7f1.jpg',
  induwara: '/assets/induwara.jpg',
  logo: '/assets/logo.png'
} as const;

// Type for team image keys
export type TeamImageKey = keyof typeof teamImages;

// Helper function to get image path safely
export const getTeamImage = (key: TeamImageKey): string => {
  return teamImages[key];
};

// Debug function to log image paths (useful for debugging in production)
export const logImagePaths = () => {
  if (typeof console !== 'undefined') {
    console.log('Team image paths:', teamImages);
  }
};
