/**
 * Image helper to resolve and guarantee valid image URLs across Frontend & Backend.
 */

// Mapping of service slugs and titles to guaranteed fallback images
export const defaultServiceImages = {
  doors: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  'pop-false-ceiling': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'pop & false ceiling': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'electrical-work': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
  'electrical work': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
  'complete-furniture-work': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  'complete furniture work': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
};

export const defaultGalleryImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
];

/**
 * Resolves an image URL:
 * - If missing or dummy '/uploads/sample-*', falls back to default
 * - If relative URL like '/uploads/...', prepends backend host
 * - Otherwise returns the valid remote URL
 */
export const resolveImageUrl = (imageUrl, fallbackKey = 'kitchen') => {
  if (!imageUrl) {
    return defaultServiceImages[fallbackKey.toLowerCase()] || defaultGalleryImages[0];
  }

  // If it's a dummy sample upload that doesn't exist on disk
  if (imageUrl.includes('/uploads/sample-')) {
    const key = fallbackKey.toLowerCase();
    if (defaultServiceImages[key]) return defaultServiceImages[key];
    return defaultGalleryImages[0];
  }

  // If it's a real upload from backend
  if (imageUrl.startsWith('/uploads/')) {
    return `http://localhost:5000${imageUrl}`;
  }

  return imageUrl;
};

/**
 * Fallback handler for <img> onError
 */
export const handleImageError = (e, fallbackUrl = defaultGalleryImages[0]) => {
  e.currentTarget.onerror = null; // Prevent infinite loop
  e.currentTarget.src = fallbackUrl;
};
