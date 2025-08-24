# 🧙‍♂️ FitGenie - AI Outfit Visualizer

Transform your style ideas into stunning outfit visuals with AI magic!

![FitGenie Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=FitGenie+AI+Fashion+Generator)

## ✨ Features

- 🎨 **AI-Powered Generation**: Describe your style and get instant visual results
- 🎭 **Multiple Styles**: Choose from realistic, artistic, minimal, vintage, streetwear, and formal
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast & Free**: Uses Hugging Face's free API tier
- 💾 **Download & Share**: Save your creations or share with friends
- 🔒 **Secure**: Rate limited and content filtered

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Free Hugging Face account

### Setup
1. **Clone and install:**
   ```bash
   git clone https://github.com/yourusername/fitgenie.git
   cd fitgenie
   npm run install:all
   ```

2. **Get your API key:**
   - Sign up at [Hugging Face](https://huggingface.co/)
   - Go to Settings → Access Tokens
   - Create a "Read" token

3. **Configure environment:**
   ```bash
   # Edit .env file
   HF_API_KEY=your_hugging_face_token_here
   HF_MODEL=runwayml/stable-diffusion-v1-5
   ```

4. **Run the app:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

## 🎨 Usage Examples

Try these prompts:
- "Oversized softboy aesthetic with hoodies and pastel tones"
- "Elegant minimalist outfit with neutral colors and clean lines"
- "Vintage 90s grunge style with denim and band tees"
- "Professional business casual with modern touches"

## 🏗️ Tech Stack

**Frontend:**
- React 18 with Hooks
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls
- React Hot Toast for notifications

**Backend:**
- Node.js + Express
- Hugging Face Inference API
- Rate limiting & security middleware
- CORS and Helmet protection

## 📱 Screenshots

### Desktop View
![Desktop](https://via.placeholder.com/600x400/4facfe/ffffff?text=Desktop+View)

### Mobile View
![Mobile](https://via.placeholder.com/300x500/f093fb/ffffff?text=Mobile+View)

## 🚀 Deployment

### Replit (Recommended)
1. Import this repo to Replit
2. Add environment variables in Secrets
3. Run `npm run deploy:replit`

### Vercel
1. Connect your GitHub repo
2. Add environment variables
3. Deploy with one click

## 📊 API Endpoints

- `POST /api/generate` - Generate outfit image
- `GET /api/generate/:id` - Get image by ID
- `GET /api/health` - Health check

## 🔧 Configuration

### Environment Variables
```env
HF_API_KEY=your_token        # Required: Hugging Face API key
HF_MODEL=model_name          # AI model to use
PORT=3001                    # Backend port
NODE_ENV=development         # Environment
FRONTEND_URL=http://localhost:3000  # Frontend URL for CORS
```

### Available Models
- `runwayml/stable-diffusion-v1-5` (recommended)
- `stabilityai/stable-diffusion-2-1`
- `CompVis/stable-diffusion-v1-4`

## 🛡️ Security Features

- Rate limiting (5 requests/minute per IP)
- Input validation and sanitization
- Content filtering for inappropriate prompts
- CORS protection
- Security headers with Helmet

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for the amazing AI models
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide Icons](https://lucide.dev/) for the beautiful icons

## 📞 Support


