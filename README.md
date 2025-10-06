# Couplehashtag - Couple Name Hashtag Maker

Generate creative and unique couple name hashtags for weddings, engagements, and love stories! Perfect for Instagram, WhatsApp, and all social media platforms.

## 🌟 Features

- **Smart Hashtag Generation**: Creates 30+ unique hashtag variations from two names
- **Multiple Algorithms**: 
  - Simple concatenation (e.g., #RanjeetDeepa)
  - Creative combinations (e.g., #RanDee)
  - Modifier additions (e.g., #RanjeetDeepaLove, #ForeverRanjeet)
- **One-Click Copy**: Easily copy hashtags to clipboard
- **Social Sharing**: Share directly to Instagram, WhatsApp, Twitter/X, and Arattai
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **PWA Support**: Install as a mobile app on your device
- **Android App**: Build AAB for Google Play Store & Indus AppStore
- **Beautiful UI**: Modern design with smooth animations using Framer Motion
- **Trending Analytics**: Track popular hashtags (backend feature)

## 🏗️ Architecture

### Frontend Layer
- **React.js** - Modern, component-based UI
- **Bootstrap 5** - Responsive design framework
- **Framer Motion** - Smooth animations and interactions
- **PWA** - Progressive Web App for mobile installation

### Backend Layer
- **Node.js + Express.js** - Lightweight API server
- **REST API** - Clean endpoint design
- **In-Memory Storage** - Trending analytics (can be upgraded to MongoDB/Firebase)

### Core Algorithm
- Name concatenation and creative combinations
- Multiple variation generation
- Modifier-based hashtag creation

## 📦 Installation & Setup

> **For detailed step-by-step installation instructions, see [INSTALLATION.md](INSTALLATION.md)**

### Quick Start

#### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

#### Using the Start Script (Linux/Mac)
```bash
git clone https://github.com/wdranjeet/Couplehashtag.git
cd Couplehashtag
chmod +x start.sh
./start.sh
```

#### Manual Installation (All Platforms)

**Backend Setup:**
```bash
cd backend
npm install
npm start
```
The backend API will run on `http://localhost:5000`

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

### Deploy to Netlify (No Backend Required)

1. Fork/clone this repository
2. Connect to Netlify
3. Set build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
4. Deploy!

The `_redirects` file and `netlify.toml` configuration are already included to prevent "broken link" errors.

## 🚀 Usage

### Running the Application

1. Start the backend server (in the backend directory):
```bash
npm start
```

2. In a new terminal, start the frontend (in the frontend directory):
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

4. Enter two names and click "Generate Hashtags"

5. Copy your favorite hashtags or share them directly to social media!

## 📡 API Endpoints

### POST /api/generateHashtags
Generate hashtags from two names.

**Request:**
```json
{
  "name1": "Ranjeet",
  "name2": "Deepa"
}
```

**Response:**
```json
{
  "success": true,
  "hashtags": [
    "#RanjeetDeepa",
    "#DeepaRanjeet",
    "#RanjeetDeepeLove",
    ...
  ],
  "count": 30
}
```

### GET /api/trending
Get the most popular hashtags.

**Response:**
```json
{
  "success": true,
  "trending": [
    {"hashtag": "#RanjeetDeepa", "count": 5},
    {"hashtag": "#DeepaRanjeet", "count": 3}
  ],
  "count": 10
}
```

## 🏗️ Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates a `build` folder with optimized production files.

### Backend Production
The backend is production-ready. For deployment:
1. Set environment variables (PORT, etc.)
2. Use a process manager like PM2
3. Set up a reverse proxy (nginx)

## 📱 PWA Installation

The app can be installed as a Progressive Web App on mobile devices:

1. Open the app in your mobile browser
2. Look for the "Add to Home Screen" prompt
3. Install and use like a native app!

## 📱 Android App (AAB for Google Play Store & Indus AppStore)

Want to publish the app on Google Play Store or Indus AppStore? We've got you covered!

The **mobile** directory contains everything you need to generate an Android App Bundle (AAB) file for publishing on app stores.

### Quick Build

```bash
cd mobile
npm install
npm run build:all
cd android
./gradlew bundleRelease
```

The AAB file will be at: `mobile/android/app/build/outputs/bundle/release/app-release.aab`

### Documentation

- **[mobile/AAB_BUILD_GUIDE.md](mobile/AAB_BUILD_GUIDE.md)** - Complete guide for building AAB and publishing to app stores
- **[mobile/QUICK_START.md](mobile/QUICK_START.md)** - Quick reference guide
- **[mobile/README.md](mobile/README.md)** - Mobile directory documentation

### Requirements

- Node.js (v14+)
- Java JDK (v11 or v17)
- Android SDK
- Android Studio (recommended)

See the [mobile/AAB_BUILD_GUIDE.md](mobile/AAB_BUILD_GUIDE.md) for detailed setup instructions and publishing guidelines.

## 🎨 Customization

### Modify Hashtag Modifiers
Edit `backend/src/hashtagGenerator.js` to add new creative modifiers:

```javascript
this.modifiers = [
  'Love', 'Forever', 'Together', 'CoupleGoals',
  // Add your custom modifiers here
];
```

### Change Theme Colors
Edit `frontend/src/App.css` and `frontend/src/components/HashtagGenerator.css`

## 🔮 Future Enhancements

- [ ] AI-powered hashtag generation using OpenAI/HuggingFace
- [ ] MongoDB/Firebase integration for persistent analytics
- [ ] User accounts and favorites
- [ ] Hashtag popularity voting
- [ ] More social platform integrations
- [ ] Multi-language support
- [ ] Custom hashtag templates

## 📄 License

This project is licensed under the GNU General Public License v2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 💖 Made with Love

Created for couples everywhere to celebrate their love stories!

