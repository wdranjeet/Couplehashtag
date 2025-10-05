#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Couple Hashtag Maker...${NC}"

# Check if node_modules exist in backend
if [ ! -d "backend/node_modules" ]; then
    echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
    cd backend && npm install && cd ..
fi

# Check if node_modules exist in frontend
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
    cd frontend && npm install && cd ..
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo -e "${BLUE}Starting backend server...${NC}"

# Start backend in background
cd backend && npm start &
BACKEND_PID=$!

echo -e "${GREEN}✓ Backend started on port 5000${NC}"
echo -e "${BLUE}Starting frontend server...${NC}"

# Give backend time to start
sleep 3

# Start frontend
cd ../frontend && npm start

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
