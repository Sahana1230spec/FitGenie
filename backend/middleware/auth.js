/**
 * Middleware to validate API configuration
 */
const validateApiKey = (req, res, next) => {
  // Check if HF API key is configured
  if (!process.env.HF_API_KEY) {
    return res.status(500).json({
      success: false,
      error: { 
        message: 'Server configuration error: Hugging Face API key not configured',
        code: 'MISSING_API_KEY'
      }
    });
  }

  // Check if HF model is configured
  if (!process.env.HF_MODEL) {
    return res.status(500).json({
      success: false,
      error: { 
        message: 'Server configuration error: Hugging Face model not configured',
        code: 'MISSING_MODEL_CONFIG'
      }
    });
  }

  next();
};

/**
 * Middleware to validate and sanitize prompt input
 */
const validatePrompt = (req, res, next) => {
  const { prompt } = req.body;

  // Check if prompt exists
  if (!prompt) {
    return res.status(400).json({
      success: false,
      error: { 
        message: 'Prompt is required',
        code: 'MISSING_PROMPT'
      }
    });
  }

  // Sanitize and validate prompt
  const sanitizedPrompt = prompt.toString().trim();

  // Check prompt length
  if (sanitizedPrompt.length === 0) {
    return res.status(400).json({
      success: false,
      error: { 
        message: 'Prompt cannot be empty',
        code: 'EMPTY_PROMPT'
      }
    });
  }

  if (sanitizedPrompt.length > 500) {
    return res.status(400).json({
      success: false,
      error: { 
        message: 'Prompt is too long. Please keep it under 500 characters.',
        code: 'PROMPT_TOO_LONG'
      }
    });
  }

  // Check for inappropriate content (basic filter)
  const inappropriateWords = ['nude', 'naked', 'sexual', 'nsfw', 'explicit'];
  const lowercasePrompt = sanitizedPrompt.toLowerCase();
  
  for (const word of inappropriateWords) {
    if (lowercasePrompt.includes(word)) {
      return res.status(400).json({
        success: false,
        error: { 
          message: 'Please keep your fashion prompts appropriate and family-friendly.',
          code: 'INAPPROPRIATE_CONTENT'
        }
      });
    }
  }

  // Add sanitized prompt back to request
  req.body.prompt = sanitizedPrompt;
  next();
};

/**
 * Middleware to log requests
 */
const logRequest = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  next();
};

module.exports = {
  validateApiKey,
  validatePrompt,
  logRequest
}; 
