# Quick Start Guide - Build AAB File

This is a condensed guide for quickly building an AAB file. For detailed instructions, see [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md).

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] Java JDK installed (v11 or v17)
- [ ] Android SDK installed
- [ ] ANDROID_HOME environment variable set

## Fast Track: Build AAB in 5 Steps

### 1. Install Dependencies
```bash
cd mobile
npm install
```

### 2. Build Frontend
```bash
npm run build:frontend
```

### 3. Sync to Android
```bash
npm run sync
```

### 4. Build AAB
```bash
cd android
./gradlew bundleRelease
```

### 5. Get Your AAB
The AAB file is at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## One-Command Build

```bash
cd mobile
npm run build:all && cd android && ./gradlew bundleRelease
```

## For Production Release

### First Time: Create Keystore
```bash
cd android
keytool -genkey -v -keystore couplehashtag-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias couplehashtag-key
```

### Configure Signing

Create `android/keystore.properties`:
```properties
RELEASE_STORE_FILE=couplehashtag-release-key.jks
RELEASE_STORE_PASSWORD=your_password_here
RELEASE_KEY_ALIAS=couplehashtag-key
RELEASE_KEY_PASSWORD=your_password_here
```

**Important:** Add `keystore.properties` to `.gitignore`!

Add to `android/app/build.gradle` (before `android {}`):
```gradle
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
            // ... rest of config ...
        }
    }
}
```

### Build Signed AAB
```bash
./gradlew bundleRelease
```

## Publishing Checklist

### Google Play Store
- [ ] Create developer account ($25 fee)
- [ ] Prepare app screenshots (phone & tablet)
- [ ] Write app description
- [ ] Create privacy policy
- [ ] Upload AAB file
- [ ] Submit for review

### Indus AppStore
- [ ] Create developer account
- [ ] Upload same AAB file
- [ ] Provide metadata
- [ ] Submit for review

## Common Commands

```bash
# Build everything
npm run build:all

# Open in Android Studio
npm run open:android

# Just sync (no rebuild)
npm run sync

# Clean build
cd android
./gradlew clean bundleRelease
```

## Troubleshooting Quick Fixes

### Build Failed?
```bash
cd ../frontend
npm run build
cd ../mobile
npm run sync
cd android
./gradlew clean bundleRelease
```

### SDK Not Found?
Create `android/local.properties`:
```properties
sdk.dir=/path/to/Android/Sdk
```

### JAVA_HOME Error?
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

## Next Steps

1. ✅ Build AAB file
2. 📱 Test on device using Google Play Console internal testing
3. 📝 Complete store listings
4. 🚀 Submit for review
5. 🎉 Publish!

## Need More Help?

See the comprehensive guide: [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md)

---

**Quick Reference:**
- App ID: `com.couplehashtag.app`
- AAB Location: `android/app/build/outputs/bundle/release/app-release.aab`
- Min SDK: 22 (Android 5.1)
- Target SDK: 34 (Android 14)
