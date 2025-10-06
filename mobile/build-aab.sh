#!/bin/bash
# Build script for generating AAB file for Couple Hashtag Maker

set -e  # Exit on error

echo "=========================================="
echo "Couple Hashtag Maker - AAB Build Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Step 1: Check prerequisites
echo -e "${YELLOW}Step 1: Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js v14 or higher"
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo -e "${RED}Error: Java is not installed${NC}"
    echo "Please install Java JDK 11 or 17"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node --version)${NC}"
echo -e "${GREEN}✓ Java version: $(java -version 2>&1 | head -n 1)${NC}"
echo ""

# Step 2: Install mobile dependencies
echo -e "${YELLOW}Step 2: Installing mobile dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi
echo ""

# Step 3: Build frontend
echo -e "${YELLOW}Step 3: Building React frontend...${NC}"
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

npm run build
cd ../mobile
echo -e "${GREEN}✓ Frontend built successfully${NC}"
echo ""

# Step 4: Sync to Android
echo -e "${YELLOW}Step 4: Syncing web assets to Android...${NC}"
npx cap sync android
echo -e "${GREEN}✓ Assets synced successfully${NC}"
echo ""

# Step 5: Build AAB
echo -e "${YELLOW}Step 5: Building Android App Bundle (AAB)...${NC}"
cd android

# Check if gradlew is executable
if [ ! -x "./gradlew" ]; then
    chmod +x ./gradlew
fi

# Clean and build
./gradlew clean
./gradlew bundleRelease

echo -e "${GREEN}✓ AAB built successfully${NC}"
echo ""

# Step 6: Show output location
AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_PATH" ]; then
    AAB_SIZE=$(ls -lh "$AAB_PATH" | awk '{print $5}')
    echo "=========================================="
    echo -e "${GREEN}SUCCESS! AAB file generated${NC}"
    echo "=========================================="
    echo ""
    echo "Location: mobile/android/$AAB_PATH"
    echo "Size: $AAB_SIZE"
    echo ""
    echo "This file can be uploaded to:"
    echo "  - Google Play Store"
    echo "  - Indus AppStore"
    echo ""
    echo "For publishing instructions, see:"
    echo "  mobile/AAB_BUILD_GUIDE.md"
    echo ""
else
    echo -e "${RED}Error: AAB file not found${NC}"
    exit 1
fi
