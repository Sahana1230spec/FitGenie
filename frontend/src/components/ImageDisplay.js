import React, { useState } from 'react';
import { Download, ExternalLink, Share2, Heart, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageDisplay = ({ imageData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!imageData) {
    return null;
  }

  const handleImageLoad = () => {
    console.log('🖼️ Image loaded successfully!');
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    console.error('❌ Image failed to load:', e);
    setImageError(true);
    // Try to reload with a cache-busting parameter
    setTimeout(() => {
      e.target.src = imageData.url + '&refresh=' + Date.now();
    }, 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageData.url;
    link.download = `fitgenie-outfit-${imageData.seed}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started! 📥');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this FitGenie outfit!',
          text: `Generated with prompt: "${imageData.prompt}"`,
          url: imageData.url
        });
        toast.success('Shared successfully! 🚀');
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(imageData.url);
      toast.success('Image URL copied to clipboard! 📋');
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(imageData.prompt);
    toast.success('Prompt copied to clipboard! ✨');
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites 💔' : 'Added to favorites! ❤️');
  };

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
      
      <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <span className="text-3xl mr-3">✨</span>
            Your Generated Outfit
          </h3>
          
          <button
            onClick={toggleLike}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isLiked 
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/30' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-pink-500/20 hover:text-pink-400'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            {/* Loading overlay */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-800/50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading your masterpiece...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {imageError && (
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">😞</div>
                <p className="text-red-400 mb-4">Oops! Image couldn't load</p>
                <button
                  onClick={() => window.open(imageData.url, '_blank')}
                  className="px-6 py-3 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-xl transition-colors duration-200"
                >
                  View in New Tab
                </button>
              </div>
            )}

            {/* The actual image */}
            {!imageError && (
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={imageData.url}
                  alt={imageData.prompt}
                  className={`w-full h-auto rounded-2xl transition-all duration-500 ${
                    imageLoaded 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
                
                {/* Hover overlay with actions */}
                {imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                    <div className="p-6 flex space-x-3">
                      <button
                        onClick={handleDownload}
                        className="p-3 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-xl transition-colors duration-200 shadow-lg"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => window.open(imageData.url, '_blank')}
                        className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors duration-200 shadow-lg"
                        title="Open in New Tab"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 shadow-lg"
                        title="Share"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Prompt Details */}
            <div className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-xl mr-2">💭</span>
                Original Prompt
              </h4>
              <p className="text-gray-300 mb-4 leading-relaxed">{imageData.prompt}</p>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 text-fuchsia-300 rounded-xl transition-colors duration-200"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Prompt</span>
              </button>
            </div>

            {/* Enhanced Prompt */}
            <div className="bg-gradient-to-r from-purple-700/20 to-pink-700/20 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-xl mr-2">🎨</span>
                Enhanced Prompt
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">{imageData.enhancedPrompt}</p>
            </div>

            {/* Generation Details */}
            <div className="bg-gradient-to-r from-green-700/20 to-teal-700/20 rounded-2xl p-6 border border-green-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-xl mr-2">⚙️</span>
                Generation Details
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Seed:</span>
                  <span className="text-white font-mono bg-gray-800/50 px-3 py-1 rounded-lg">
                    {imageData.seed}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white">512 × 512</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Model:</span>
                  <span className="text-white">Flux Pro</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Generated:</span>
                  <span className="text-white">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">Download</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Share</span>
              </button>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-yellow-700/20 to-orange-700/20 rounded-2xl p-6 border border-yellow-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span>
                Pro Tips
              </h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Try different styles for the same prompt</li>
                <li>• Be specific with colors and materials</li>
                <li>• Use the seed number to recreate similar looks</li>
                <li>• Download your favorites for inspiration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-2xl">🎯</span>
              <span className="text-sm">Perfect match for your style!</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.open(imageData.url, '_blank')}
              className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-xl transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
            >
              View Full Size
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 hover:from-fuchsia-500/30 hover:to-pink-500/30 text-fuchsia-300 hover:text-fuchsia-200 rounded-xl transition-all duration-200 border border-fuchsia-500/30"
            >
              Generate Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;