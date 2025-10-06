# Mobile Android App - Couple Hashtag Maker

This directory contains the Android mobile app version of Couple Hashtag Maker, built using Capacitor to wrap the React web app as a native Android application.

## 📱 What's Inside

- **Capacitor Configuration** - Converts the React web app to native Android
- **Android Project** - Native Android app with all necessary files for building AAB/APK
- **Build Scripts** - NPM scripts to automate the build process

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- Java JDK (v11 or v17)
- Android SDK
- Android Studio (recommended)

See [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md) for detailed setup instructions.

### Build AAB File

```bash
# 1. Install dependencies
npm install

# 2. Build frontend and sync to Android
npm run build:all

# 3. Build AAB
cd android
./gradlew bundleRelease
```

The AAB file will be at: `android/app/build/outputs/bundle/release/app-release.aab`

## 📚 Documentation

- **[AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md)** - Complete guide for generating AAB files and publishing to app stores
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference for common tasks

## 🛠️ Available NPM Scripts

```bash
npm run build:frontend  # Build the React frontend
npm run sync           # Sync web assets to Android project
npm run copy           # Copy assets without updating native dependencies
npm run update         # Update Capacitor Android platform
npm run open:android   # Open project in Android Studio
npm run build:all      # Build frontend and sync in one command
```

## 📦 Building for Production

1. **Create a keystore** (first time only):
   ```bash
   keytool -genkey -v -keystore couplehashtag-release-key.jks \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias couplehashtag-key
   ```

2. **Configure signing** (create `android/keystore.properties`):
   ```properties
   RELEASE_STORE_FILE=couplehashtag-release-key.jks
   RELEASE_STORE_PASSWORD=your_password
   RELEASE_KEY_ALIAS=couplehashtag-key
   RELEASE_KEY_PASSWORD=your_password
   ```

3. **Build signed AAB**:
   ```bash
   npm run build:all
   cd android
   ./gradlew bundleRelease
   ```

## 🏪 Publishing

The generated AAB file can be uploaded to:

- **Google Play Store** - https://play.google.com/console
- **Indus AppStore** - https://indusappstore.com/developer

See [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md) for detailed publishing instructions.

## 📱 App Details

- **App ID:** com.couplehashtag.app
- **App Name:** Couple Hashtag Maker
- **Version:** 1.0.0 (versionCode: 1)
- **Minimum SDK:** API 22 (Android 5.1)
- **Target SDK:** API 34 (Android 14)

## 🔄 Updating the App

When you make changes to the web app:

```bash
# 1. Make changes in frontend/
cd ../frontend
# ... make your changes ...
npm run build

# 2. Sync to mobile
cd ../mobile
npm run sync

# 3. Rebuild AAB
cd android
./gradlew bundleRelease
```

## 📁 Directory Structure

```
mobile/
├── android/                    # Native Android project
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── assets/     # Web app assets
│   │   │       ├── res/        # Android resources (icons, etc.)
│   │   │       └── AndroidManifest.xml
│   │   └── build.gradle        # App-level Gradle config
│   ├── gradle/                 # Gradle wrapper
│   ├── build.gradle            # Project-level Gradle config
│   └── gradlew                 # Gradle wrapper script
├── capacitor.config.json       # Capacitor configuration
├── package.json                # NPM dependencies and scripts
├── AAB_BUILD_GUIDE.md          # Comprehensive AAB build guide
└── README.md                   # This file
```

## 🐛 Troubleshooting

### Common Issues

1. **"SDK location not found"**
   - Create `android/local.properties` with: `sdk.dir=/path/to/Android/Sdk`

2. **"JAVA_HOME not set"**
   - Set JAVA_HOME environment variable to your JDK installation

3. **"Build failed"**
   - Ensure frontend is built: `npm run build:frontend`
   - Clean and rebuild: `cd android && ./gradlew clean bundleRelease`

See [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md#troubleshooting) for more solutions.

## 🔗 Related Documentation

- [Main README](../README.md) - Project overview
- [Frontend README](../frontend/README.md) - Web app documentation
- [Capacitor Docs](https://capacitorjs.com/docs) - Official Capacitor documentation
- [Android Developer Guide](https://developer.android.com/guide) - Android development

## 📄 License

GNU General Public License v2.0 - See [LICENSE](../LICENSE) file

## 💖 Support

For issues or questions:
- GitHub Issues: https://github.com/wdranjeet/Couplehashtag/issues
- Check the troubleshooting section in [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md)

---

Made with ❤️ for couples everywhere!
