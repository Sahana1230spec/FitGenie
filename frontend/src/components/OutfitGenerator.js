import React, { useState } from 'react';
import axios from 'axios';
import { Camera, Palette, Sparkles, Download, RefreshCw, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageDisplay from './ImageDisplay';
import LoadingSpinner from './LoadingSpinner';

const OutfitGenerator = () => {
  // ✅ ADD THIS LINE - API URL for Railway backend
  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const styles = [
    { id: 'realistic', name: 'Realistic', icon: '📸', description: 'Photo-realistic outfits' },
    { id: 'artistic', name: 'Artistic', icon: '🎨', description: 'Creative and stylized' },
    { id: 'minimal', name: 'Minimal', icon: '⚫', description: 'Clean and simple' },
    { id: 'vintage', name: 'Vintage', icon: '👗', description: 'Classic retro style' },
    { id: 'streetwear', name: 'Streetwear', icon: '🧢', description: 'Urban fashion' },
    { id: 'formal', name: 'Formal', icon: '👔', description: 'Business and formal' }
  ];

  const promptSuggestions = [
    "Elegant evening dress with metallic accents",
    "Casual streetwear with oversized hoodie",
    "Professional business attire with modern touches",
    "Bohemian summer outfit with flowy fabrics",
    "Minimalist outfit with neutral tones",
    "Vintage-inspired dress with floral patterns"
  ];

  const generateRandomPrompt = () => {
    const randomPrompt = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
    setPrompt(randomPrompt);
    toast.success('Random idea generated! ✨');
  };

  const generateOutfit = async () => {
    if (!prompt.trim()) {
      toast.error('Please describe your outfit idea');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      toast.loading('Creating your outfit...', { duration: 1000 });
      
      // ✅ FIXED LINE - Now uses Railway backend URL
      const response = await axios.post(`${API_URL}/api/generate-outfit`, {
        description: prompt,
        style: selectedStyle
      });

      if (response.data.success && response.data.imageUrl) {
        setGeneratedImage({
          url: response.data.imageUrl,
          prompt: response.data.description,
          style: response.data.style
        });
        toast.success('Outfit generated successfully! 🎉');
      } else {
        throw new Error('Failed to generate image');
      }

    } catch (err) {
      console.error('❌ Frontend Error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to generate outfit';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateOutfit();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Generator Card */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Style</h2>
            <p className="text-gray-400">Select a style and describe your perfect outfit</p>
          </div>

          {/* Style Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {styles.map((style) => (
              <div
                key={style.id}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  selectedStyle === style.id
                    ? 'scale-105'
                    : 'hover:scale-105'
                }`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className={`
                  relative p-4 rounded-2xl text-center transition-all duration-300
                  ${selectedStyle === style.id
                    ? 'bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-lg shadow-fuchsia-500/50'
                    : 'bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-fuchsia-600/20 hover:to-pink-600/20 border border-gray-600/50 hover:border-fuchsia-500/30'
                  }
                `}>
                  <div className="text-2xl mb-2">{style.icon}</div>
                  <div className={`font-semibold text-sm mb-1 ${
                    selectedStyle === style.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {style.name}
                  </div>
                  <div className={`text-xs ${
                    selectedStyle === style.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    {style.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Input Section */}
          <div className="mb-8">
            <label className="block text-white text-lg font-semibold mb-4">
              Describe Your Vibe
            </label>
            
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your dream outfit... (e.g., elegant evening dress with shimmering details)"
                className="w-full p-4 pr-20 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-fuchsia-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-400 focus:shadow-lg focus:shadow-fuchsia-500/20 transition-all duration-300 resize-none"
                rows="3"
                maxLength="500"
              />
              
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {prompt.length}/500
                </span>
                <button
                  onClick={generateRandomPrompt}
                  className="p-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-xl transition-colors duration-200"
                  title="Random Idea"
                >
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={generateOutfit}
              disabled={isLoading || !prompt.trim()}
              className="group relative px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
              <div className="flex items-center space-x-3">
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                )}
                <span className="text-lg">
                  {isLoading ? 'Creating Magic...' : 'Generate Outfit'}
                </span>
              </div>
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm mb-3">Quick Ideas:</p>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="px-4 py-2 bg-gray-700/50 hover:bg-fuchsia-500/20 text-gray-300 hover:text-white text-sm rounded-xl transition-all duration-200 hover:border-fuchsia-500/30 border border-transparent"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-center">
            <span className="text-2xl mr-2">⚠️</span>
            {error}
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner />}

        {/* Generated Image */}
        {generatedImage && !isLoading && (
          <ImageDisplay imageData={generatedImage} />
        )}
      </div>
    </div>
  );
};

export default OutfitGenerator;