# FitGenie 🧞‍♀️

> **AI-powered Outfit Generator** - Your personal styling assistant that creates perfect outfit combinations using advanced AI technology.

Built with **React** (frontend) and **Node.js + Express** (backend), FitGenie transforms your wardrobe preferences into stunning, personalized outfit suggestions instantly!



---

## ✨ Features

🎯 **Smart AI Generation** - Advanced algorithms create outfit combinations based on your style preferences  
🎨 **Personalized Styling** - Tailored recommendations that match your unique taste and occasion  
📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices  
🖼️ **Image Upload Support** - Upload your clothing items for AI-powered mix-and-match suggestions  
⚡ **Real-time Processing** - Lightning-fast outfit generation with instant results  
🌈 **Style Customization** - Filter by color, occasion, weather, and personal preferences  
💾 **Outfit History** - Save and revisit your favorite generated outfits  

---

## 🛠️ Tech Stack

| **Frontend** | **Backend** | **Styling** | **Tools** |
|--------------|-------------|-------------|-----------|
| React 18.x | Node.js 18.x | TailwindCSS | VS Code |
| JavaScript ES6+ | Express.js | CSS3 | Git & GitHub |
| HTML5 | Multer (File Upload) | Responsive Design | npm/yarn |
| React Hooks | RESTful APIs | Modern UI/UX | Postman |

---

## 📂 Project Structure

```
FitGenie/
├── 📁 backend/
│   ├── 📁 controllers/
│   │   ├── imageController.js      # AI image generation logic
│   │   └── outfitController.js     # Outfit recommendation engine
│   ├── 📁 middleware/
│   │   ├── auth.js                 # Authentication middleware
│   │   └── fileUpload.js           # File handling middleware
│   ├── 📁 routes/
│   │   ├── api.js                  # Main API routes
│   │   ├── outfits.js              # Outfit-related endpoints
│   │   └── images.js               # Image processing routes
│   ├── 📁 uploads/                 # User uploaded files
│   ├── 📁 utils/
│   │   ├── aiHelper.js             # AI integration utilities
│   │   └── imageProcessor.js       # Image processing functions
│   ├── server.js                   # Express server entry point
│   ├── package.json                # Backend dependencies
│   └── .env                        # Environment variables
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── index.html              # Main HTML template
│   │   ├── favicon.ico             # Site favicon
│   │   └── manifest.json           # PWA manifest
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── ImageDisplay.js     # Image preview component
│   │   │   ├── OutfitGenerator.js  # Main generator interface
│   │   │   ├── StyleSelector.js    # Style preference selector
│   │   │   └── OutfitCard.js       # Individual outfit display
│   │   ├── 📁 pages/
│   │   │   ├── Home.js             # Landing page
│   │   │   ├── Generator.js        # Main generator page
│   │   │   └── Gallery.js          # Outfit gallery
│   │   ├── 📁 styles/
│   │   │   ├── index.css           # Global styles
│   │   │   └── tailwind.css        # TailwindCSS imports
│   │   ├── App.js                  # Main React component
│   │   └── index.js                # React DOM entry point
│   ├── package.json                # Frontend dependencies
│   └── tailwind.config.js          # TailwindCSS configuration
├── 📁 screenshots/                 # Project screenshots
├── README.md                       # Project documentation
├── LICENSE                         # GPL-2.0 License
└── .gitignore                      # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **Git** for version control

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sahana1230spec/FitGenie.git
cd FitGenie
```

### 2️⃣ Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your API keys and configurations

# Start the backend server
npm start
# Server runs on http://localhost:5000
```

### 3️⃣ Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
# Frontend runs on http://localhost:3000
```

### 4️⃣ Access the Application
Open your browser and navigate to **http://localhost:3000** 🎉

---

## 🔧 Configuration

### Environment Variables (.env)
```env
# Backend Configuration
PORT=5000
NODE_ENV=development

# API Keys (Add your actual keys)
OPENAI_API_KEY=your_openai_api_key_here
STABILITY_AI_KEY=your_stability_ai_key_here

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# Database (if using)
DATABASE_URL=your_database_url_here
```

---

## 📖 API Documentation

### Base URL: `http://localhost:5000/api`

#### 🔗 Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/generate-outfit` | Generate outfit based on preferences |
| `POST` | `/upload-image` | Upload clothing item image |
| `GET` | `/outfit-history` | Retrieve user's outfit history |
| `DELETE` | `/outfit/:id` | Delete specific outfit |

#### Example Request:
```bash
curl -X POST http://localhost:5000/api/generate-outfit \
  -H "Content-Type: application/json" \
  -d '{
    "style": "casual",
    "occasion": "work",
    "colors": ["blue", "white"],
    "weather": "mild"
  }'
```

---

## 🖼️ Screenshots

![Homepage](./screenshots/homepage.png)
![Sample Output 1](./screenshots/sampleoutput_1.png)
![Sample Output 2](./screenshots/sampleoutput_2.png)
![Sample Output 3](./screenshots/sampleoutput_3.png)

---

## 🔮 Future Enhancements

- [ ] **User Authentication** - Personal accounts and saved preferences
- [ ] **Social Sharing** - Share outfits on social media platforms
- [ ] **Weather Integration** - Real-time weather-based recommendations
- [ ] **Shopping Integration** - Direct links to purchase recommended items
- [ ] **AR Try-On** - Virtual outfit try-on using camera
- [ ] **Style Analytics** - Personal style insights and trends
- [ ] **Mobile App** - React Native mobile application

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the **GNU General Public License v2.0** - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ **Commercial use**
- ✅ **Modification**
- ✅ **Distribution**
- ✅ **Private use**
- ❌ **Liability**
- ❌ **Warranty**

---

## 👩‍💻 Author

**Sahana R**  

---

## 🙏 Acknowledgments

- **OpenAI** for AI integration capabilities
- **React Team** for the amazing frontend framework
- **TailwindCSS** for beautiful, responsive styling
- **Node.js Community** for robust backend support
- **Open Source Contributors** worldwide 🌍



---

<div align="center">

### ⭐ Star this repo if you found it helpful! ⭐

**Made with ❤️ and lots of ☕**

[🔝 Back to top](#fitgenie-️)

</div>