# 🔐 Google OAuth Setup Guide

## 📋 **Step-by-Step Setup**

### **1. Create Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `Paystup Auth`
4. Click "Create"

### **2. Enable Google+ API**

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"
4. Alternatively, search for "Google Identity" and enable that

### **3. Configure OAuth Consent Screen**

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" (for testing)
3. Fill in required fields:
   - **App name**: `Paystup`
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click "Save and Continue"
5. Skip "Scopes" for now
6. Add test users (your email) in "Test users"
7. Click "Save and Continue"

### **4. Create OAuth 2.0 Credentials**

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Set name: `Paystup Web Client`
5. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Click "Create"
7. **Copy the Client ID and Client Secret**

### **5. Update Environment Variables**

Replace in your `.env.local`:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

### **6. Test OAuth Flow**

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/auth/signup`

3. Click "Continue with Google"

4. You should be redirected to Google's OAuth consent screen

## 🔧 **Current Integration Status**

### **✅ What's Already Working:**
- Better Auth Google OAuth configuration
- OAuth buttons in signup page
- Proper redirect URLs
- Error handling and loading states
- Success/error callbacks

### **✅ OAuth Flow:**
```
User clicks "Continue with Google"
    ↓
Redirects to Google OAuth
    ↓
User grants permissions
    ↓
Google redirects to: /api/auth/callback/google
    ↓
Better Auth processes the callback
    ↓
User is signed up and redirected to /dashboard
```

### **✅ Features:**
- Automatic user creation
- Session management
- Profile data from Google (name, email, image)
- Secure token handling
- PKCE security

## 🚨 **Important Notes**

### **Redirect URI:**
- **Development**: `http://localhost:3000/api/auth/callback/google`
- **Production**: `https://yourdomain.com/api/auth/callback/google`

### **Security:**
- Never commit OAuth credentials to version control
- Use different credentials for development and production
- Keep client secret secure

### **Testing:**
- Add your email as a test user in Google Cloud Console
- OAuth will only work for test users until app is verified

## 🎯 **Next Steps After Setup**

1. **Test the flow**:
   - Visit signup page
   - Click Google OAuth button
   - Complete Google authorization
   - Verify redirect to dashboard

2. **Production setup**:
   - Create production Google Cloud project
   - Update redirect URIs for production domain
   - Submit app for verification (if needed)

3. **Optional enhancements**:
   - Add profile picture handling
   - Implement account linking
   - Add additional OAuth scopes

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"redirect_uri_mismatch"**:
   - Check redirect URI in Google Cloud Console
   - Ensure it matches exactly: `http://localhost:3000/api/auth/callback/google`

2. **"access_denied"**:
   - Add your email as test user
   - Check OAuth consent screen configuration

3. **"invalid_client"**:
   - Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
   - Restart development server after updating .env.local

4. **OAuth button not working**:
   - Check browser console for errors
   - Verify Better Auth configuration
   - Check network tab for failed requests

## ✅ **Ready to Test!**

Once you've completed the setup:

1. Update `.env.local` with real credentials
2. Restart the dev server
3. Visit `http://localhost:3000/auth/signup`
4. Click "Continue with Google"
5. Complete the OAuth flow

Your Google OAuth signup should now work perfectly! 🎉
