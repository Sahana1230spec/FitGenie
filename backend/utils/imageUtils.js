const crypto = require('crypto');

/**
 * Enhance user prompt with fashion-specific terms for better AI generation
 */
const enhancePrompt = (userPrompt, style = 'realistic') => {
  const styleModifiers = {
    realistic: 'photorealistic, high quality, professional photography',
    artistic: 'artistic rendering, stylized illustration, creative design',
    minimal: 'clean lines, minimalist design, simple aesthetic',
    vintage: 'vintage fashion, retro style, classic aesthetic',
    streetwear: 'urban streetwear, modern casual style',
    formal: 'elegant formal wear, sophisticated styling'
  };

  const baseEnhancement = [
    'fashion outfit',
    'clothing ensemble',
    'stylish attire',
    'well-coordinated',
    'trendy fashion',
    'high quality fashion photography',
    'studio lighting',
    'clean background',
    'detailed textures',
    '4k resolution'
  ];

  const negativePrompts = [
    'blurry',
    'low quality',
    'distorted',
    'amateur',
    'bad anatomy',
    'extra limbs',
    'watermark',
    'signature'
  ];

  // Combine user prompt with enhancements
  const enhancedPrompt = [
    userPrompt,
    styleModifiers[style] || styleModifiers.realistic,
    ...baseEnhancement
  ].join(', ');

  return `${enhancedPrompt}. Negative prompt: ${negativePrompts.join(', ')}`;
};

/**
 * Generate unique ID for image storage
 */
const generateImageId = () => {
  const timestamp = Date.now().toString(36);
  const randomBytes = crypto.randomBytes(6).toString('hex');
  return `img_${timestamp}_${randomBytes}`;
};

/**
 * Validate image format and size
 */
const validateImage = (imageBuffer) => {
  if (!imageBuffer || imageBuffer.length === 0) {
    throw new Error('Invalid image buffer');
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (imageBuffer.length > maxSize) {
    throw new Error('Image file too large');
  }

  return true;
};

/**
 * Get image metadata
 */
const getImageMetadata = (imageBuffer) => {
  return {
    size: imageBuffer.length,
    sizeFormatted: formatBytes(imageBuffer.length),
    type: 'image/png', // Default for AI generated images
    dimensions: '512x768' // Default dimensions
  };
};

/**
 * Format bytes to human readable format
 */
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Popular fashion prompt templates
 */
const promptTemplates = {
  casual: [
    'comfortable casual wear with jeans and sneakers',
    'relaxed weekend outfit with soft fabrics',
    'cozy autumn casual style with layers'
  ],
  formal: [
    'elegant formal business attire',
    'sophisticated evening wear',
    'professional corporate styling'
  ],
  streetwear: [
    'urban streetwear with bold graphics',
    'contemporary street fashion with sneakers',
    'trendy streetwear with oversized hoodies'
  ],
  boho: [
    'bohemian chic with flowing fabrics',
    'free-spirited boho style with earthy tones',
    'romantic bohemian outfit with vintage accessories'
  ],
  minimalist: [
    'clean minimalist aesthetic with neutral tones',
    'simple elegant lines and monochrome palette',
    'understated luxury with quality basics'
  ]
};

/**
 * Get random prompt suggestion
 */
const getRandomPromptSuggestion = () => {
  const categories = Object.keys(promptTemplates);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const prompts = promptTemplates[randomCategory];
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  return {
    category: randomCategory,
    prompt: randomPrompt
  };
};

/**
 * Extract dominant colors from prompt (simple keyword matching)
 */
const extractColors = (prompt) => {
  const colorMap = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#f59e0b',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f97316',
    black: '#1f2937',
    white: '#f9fafb',
    gray: '#6b7280',
    brown: '#92400e',
    navy: '#1e3a8a',
    teal: '#0d9488',
    lime: '#65a30d',
    indigo: '#4338ca'
  };

  const foundColors = [];
  const lowerPrompt = prompt.toLowerCase();

  Object.keys(colorMap).forEach(color => {
    if (lowerPrompt.includes(color)) {
      foundColors.push({
        name: color,
        hex: colorMap[color]
      });
    }
  });

  return foundColors;
};

module.exports = {
  enhancePrompt,
  generateImageId,
  validateImage,
  getImageMetadata,
  formatBytes,
  promptTemplates,
  getRandomPromptSuggestion,
  extractColors
}; 
