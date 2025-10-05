# Deployment Guide - Couple Name Hashtag Maker

This guide covers different deployment options for the Couple Name Hashtag Maker application.

## Table of Contents
1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Cloud Deployment](#cloud-deployment)
4. [Environment Variables](#environment-variables)

## Local Development

### Prerequisites
- Node.js v14+ and npm v6+
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/wdranjeet/Couplehashtag.git
cd Couplehashtag
```

2. **Using the start script (Linux/Mac)**
```bash
chmod +x start.sh
./start.sh
```

3. **Manual start**

Start backend:
```bash
cd backend
npm install
npm start
```

Start frontend (in a new terminal):
```bash
cd frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Docker Deployment

### Using Docker Compose

1. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

2. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

3. **Stop the services**
```bash
docker-compose down
```

### Individual Docker Containers

**Backend:**
```bash
cd backend
docker build -t couple-hashtag-backend .
docker run -p 5000:5000 couple-hashtag-backend
```

**Frontend:**
```bash
cd frontend
docker build -t couple-hashtag-frontend .
docker run -p 80:80 couple-hashtag-frontend
```

## Cloud Deployment

### Option 1: Vercel (Frontend) + Heroku (Backend)

#### Frontend on Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy frontend:
```bash
cd frontend
vercel
```

3. Set environment variable in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

#### Backend on Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create and deploy:
```bash
cd backend
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Option 2: Netlify (Frontend) + Railway (Backend)

#### Frontend on Netlify

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `frontend`

3. Environment variables:
```
REACT_APP_API_URL=https://your-backend.railway.app
```

#### Backend on Railway

1. Connect GitHub repository to Railway
2. Railway will auto-detect Node.js and deploy
3. Set root directory to `backend`

### Option 3: AWS (Full Stack)

#### Frontend on S3 + CloudFront

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Upload to S3 bucket
3. Configure CloudFront distribution
4. Set custom domain (optional)

#### Backend on EC2 or ECS

1. Set up EC2 instance with Node.js
2. Clone repository and install dependencies
3. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start src/server.js --name couple-hashtag-api
pm2 startup
pm2 save
```

4. Set up nginx as reverse proxy
5. Configure SSL with Let's Encrypt

### Option 4: Google Cloud Platform

#### Frontend on Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

#### Backend on Cloud Run

```bash
gcloud run deploy couple-hashtag-api \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Variables

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

## Database Integration (Optional)

To add persistent storage for trending analytics:

### MongoDB Atlas

1. Create MongoDB Atlas account
2. Create cluster and get connection string
3. Install mongoose in backend:
```bash
npm install mongoose
```

4. Update backend code to use MongoDB

### Firebase Firestore

1. Create Firebase project
2. Enable Firestore
3. Install Firebase Admin SDK:
```bash
npm install firebase-admin
```

4. Update backend code to use Firestore

## Performance Optimization

### Frontend

1. **Enable gzip compression** in nginx or hosting platform
2. **Use CDN** for static assets
3. **Lazy loading** for components
4. **Code splitting** (already enabled by React)

### Backend

1. **Add caching** with Redis:
```bash
npm install redis
```

2. **Rate limiting** to prevent abuse:
```bash
npm install express-rate-limit
```

3. **Clustering** for better performance:
```bash
npm install cluster
```

## Monitoring and Analytics

### Frontend Analytics
- Google Analytics
- Mixpanel
- Amplitude

### Backend Monitoring
- New Relic
- DataDog
- Sentry for error tracking

## Backup and Recovery

### Database Backups
- Set up automated backups for MongoDB/Firebase
- Export data regularly
- Test restore procedures

### Code Backups
- Use Git for version control
- Regular commits and pushes
- Tag releases

## Security Considerations

1. **HTTPS only** in production
2. **CORS configuration** - restrict to your frontend domain
3. **Rate limiting** on API endpoints
4. **Input validation** and sanitization
5. **Environment variables** for sensitive data
6. **Regular security updates** for dependencies

## Scaling

### Horizontal Scaling
- Use load balancer (AWS ELB, Google Cloud Load Balancing)
- Multiple backend instances
- Session management with Redis

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching strategies

## Troubleshooting

### Common Issues

**CORS Errors:**
- Check backend CORS configuration
- Verify frontend API URL

**API Connection Failures:**
- Ensure backend is running
- Check firewall rules
- Verify environment variables

**Build Failures:**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Review build logs for errors

## Support

For issues and questions:
- GitHub Issues: https://github.com/wdranjeet/Couplehashtag/issues
- Documentation: README.md

## License

GNU General Public License v2.0
