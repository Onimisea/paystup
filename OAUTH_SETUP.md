# OAuth Setup Guide for Paystup

This guide will help you set up Google and Apple OAuth authentication for the Paystup application.

## Prerequisites

- A Google Cloud Console account
- An Apple Developer account
- Better Auth already configured (✅ Already done)

## Google OAuth Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: `Paystup`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`, `openid`
5. Add test users if needed

### 3. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Copy the Client ID and Client Secret

## Apple OAuth Setup

### 1. Create an App ID

1. Go to [Apple Developer Console](https://developer.apple.com/account/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Create a new App ID with Sign in with Apple capability

### 2. Create a Services ID

1. Create a new Services ID
2. Enable "Sign in with Apple"
3. Configure the service:
   - Primary App ID: Select the App ID created above
   - Domains and Subdomains: `localhost:3000`, `yourdomain.com`
   - Return URLs: 
     - `http://localhost:3000/api/auth/callback/apple` (development)
     - `https://yourdomain.com/api/auth/callback/apple` (production)

### 3. Create a Private Key

1. Create a new Key with "Sign in with Apple" capability
2. Download the private key file (.p8)
3. Note the Key ID

### 4. Get Team ID

1. Go to "Membership" in Apple Developer Console
2. Copy your Team ID

## Environment Variables

Update your `.env.local` file with the following:

```env
# Better Auth (Already configured)
BETTER_AUTH_SECRET=GjopJaPG6KNkWqm8KBYLha8t6Szac0xW
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Apple OAuth
APPLE_CLIENT_ID=your-apple-services-id-here
APPLE_CLIENT_SECRET=your-apple-client-secret-here
```

## Apple Client Secret Generation

Apple requires a JWT token as the client secret. You'll need to generate this using:
- Your private key (.p8 file)
- Key ID
- Team ID
- Services ID

You can use online JWT generators or create a script to generate this token.

## Testing OAuth Integration

1. Start your development server: `npm run dev`
2. Navigate to `/auth/signup`
3. Click on "Continue with Google" or "Continue with Apple"
4. Check the browser console for detailed logging
5. Verify successful authentication and redirect to dashboard

## Troubleshooting

### Common Issues:

1. **Redirect URI Mismatch**: Ensure your redirect URIs match exactly
2. **Invalid Client Secret**: For Apple, ensure your JWT token is correctly generated
3. **Scope Issues**: Make sure you have the correct scopes configured
4. **CORS Issues**: Ensure your domains are properly configured

### Debug Logging

The application includes comprehensive console logging for OAuth flows:
- OAuth attempt logs
- Success/failure logs
- Error details
- Redirect information

Check the browser console for detailed information during testing.

## Production Deployment

When deploying to production:

1. Update redirect URIs in Google/Apple consoles
2. Update environment variables with production URLs
3. Ensure HTTPS is enabled
4. Test OAuth flows in production environment

## Security Notes

- Never commit OAuth credentials to version control
- Use environment variables for all sensitive data
- Regularly rotate OAuth secrets
- Monitor OAuth usage and logs
