# Installation Guide - Couple Name Hashtag Maker

This guide provides detailed step-by-step instructions to install and run the Couple Name Hashtag Maker application locally and deploy it to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Installation](#local-installation)
  - [Option 1: Quick Start (Using start.sh)](#option-1-quick-start-using-startsh)
  - [Option 2: Manual Installation](#option-2-manual-installation)
- [Frontend-Only Mode](#frontend-only-mode)
- [Full Stack Mode (Frontend + Backend)](#full-stack-mode-frontend--backend)
- [Deployment](#deployment)
  - [Deploy to Netlify (Frontend Only)](#deploy-to-netlify-frontend-only)
  - [Deploy Full Stack](#deploy-full-stack)
- [Database Setup (Optional)](#database-setup-optional)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Verify Installation
Open a terminal/command prompt and run:
```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
git --version     # Should show git version
```

---

## Local Installation

### Option 1: Quick Start (Using start.sh)

**For Linux/Mac users**, you can use the automated start script:

1. **Clone the repository:**
```bash
git clone https://github.com/wdranjeet/Couplehashtag.git
cd Couplehashtag
```

2. **Make the start script executable:**
```bash
chmod +x start.sh
```

3. **Run the application:**
```bash
./start.sh
```

This will:
- Install all dependencies for both frontend and backend
- Start the backend server on http://localhost:5000
- Start the frontend on http://localhost:3000
- Open your browser automatically

### Option 2: Manual Installation

**For all platforms (Windows/Linux/Mac):**

#### Step 1: Clone the Repository
```bash
git clone https://github.com/wdranjeet/Couplehashtag.git
cd Couplehashtag
```

#### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

Expected output:
```
added XX packages in XXs
```

#### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

Expected output:
```
added XXX packages in XXs
```

#### Step 4: Start the Backend Server
Open a terminal/command prompt in the `backend` directory:
```bash
cd backend
npm start
```

You should see:
```
🚀 Couple Hashtag API server running on port 5000
📡 API endpoints:
   - POST http://localhost:5000/api/generateHashtags
   - GET  http://localhost:5000/api/trending
   - GET  http://localhost:5000/health
```

**Keep this terminal window open.**

#### Step 5: Start the Frontend Server
Open a **new** terminal/command prompt in the `frontend` directory:
```bash
cd frontend
npm start
```

You should see:
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

The application will automatically open in your default browser at http://localhost:3000

---

## Frontend-Only Mode

The application can work **without a backend** for basic hashtag generation. This is ideal for:
- Simple deployments (like Netlify)
- Demo purposes
- When you don't need trending analytics

### How to Use Frontend-Only Mode

1. **Deploy only the frontend** (see [Deploy to Netlify](#deploy-to-netlify-frontend-only))
2. The frontend will generate hashtags using client-side JavaScript
3. No backend or database required
4. Trending analytics will not be available

---

## Full Stack Mode (Frontend + Backend)

For full functionality including trending analytics:

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create environment variables (optional):**

Create a `.env` file in the `backend` directory:
```bash
PORT=5000
NODE_ENV=production
CORS_ORIGIN=http://localhost:3000
```

3. **Start the backend:**
```bash
npm start
```

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Configure API URL:**

Edit `frontend/.env.production`:
```bash
REACT_APP_API_URL=http://localhost:5000
```

For production, replace with your backend URL:
```bash
REACT_APP_API_URL=https://your-backend-url.com
```

3. **Start the frontend:**
```bash
npm start
```

---

## Deployment

### Deploy to Netlify (Frontend Only)

This is the **simplest deployment method** and doesn't require a backend.

#### Step 1: Prepare Your Repository
Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Deploy to Netlify

**Option A: Using Netlify Dashboard (Recommended)**

1. Go to [Netlify](https://www.netlify.com/) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your repository: `wdranjeet/Couplehashtag`
5. Configure build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
6. Click "Deploy site"

**Option B: Using Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd frontend

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

#### Step 3: Verify Deployment
- Netlify will provide a URL like `https://your-app-name.netlify.app`
- Open the URL and test the application
- The app should work without any "broken link" errors

#### Troubleshooting Netlify Deployment
If you see "Looks like you've followed a broken link":
- Ensure `_redirects` file exists in `frontend/public/` ✓ (Already created)
- Ensure `netlify.toml` exists in the root directory ✓ (Already created)
- Clear Netlify cache and redeploy

### Deploy Full Stack

For full functionality with backend:

#### Option 1: Netlify (Frontend) + Railway (Backend)

**Backend on Railway:**
1. Go to [Railway](https://railway.app/)
2. Create new project → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `backend`
5. Railway will auto-detect Node.js
6. Note your backend URL: `https://your-app.railway.app`

**Frontend on Netlify:**
1. Follow [Netlify deployment steps](#deploy-to-netlify-frontend-only)
2. Add environment variable in Netlify:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-app.railway.app`
3. Redeploy

#### Option 2: Vercel (Frontend) + Heroku (Backend)

**Backend on Heroku:**
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
cd backend
heroku create your-app-name

# Deploy
git init
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Frontend on Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

Set environment variable in Vercel dashboard:
- `REACT_APP_API_URL` = `https://your-app.herokuapp.com`

---

## Database Setup (Optional)

The application works **without a database** using in-memory storage. However, for production trending analytics, you can add a database.

### Option 1: MongoDB Atlas (Free Tier Available)

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster

2. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Example: `mongodb+srv://user:password@cluster.mongodb.net/couplehashtag`

3. **Install MongoDB Driver:**
```bash
cd backend
npm install mongoose
```

4. **Update Backend Code:**

Create `backend/src/db.js`:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

5. **Add to server.js:**
```javascript
const connectDB = require('./db');

// Connect to database
connectDB();
```

6. **Set Environment Variable:**
```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/couplehashtag
```

### Option 2: Firebase Firestore

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Install Firebase Admin SDK:**
```bash
cd backend
npm install firebase-admin
```

3. **Download Service Account Key:**
   - In Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `firebase-key.json` in backend directory

4. **Initialize Firebase in Backend:**
Create `backend/src/firebase.js`:
```javascript
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;
```

**Note:** Database integration requires code modifications. The current version works perfectly **without a database**.

---

## Troubleshooting

### Issue: "Cannot find module"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port already in use"
**Solution:**
```bash
# Find and kill the process (Linux/Mac)
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "Failed to connect to server"
**Solution:**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` is set correctly
- Verify CORS is enabled in backend

### Issue: Netlify shows "Broken link" error
**Solution:**
- Ensure `_redirects` file exists in `frontend/public/` ✓
- Ensure `netlify.toml` exists in root directory ✓
- Clear cache in Netlify: Site settings → Build & deploy → Clear cache and deploy

### Issue: Build fails on Netlify
**Solution:**
```bash
# Test build locally first
cd frontend
npm run build

# If successful, commit and push
git add .
git commit -m "Fix build"
git push
```

### Issue: Environment variables not working
**Solution:**
- For local development: Create `.env.development` in frontend
- For production: Set in hosting platform dashboard (Netlify/Vercel)
- Variables must start with `REACT_APP_`
- Restart development server after adding variables

---

## Additional Resources

- **README.md** - Project overview and features
- **DEPLOYMENT.md** - Detailed deployment options
- **CONTRIBUTING.md** - Contribution guidelines
- [GitHub Issues](https://github.com/wdranjeet/Couplehashtag/issues) - Report bugs

---

## Support

If you encounter any issues not covered in this guide:
1. Check the [Troubleshooting](#troubleshooting) section
2. Search [GitHub Issues](https://github.com/wdranjeet/Couplehashtag/issues)
3. Create a new issue with:
   - Your operating system
   - Node.js version
   - Error message
   - Steps to reproduce

---

## License

GNU General Public License v2.0

---

**Made with ❤️ for couples everywhere!**
