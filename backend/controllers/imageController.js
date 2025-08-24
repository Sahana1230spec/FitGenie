// controllers/imageController.js - WORKING FREE VERSION
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');

const ensureUploadsDir = async () => {
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
};

const generateOutfitImage = async (req, res) => {
  try {
    console.log('🎨 Generate endpoint hit!');
    console.log('📥 Request body:', req.body);

    const { description, style } = req.body;
    
    if (!description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Description is required' 
      });
    }

    // Style-specific prompt enhancements
    const stylePrompts = {
      realistic: 'photorealistic fashion photography, studio lighting, professional model, high quality',
      artistic: 'artistic fashion illustration, creative style, hand-drawn aesthetic, stylized',
      minimal: 'minimalist fashion, clean lines, simple background, modern aesthetic',
      vintage: 'vintage fashion photography, retro style, classic elegance, film photography',
      streetwear: 'urban streetwear photography, casual street style, modern fashion',
      formal: 'formal fashion photography, elegant professional attire, sophisticated style'
    };

    // Create enhanced prompt
    const enhancedPrompt = `Fashion photography: ${description}, ${stylePrompts[style] || stylePrompts.realistic}, professional studio lighting, high quality, detailed clothing, stylish outfit, ${style} style, clean white background, 4k resolution, fashion model, trendy outfit`;
    
    console.log('✨ Enhanced prompt:', enhancedPrompt);

    // Ensure uploads directory exists
    await ensureUploadsDir();

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `outfit_${timestamp}_${Math.random().toString(36).substr(2, 9)}.jpg`;
    const filepath = path.join(uploadsDir, filename);

    console.log('🔄 Calling Pollinations API...');

    // Use Pollinations.ai - completely free!
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=512&height=768&seed=${Math.floor(Math.random() * 1000000)}&enhance=true&model=flux`;

    console.log('🌐 Image URL:', imageUrl);

    // Download and save the image
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.buffer();
    await fs.writeFile(filepath, buffer);

    console.log('💾 Image saved:', filename);

    const result = {
      success: true,
      imageUrl: `http://localhost:3001/uploads/${filename}`,
      filename: filename,
      description: description,
      style: style,
      timestamp: new Date().toISOString(),
      generationTime: Date.now() - timestamp
    };

    console.log('✅ Sending response:', result);

    res.json(result);

  } catch (error) {
    console.error('❌ Error generating image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate image',
      details: error.message
    });
  }
};

// Get all generated images
const getImages = async (req, res) => {
  try {
    await ensureUploadsDir();
    const files = await fs.readdir(uploadsDir);
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif)$/i)
    );
    
    const images = imageFiles.map(filename => ({
      filename,
      url: `/uploads/${filename}`,
      fullUrl: `http://localhost:3001/uploads/${filename}`
    }));
    
    res.json({
      success: true,
      images: images,
      count: images.length
    });
  } catch (error) {
    console.error('Failed to list images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve images'
    });
  }
};

module.exports = {
  generateOutfitImage,
  getImages
};