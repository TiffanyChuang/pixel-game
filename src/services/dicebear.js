/**
 * Generate pixel art avatar URL using DiceBear API
 * @param {string} seed - The seed for the avatar generation
 * @returns {string} - The URL of the avatar image
 */
export const getAvatarUrl = (seed) => {
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
};
