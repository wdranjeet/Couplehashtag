# App Store Submission Checklist

Use this checklist to ensure you have everything ready before submitting to Google Play Store or Indus AppStore.

## Pre-Build Checklist

### App Details
- [ ] App name finalized: "Couple Hashtag Maker"
- [ ] App package ID: `com.couplehashtag.app`
- [ ] Current version code: 1
- [ ] Current version name: 1.0.0

### Code Preparation
- [ ] Frontend built with production settings
- [ ] All features tested on web version
- [ ] No console errors or warnings in production build
- [ ] PWA manifest is properly configured
- [ ] Service worker is functioning correctly

### Android App Configuration
- [ ] App name is correct in `mobile/android/app/src/main/res/values/strings.xml`
- [ ] Package name matches across all files
- [ ] Version code and version name are set in `build.gradle`
- [ ] Minimum SDK version is appropriate (currently API 22 / Android 5.1)
- [ ] Target SDK version is latest stable (currently API 34 / Android 14)

## Build Checklist

### Keystore Setup (Production Only)
- [ ] Release keystore created and stored securely
- [ ] Keystore password documented (in password manager)
- [ ] Key alias and password documented
- [ ] Keystore backed up in secure location
- [ ] **IMPORTANT:** Never commit keystore to version control

### Build Process
- [ ] Frontend dependencies installed (`cd frontend && npm install`)
- [ ] Frontend built successfully (`npm run build`)
- [ ] Mobile dependencies installed (`cd mobile && npm install`)
- [ ] Assets synced to Android (`npm run sync`)
- [ ] Gradle build successful (`cd android && ./gradlew bundleRelease`)
- [ ] AAB file generated at `mobile/android/app/build/outputs/bundle/release/app-release.aab`
- [ ] AAB file is signed (for production release)

### Testing
- [ ] AAB tested using Google Play Console's internal testing track
- [ ] App tested on at least 2 different Android devices/emulators
- [ ] All core features work:
  - [ ] Hashtag generation
  - [ ] Copy to clipboard
  - [ ] Social sharing
  - [ ] Navigation between pages
- [ ] No crashes or ANRs (Application Not Responding)
- [ ] App launches quickly (< 3 seconds)
- [ ] UI displays correctly on different screen sizes
- [ ] Back button navigation works properly

## App Store Assets

### App Icon
- [ ] App icon created (512x512 PNG, high quality)
- [ ] Icon follows platform guidelines (no text, clear branding)
- [ ] All icon sizes generated for Android
- [ ] Icon displayed correctly in app

### Screenshots
Minimum required: 2 screenshots for phones

**Phone Screenshots (Required):**
- [ ] Screenshot 1: Main hashtag generation screen
- [ ] Screenshot 2: Generated hashtags with copy/share options
- [ ] Screenshots are high quality (1080x1920 or higher)
- [ ] Screenshots show the app's key features
- [ ] No personal/sensitive information visible

**Tablet Screenshots (Recommended):**
- [ ] Tablet screenshot 1
- [ ] Tablet screenshot 2
- [ ] Screenshots are appropriate size (1200x1920 or higher)

**Tips:**
- Use actual device screenshots or high-quality emulator screenshots
- Show the app in use with realistic data
- Highlight the main features
- Keep UI clean and professional

### Promotional Graphics

**Feature Graphic (Required for Google Play):**
- [ ] Created: 1024x500 PNG/JPEG
- [ ] Shows app branding and key feature
- [ ] Text is readable
- [ ] Follows Google Play guidelines

**Promo Video (Optional but recommended):**
- [ ] 30-60 second video created
- [ ] Shows app features and usage
- [ ] Uploaded to YouTube
- [ ] YouTube URL added to store listing

## Store Listing Information

### Google Play Store

**Basic Information:**
- [ ] App name (max 30 characters): "Couple Hashtag Maker"
- [ ] Short description (max 80 characters): "Create unique couple hashtags for weddings, love stories & social media"
- [ ] Full description written (max 4000 characters)
- [ ] Category selected: Tools or Social
- [ ] Tags added: hashtag, wedding, couple, social media, love

**Full Description Template:**
```
Generate creative and unique couple name hashtags for weddings, engagements, and love stories!

✨ FEATURES:
• Smart hashtag generation from two names
• 30+ unique hashtag variations
• One-click copy to clipboard
• Direct sharing to Instagram, WhatsApp, Twitter/X
• Beautiful, easy-to-use interface

💕 PERFECT FOR:
• Wedding hashtags
• Engagement announcements
• Couple social media profiles
• Anniversary celebrations
• Love stories

🎯 HOW IT WORKS:
1. Enter your names
2. Get instant hashtag suggestions
3. Copy your favorites
4. Share on social media

100% free to use. No ads. No registration required.

Made with ❤️ for couples everywhere!
```

**Contact Details:**
- [ ] Email address provided
- [ ] Phone number (optional)
- [ ] Website URL (if available)
- [ ] Privacy policy URL

**Store Listing Graphics:**
- [ ] App icon uploaded
- [ ] Feature graphic uploaded
- [ ] Phone screenshots uploaded (minimum 2)
- [ ] Tablet screenshots uploaded (optional but recommended)
- [ ] Promo video added (optional)

### Content Rating
- [ ] Content rating questionnaire completed
- [ ] Appropriate rating received (likely Everyone)
- [ ] Rating certificate generated

### Privacy & Security

**Privacy Policy:**
- [ ] Privacy policy document created
- [ ] Privacy policy hosted online (URL accessible)
- [ ] Privacy policy URL added to app listing
- [ ] Privacy policy covers:
  - [ ] What data is collected (if any)
  - [ ] How data is used
  - [ ] Data sharing practices
  - [ ] User rights
  - [ ] Contact information

**Data Safety:**
- [ ] Data safety form completed in Play Console
- [ ] Declared what data is collected
- [ ] Explained how data is used
- [ ] Listed security practices

**Permissions:**
- [ ] Only necessary permissions requested
- [ ] Permissions explained in description
- [ ] No sensitive permissions without justification

## Google Play Console Setup

### App Details
- [ ] App created in Play Console
- [ ] Default language set
- [ ] App name and description added
- [ ] Category selected
- [ ] Tags/keywords added

### Store Settings
- [ ] App availability: Countries selected
- [ ] Pricing: Free (or set price)
- [ ] Content rating completed
- [ ] Target audience selected
- [ ] Store listing completed

### Release Management
- [ ] Internal testing track set up (recommended first)
- [ ] Alpha/Beta track configured (optional)
- [ ] Production track ready
- [ ] Release notes prepared

**Release Notes Template (Version 1.0.0):**
```
🎉 Initial Release

Welcome to Couple Hashtag Maker! 

Features:
• Generate 30+ unique couple hashtag variations
• One-click copy to clipboard
• Direct social sharing
• Beautiful, intuitive interface

Perfect for weddings, engagements, and love stories!
```

### App Signing
- [ ] Google Play App Signing enabled (recommended)
- [ ] Upload key uploaded to Play Console
- [ ] Or: App signing key managed manually

## Indus AppStore Setup

### Basic Information
- [ ] Developer account created
- [ ] App name registered
- [ ] App description written
- [ ] Category selected
- [ ] Screenshots uploaded

### Submission
- [ ] AAB file uploaded
- [ ] Metadata completed
- [ ] Privacy policy provided
- [ ] Terms of service agreed
- [ ] Submitted for review

## Legal & Compliance

### Terms & Policies
- [ ] Terms of Service created (if applicable)
- [ ] Privacy Policy created and accessible
- [ ] Copyright and licensing information clear
- [ ] Open source licenses acknowledged (React, Bootstrap, etc.)

### Content Compliance
- [ ] App doesn't violate platform policies
- [ ] No inappropriate content
- [ ] No misleading information
- [ ] No copyright infringement
- [ ] Follows platform content guidelines

## Pre-Submission Final Checks

### Technical
- [ ] App builds successfully
- [ ] AAB file is signed (for production)
- [ ] App size is reasonable (< 50 MB recommended)
- [ ] App tested on multiple devices
- [ ] No critical bugs
- [ ] Performance is acceptable

### Store Listing
- [ ] All required fields completed
- [ ] No typos in description
- [ ] Screenshots are high quality
- [ ] Icon looks good
- [ ] All links work

### Legal
- [ ] Privacy policy accessible
- [ ] All required disclosures made
- [ ] Appropriate content rating
- [ ] Compliance with all policies

## Submission Process

### Google Play Store
1. [ ] Log into Google Play Console
2. [ ] Select your app
3. [ ] Go to Production > Releases
4. [ ] Create new release
5. [ ] Upload AAB file
6. [ ] Fill in release notes
7. [ ] Review release details
8. [ ] Roll out to production (or start with internal/beta testing)
9. [ ] Submit for review

**Expected Timeline:** 1-7 days for review

### Indus AppStore
1. [ ] Log into Indus AppStore Developer Console
2. [ ] Create new app submission
3. [ ] Upload AAB file
4. [ ] Complete all metadata
5. [ ] Submit for review

**Expected Timeline:** Varies (check their guidelines)

## Post-Submission

### Monitoring
- [ ] Check review status daily
- [ ] Respond to reviewer questions promptly
- [ ] Monitor crash reports (if available)
- [ ] Check user reviews

### After Approval
- [ ] App is live - verify in store
- [ ] Test downloading and installing
- [ ] Share announcement on social media
- [ ] Add store badge to website
- [ ] Monitor user feedback
- [ ] Prepare for future updates

## Update Checklist (For Future Releases)

When releasing an update:
- [ ] Update version code (increment by 1)
- [ ] Update version name (e.g., 1.0.0 → 1.1.0)
- [ ] Update release notes
- [ ] Test all changes thoroughly
- [ ] Build new AAB
- [ ] Upload to appropriate track (internal/beta/production)
- [ ] Submit for review

## Resources

### Documentation
- [AAB_BUILD_GUIDE.md](./AAB_BUILD_GUIDE.md) - Build instructions
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [README.md](./README.md) - Mobile directory overview

### External Resources
- [Google Play Console](https://play.google.com/console)
- [Google Play Policies](https://support.google.com/googleplay/android-developer/answer/9867159)
- [Android App Bundle Documentation](https://developer.android.com/guide/app-bundle)
- [Indus AppStore](https://indusappstore.com)

## Notes

**Important Reminders:**
- Always test on real devices before submitting
- Keep your keystore file SECURE and BACKED UP
- You cannot recover a lost keystore - it's needed for all future updates
- Start with internal testing track to catch issues early
- Monitor user reviews and respond professionally
- Keep app updated with bug fixes and improvements

**Common Rejection Reasons:**
- Missing privacy policy
- Crashes on startup
- Misleading description or screenshots
- Policy violations
- Broken core functionality

**Tips for Success:**
- High-quality screenshots make a big difference
- Clear, concise app description
- Responsive to user feedback
- Regular updates show active maintenance
- Professional communication with reviewers

---

Good luck with your app submission! 🚀
