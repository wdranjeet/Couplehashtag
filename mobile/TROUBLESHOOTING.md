# Troubleshooting Guide - AAB Build Issues

This guide helps you resolve common issues when building the AAB file.

## Table of Contents
- [Environment Issues](#environment-issues)
- [Build Errors](#build-errors)
- [Dependency Issues](#dependency-issues)
- [Signing Issues](#signing-issues)
- [Runtime Issues](#runtime-issues)
- [Store Upload Issues](#store-upload-issues)

---

## Environment Issues

### Java Not Found

**Error:**
```
Error: Java is not installed
JAVA_HOME is not set
```

**Solution:**
1. Install Java JDK 11 or 17:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install openjdk-17-jdk
   
   # macOS
   brew install openjdk@17
   
   # Windows - download from:
   # https://adoptium.net/
   ```

2. Set JAVA_HOME:
   ```bash
   # Linux/Mac - add to ~/.bashrc or ~/.zshrc
   export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
   export PATH=$JAVA_HOME/bin:$PATH
   
   # Windows - use System Environment Variables
   JAVA_HOME=C:\Program Files\Java\jdk-17
   ```

3. Verify:
   ```bash
   java -version
   javac -version
   ```

### Android SDK Not Found

**Error:**
```
SDK location not found
ANDROID_HOME is not set
```

**Solution:**
1. Install Android Studio from https://developer.android.com/studio

2. Set ANDROID_HOME:
   ```bash
   # Linux
   export ANDROID_HOME=$HOME/Android/Sdk
   
   # macOS
   export ANDROID_HOME=$HOME/Library/Android/sdk
   
   # Windows
   set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
   ```

3. Create `mobile/android/local.properties`:
   ```properties
   sdk.dir=/path/to/Android/Sdk
   ```

4. Verify SDK is installed:
   ```bash
   ls $ANDROID_HOME/platforms
   # Should show installed Android API levels
   ```

### Node.js Version Too Old

**Error:**
```
Error: This package requires Node.js version >=14
```

**Solution:**
Use nvm (Node Version Manager):
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest LTS
nvm install --lts
nvm use --lts
```

---

## Build Errors

### Gradle Build Failed

**Error:**
```
FAILURE: Build failed with an exception.
```

**Solutions:**

1. **Clean and rebuild:**
   ```bash
   cd mobile/android
   ./gradlew clean
   ./gradlew bundleRelease
   ```

2. **Delete Gradle cache:**
   ```bash
   rm -rf ~/.gradle/caches/
   cd mobile/android
   ./gradlew clean bundleRelease
   ```

3. **Check for network issues:**
   - Ensure you can access dl.google.com and jcenter
   - Check firewall/proxy settings
   - Try with VPN if in restricted network

4. **Update Gradle wrapper:**
   ```bash
   cd mobile/android
   ./gradlew wrapper --gradle-version=8.11.1
   ```

### Build Tools Not Found

**Error:**
```
Failed to find Build Tools revision X.X.X
```

**Solution:**
Install required build tools via Android Studio:
1. Open Android Studio
2. Tools → SDK Manager
3. SDK Tools tab
4. Check "Android SDK Build-Tools"
5. Click Apply

Or via command line:
```bash
sdkmanager "build-tools;34.0.0"
```

### Compilation Failed

**Error:**
```
Compilation failed; see the compiler error output for details.
```

**Solutions:**

1. Ensure frontend is built:
   ```bash
   cd frontend
   npm run build
   ```

2. Sync to Android:
   ```bash
   cd mobile
   npx cap sync android
   ```

3. Check for syntax errors in modified files

---

## Dependency Issues

### npm install Failed

**Error:**
```
npm ERR! code ELIFECYCLE
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Capacitor Version Mismatch

**Error:**
```
Capacitor version mismatch
```

**Solution:**
```bash
cd mobile
npm install @capacitor/core@latest @capacitor/cli@latest @capacitor/android@latest
npx cap sync android
```

---

## Signing Issues

### Keystore Not Found

**Error:**
```
Keystore file 'couplehashtag-release-key.jks' not found
```

**Solution:**
1. Verify keystore file path in `keystore.properties`
2. Use absolute path or ensure file is in correct directory:
   ```properties
   RELEASE_STORE_FILE=../couplehashtag-release-key.jks
   # or
   RELEASE_STORE_FILE=/full/path/to/couplehashtag-release-key.jks
   ```

### Wrong Keystore Password

**Error:**
```
Keystore was tampered with, or password was incorrect
```

**Solution:**
- Verify password in `keystore.properties`
- Ensure you're using the correct keystore file
- If password is truly lost, you must create a new keystore (but cannot update existing app)

### Key Alias Not Found

**Error:**
```
Alias 'couplehashtag-key' does not exist
```

**Solution:**
List aliases in keystore:
```bash
keytool -list -v -keystore couplehashtag-release-key.jks
```
Update alias in `keystore.properties` to match

---

## Runtime Issues

### App Crashes on Startup

**Possible Causes & Solutions:**

1. **Missing web assets:**
   ```bash
   cd mobile
   npm run build:frontend
   npm run sync
   cd android
   ./gradlew bundleRelease
   ```

2. **Permissions issue:**
   - Check AndroidManifest.xml for required permissions
   - Ensure INTERNET permission is included

3. **WebView issue:**
   - Test on device with Chrome/WebView updated
   - Check if app works in browser first

### White Screen After Launch

**Solution:**
1. Check if frontend built correctly:
   ```bash
   ls frontend/build/index.html
   ```

2. Verify capacitor.config.json webDir:
   ```json
   {
     "webDir": "../frontend/build"
   }
   ```

3. Re-sync:
   ```bash
   npx cap sync android
   ```

### Back Button Not Working

**Solution:**
This is expected behavior for web apps. Add back button handling in React if needed, or users can use in-app navigation.

---

## Store Upload Issues

### AAB Upload Failed

**Error:**
```
Upload failed: You need to use a different version code
```

**Solution:**
Increment version code in `build.gradle`:
```gradle
versionCode 2  // was 1
versionName "1.0.1"  // was "1.0.0"
```

### App Not Signed

**Error:**
```
Upload failed: APK or Android App Bundle file must be signed
```

**Solution:**
Ensure keystore is properly configured (see [Signing Issues](#signing-issues)) and rebuild.

### Package Name Conflict

**Error:**
```
You can't use this package name
```

**Solution:**
Change package name in:
1. `capacitor.config.json`:
   ```json
   {
     "appId": "com.yourcompany.couplehashtag"
   }
   ```

2. `android/app/build.gradle`:
   ```gradle
   applicationId "com.yourcompany.couplehashtag"
   ```

3. Rebuild Android project:
   ```bash
   cd mobile
   npx cap sync android
   ```

### Missing Privacy Policy

**Error:**
```
You must provide a privacy policy
```

**Solution:**
1. Create privacy policy document
2. Host it online (GitHub Pages, your website, etc.)
3. Add URL to app store listing

---

## Advanced Troubleshooting

### Enable Verbose Logging

```bash
cd mobile/android
./gradlew bundleRelease --stacktrace --info
```

### Check Gradle Daemon

```bash
# Stop all Gradle daemons
./gradlew --stop

# Rebuild
./gradlew bundleRelease
```

### Verify AAB Contents

```bash
# List contents
unzip -l app/build/outputs/bundle/release/app-release.aab

# Extract and inspect
unzip app/build/outputs/bundle/release/app-release.aab -d /tmp/aab-contents
ls -la /tmp/aab-contents
```

### Test AAB Locally with bundletool

```bash
# Download bundletool
wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar

# Generate APKs from AAB
java -jar bundletool-all-1.15.6.jar build-apks \
  --bundle=app/build/outputs/bundle/release/app-release.aab \
  --output=app.apks

# Install on connected device
java -jar bundletool-all-1.15.6.jar install-apks --apks=app.apks
```

---

## Getting Help

If you're still stuck:

1. **Check the documentation:**
   - [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md)
   - [QUICK_START.md](./QUICK_START.md)
   - [README.md](./README.md)

2. **Search for similar issues:**
   - GitHub Issues: https://github.com/wdranjeet/Couplehashtag/issues
   - Stack Overflow
   - Capacitor Community Forum

3. **Create an issue:**
   - Include error message
   - Include your environment details (OS, Node version, Java version)
   - Include steps to reproduce
   - Include relevant logs

4. **Common search terms:**
   - "Capacitor Android build error"
   - "AAB generation failed"
   - "Gradle build failed Android"

---

## Prevention Tips

1. **Keep dependencies updated:**
   ```bash
   npm outdated
   npm update
   ```

2. **Use consistent Node version:**
   - Use nvm to manage Node versions
   - Document which version is used

3. **Test on multiple devices:**
   - Different Android versions
   - Different screen sizes

4. **Regular backups:**
   - Keep keystore backed up securely
   - Version control all code

5. **Document your environment:**
   - Note Java version
   - Note Android SDK version
   - Note any special configuration

---

**Last Updated:** 2024
**Capacitor Version:** 7.4.3
**Gradle Version:** 8.11.1
