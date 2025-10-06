# AAB Build Guide - Couple Hashtag Maker Android App

This guide explains how to generate an Android App Bundle (AAB) file for publishing the Couple Hashtag Maker app on Google Play Store and Indus AppStore.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Build Instructions](#detailed-build-instructions)
- [Generating Signed AAB for Production](#generating-signed-aab-for-production)
- [Publishing to App Stores](#publishing-to-app-stores)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before building the AAB file, ensure you have the following installed:

### Required Software
1. **Node.js** (v14 or higher)
   ```bash
   node --version  # Should be v14+
   ```

2. **Java Development Kit (JDK)** (version 11 or 17)
   ```bash
   java -version   # Should be 11 or 17
   javac -version
   ```
   
   **Installation:**
   - **Ubuntu/Debian:**
     ```bash
     sudo apt update
     sudo apt install openjdk-17-jdk
     ```
   - **macOS:**
     ```bash
     brew install openjdk@17
     ```
   - **Windows:**
     Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [Adoptium](https://adoptium.net/)

3. **Android Studio** (recommended) or **Android Command Line Tools**
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API Level 34 or latest)
   - Set up ANDROID_HOME environment variable

4. **Gradle** (Usually comes with Android Studio)
   ```bash
   gradle --version
   ```

### Environment Variables Setup

Add these to your `~/.bashrc`, `~/.zshrc`, or Windows Environment Variables:

```bash
export ANDROID_HOME=$HOME/Android/Sdk  # Linux/Mac
# or for Windows: C:\Users\YourUsername\AppData\Local\Android\Sdk

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64  # Adjust path as needed
```

After adding, reload your shell:
```bash
source ~/.bashrc  # or source ~/.zshrc
```

## Quick Start

### Step 1: Install Dependencies

```bash
# From the mobile directory
cd mobile
npm install
```

### Step 2: Build the React Frontend

```bash
# Build the web app first
npm run build:frontend
```

This will create an optimized production build in `frontend/build/`

### Step 3: Sync to Android

```bash
# Copy web assets to Android project
npm run sync
```

### Step 4: Generate AAB

```bash
# Navigate to Android directory
cd android

# Build unsigned AAB (for testing)
./gradlew bundleRelease
```

The AAB file will be created at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## Detailed Build Instructions

### Option 1: Build via Command Line (Recommended)

1. **Navigate to the mobile directory:**
   ```bash
   cd /path/to/Couplehashtag/mobile
   ```

2. **Build everything in one command:**
   ```bash
   npm run build:all
   ```

3. **Build the AAB:**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   
   On Windows:
   ```cmd
   gradlew.bat bundleRelease
   ```

4. **Locate your AAB file:**
   ```
   mobile/android/app/build/outputs/bundle/release/app-release.aab
   ```

### Option 2: Build via Android Studio

1. **Open Android Studio**

2. **Open the Android project:**
   - File → Open
   - Navigate to `mobile/android/`
   - Click OK

3. **Wait for Gradle sync to complete**

4. **Build the AAB:**
   - Build → Generate Signed Bundle / APK
   - Select "Android App Bundle"
   - Click Next

5. **For unsigned build (testing only):**
   - Build → Build Bundle(s) / APK(s) → Build Bundle(s)

6. **Find the AAB:**
   - The file will be at `app/build/outputs/bundle/release/app-release.aab`

## Generating Signed AAB for Production

To publish on Google Play Store or Indus AppStore, you need a **signed** AAB file.

### Step 1: Create a Keystore

**IMPORTANT:** Keep your keystore file safe! You'll need it for all future updates.

```bash
# Navigate to mobile/android directory
cd mobile/android

# Generate keystore
keytool -genkey -v -keystore couplehashtag-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias couplehashtag-key
```

You'll be prompted to enter:
- Keystore password (remember this!)
- Key password (remember this!)
- Your details (name, organization, etc.)

### Step 2: Store Keystore Credentials Securely

**Option A: Using keystore.properties (Local Development)**

Create `mobile/android/keystore.properties`:

```properties
RELEASE_STORE_FILE=couplehashtag-release-key.jks
RELEASE_STORE_PASSWORD=your_keystore_password
RELEASE_KEY_ALIAS=couplehashtag-key
RELEASE_KEY_PASSWORD=your_key_password
```

**IMPORTANT:** Add `keystore.properties` to `.gitignore` to avoid committing secrets!

Update `mobile/android/app/build.gradle` to load the keystore properties:

```gradle
// Add this at the top of the file, before android {}
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...
    
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                storeFile file(keystoreProperties['RELEASE_STORE_FILE'])
                storePassword keystoreProperties['RELEASE_STORE_PASSWORD']
                keyAlias keystoreProperties['RELEASE_KEY_ALIAS']
                keyPassword keystoreProperties['RELEASE_KEY_PASSWORD']
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            // ... other release settings ...
        }
    }
}
```

**Option B: Using Environment Variables (CI/CD)**

Set environment variables:
```bash
export RELEASE_STORE_FILE=/path/to/couplehashtag-release-key.jks
export RELEASE_STORE_PASSWORD=your_keystore_password
export RELEASE_KEY_ALIAS=couplehashtag-key
export RELEASE_KEY_PASSWORD=your_key_password
```

### Step 3: Build Signed AAB

```bash
cd mobile/android
./gradlew bundleRelease
```

The **signed** AAB will be at:
```
mobile/android/app/build/outputs/bundle/release/app-release.aab
```

### Step 4: Verify the AAB

```bash
# Check the AAB file
unzip -l app/build/outputs/bundle/release/app-release.aab

# Or use bundletool (optional)
java -jar bundletool.jar validate --bundle=app/build/outputs/bundle/release/app-release.aab
```

## Publishing to App Stores

### Google Play Store

1. **Create a Google Play Developer Account**
   - Go to https://play.google.com/console
   - Pay the one-time $25 registration fee

2. **Create a New App**
   - Click "Create app"
   - Fill in app details:
     - App name: "Couple Hashtag Maker"
     - Default language: English (or your preference)
     - App or game: App
     - Free or paid: Free

3. **Complete Store Listing**
   - App details
   - Graphics (screenshots, icon, feature graphic)
   - Categorization
   - Contact details
   - Privacy policy

4. **Set Up App Content**
   - Complete the questionnaire
   - Provide privacy policy URL
   - Set up content rating

5. **Upload AAB**
   - Go to Production → Releases
   - Create new release
   - Upload `app-release.aab`
   - Add release notes
   - Review and rollout

6. **Submit for Review**
   - Google typically reviews apps within 1-7 days

### Indus AppStore

1. **Create Indus AppStore Developer Account**
   - Visit: https://indusappstore.com/developer
   - Complete registration

2. **Submit Your App**
   - Follow their submission guidelines
   - Upload the same `app-release.aab` file
   - Provide required metadata and screenshots

3. **Wait for Approval**
   - Review process may take a few days

## App Version Management

When you need to release an update:

1. **Update version in `mobile/android/app/build.gradle`:**
   ```gradle
   defaultConfig {
       versionCode 2        // Increment by 1
       versionName "1.1.0"  // Update version name
   }
   ```

2. **Rebuild and sync:**
   ```bash
   cd mobile
   npm run build:all
   cd android
   ./gradlew bundleRelease
   ```

3. **Upload new AAB to Play Store**

## Icon and Splash Screen

### App Icon

Default icons are located at:
```
mobile/android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

Replace these with your custom icons (different sizes).

**Recommended Tool:** Use Android Studio's Image Asset Studio:
- Right-click on `res` folder → New → Image Asset
- Select icon type: Launcher Icons (Adaptive and Legacy)
- Upload your source image (512x512 PNG recommended)

### Splash Screen

The app uses Capacitor's splash screen. Configure in `mobile/capacitor.config.json`:

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#ffeef8",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": false
    }
  }
}
```

## Troubleshooting

### Issue: "JAVA_HOME is not set"

**Solution:**
```bash
# Find Java installation
which java

# Set JAVA_HOME (example for Linux)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

### Issue: "SDK location not found"

**Solution:**
Create `mobile/android/local.properties`:
```properties
sdk.dir=/path/to/Android/Sdk
```

### Issue: "Gradle sync failed"

**Solution:**
```bash
cd mobile/android
./gradlew clean
./gradlew bundleRelease
```

### Issue: "Build failed with compilation errors"

**Solution:**
1. Check that frontend is built: `cd frontend && npm run build`
2. Sync again: `cd mobile && npm run sync`
3. Clean and rebuild: `cd android && ./gradlew clean bundleRelease`

### Issue: "Unsigned AAB cannot be uploaded"

**Solution:**
You must sign the AAB using a keystore. See [Generating Signed AAB for Production](#generating-signed-aab-for-production)

### Issue: "Capacitor not found"

**Solution:**
```bash
cd mobile
npm install
```

### Issue: "Build folder not found"

**Solution:**
Make sure you build the frontend first:
```bash
cd frontend
npm install
npm run build
```

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android App Bundles](https://developer.android.com/guide/app-bundle)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Indus AppStore Guidelines](https://indusappstore.com/guidelines)

## Security Best Practices

1. **Never commit your keystore file** to version control
2. **Keep keystore passwords secure** - use a password manager
3. **Backup your keystore** - store it safely (you can't recover it if lost)
4. **Use different keystores** for debug and release builds
5. **Enable Play App Signing** in Google Play Console for added security

## Build Checklist

Before submitting to app stores:

- [ ] Frontend is built with production settings
- [ ] Version code and version name are updated
- [ ] App icons are properly set (all sizes)
- [ ] Splash screen is configured
- [ ] AAB is signed with release keystore
- [ ] AAB is tested on a physical device (using internal test track)
- [ ] Privacy policy is available and linked
- [ ] Screenshots are prepared (phone and tablet)
- [ ] Store listing is complete
- [ ] Content rating is set up
- [ ] App is tested thoroughly

## Support

For issues or questions:
- GitHub Issues: https://github.com/wdranjeet/Couplehashtag/issues
- Documentation: Check README.md and other docs in the repository

---

**Happy Publishing! 🚀**

Made with ❤️ for couples everywhere!
