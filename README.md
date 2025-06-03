# Paystup - Global P2P Money Transfer Platform

<div align="center">
  <h3>🌍 Send Money Globally with Local Payments</h3>
  <p>A modern, secure, and user-friendly peer-to-peer money transfer platform that uses local payments in both sender and receiver countries — no direct international banking involved.</p>

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/React%20Query-5.80.2-red?style=flat-square&logo=react-query)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.5-orange?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.2.8-green?style=flat-square)](https://better-auth.com/)
[![Axios](https://img.shields.io/badge/Axios-1.9.0-purple?style=flat-square&logo=axios)](https://axios-http.com/)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [🔧 Configuration](#-configuration)
- [🌐 Internationalization](#-internationalization)
- [🔐 Authentication](#-authentication)
- [📡 API Client](#-api-client)
- [💳 Send Money Flow](#-send-money-flow)
- [📊 Dashboard](#-dashboard)
- [🆘 Help Center](#-help-center)
- [🎨 UI Components](#-ui-components)
- [📱 Responsive Design](#-responsive-design)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## 🌟 Features

### 💸 Core Money Transfer Features

- **Global Money Transfers**: Send money to 50+ countries worldwide
- **Local Payment Networks**: Uses local banking systems for faster, cheaper transfers
- **Real-time Exchange Rates**: Live currency conversion with competitive rates
- **Multiple Payment Methods**: Bank transfers, mobile money, cash pickup
- **Transaction Tracking**: Real-time status updates and notifications

### 🔐 Security & Compliance

- **Bank-level Security**: End-to-end encryption and secure data handling
- **KYC Verification**: Identity verification for regulatory compliance
- **Better Auth Integration**: Secure authentication with Google/Apple OAuth
- **Session Management**: Secure session handling with automatic timeout

### 🌍 International Support

- **14 Languages**: Complete localization for global users
  - English, French, Portuguese, Arabic, Swahili
  - Hindi, Mandarin Chinese, Urdu, Bengali, Indonesian
  - Punjabi, Japanese, Vietnamese, Marathi
- **RTL Support**: Right-to-left layout for Arabic script languages
- **Currency Support**: 150+ currencies with real-time conversion
- **Country-specific Features**: Localized payment methods and regulations

### 💻 Technical Excellence

- **Modern Tech Stack**: Next.js 15.3.2, React 19, TypeScript 5, React Query 5.80.2
- **Comprehensive API Client**: Axios 1.9.0 with React Query for type-safe interactions
- **State Management**: Zustand 5.0.5 with sessionStorage persistence
- **Authentication**: Better Auth 1.2.8 with OAuth support
- **UI Framework**: Tailwind CSS 4 with Radix UI components
- **Form Handling**: React Hook Form 7.56.4 with Zod 3.25.46 validation
- **Animations**: Framer Motion 12.15.0 and GSAP 3.13.0
- **Real-time Features**: Socket.IO 4.8.1 for live updates
- **Database Integration**: Supabase with PostgreSQL support
- **Development Tools**: ESLint 9, TypeScript 5, Turbopack for fast builds

---

## 🏗️ Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                      │
├─────────────────────────────────────────────────────────────┤
│  🌐 Internationalization (next-intl)                       │
│  🎨 UI Components (shadcn/ui + Tailwind CSS)               │
│  🔄 State Management (Zustand)                             │
│  📡 API Client (Axios + React Query)                       │
│  🔐 Authentication (Better Auth)                           │
└─────────────────────────────────────────────────────────────┘
```

### Key Technologies

#### **Core Framework & Language**

- **Framework**: Next.js 15.3.2 with App Router and Turbopack
- **Language**: TypeScript 5 for complete type safety
- **Runtime**: React 19.0.0 with latest features

#### **Data & State Management**

- **API Client**: Axios 1.9.0 for HTTP requests
- **Data Fetching**: TanStack React Query 5.80.2 for caching and synchronization
- **State Management**: Zustand 5.0.5 with sessionStorage persistence
- **Form Management**: React Hook Form 7.56.4 with Zod 3.25.46 validation

#### **UI & Styling**

- **CSS Framework**: Tailwind CSS 4 with custom design system
- **UI Components**: Radix UI primitives (@radix-ui/react-\*)
- **Icons**: Lucide React 0.511.0 for consistent iconography
- **Animations**: Framer Motion 12.15.0 and GSAP 3.13.0
- **Notifications**: React Toastify 11.0.5

#### **Authentication & Security**

- **Authentication**: Better Auth 1.2.8 with OAuth providers
- **Session Management**: Secure session handling with automatic timeout
- **Form Validation**: Zod schemas for runtime type checking

#### **Database & Backend Integration**

- **Database**: PostgreSQL with Supabase integration (@supabase/supabase-js 2.49.8)
- **Real-time**: Socket.IO 4.8.1 for live updates
- **File Storage**: Supabase Storage for document uploads

#### **Internationalization**

- **i18n Framework**: next-intl 4.1.0 for 14 languages
- **RTL Support**: Built-in right-to-left layout support
- **Locale Routing**: Automatic locale detection and routing

#### **Development Tools**

- **Linting**: ESLint 9 with Next.js configuration
- **Type Checking**: TypeScript 5 with strict mode
- **Build Tool**: Turbopack for fast development builds
- **Utilities**: clsx 2.1.1, tailwind-merge 3.3.0, class-variance-authority 0.7.1

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or yarn/pnpm)
- **Git**: For version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/paystup.git
   cd paystup
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables in `.env.local`:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

   # Better Auth Configuration
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
   BETTER_AUTH_SECRET=your-secret-key

   # Database (if using Supabase)
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xmiryneydpepoeqgyjcr.supabase.co:5432/postgres

   # OAuth Providers
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   APPLE_CLIENT_ID=your-apple-client-id
   APPLE_CLIENT_SECRET=your-apple-client-secret

   # External APIs
   EXCHANGE_RATE_API_KEY=your-exchange-rate-api-key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # Uses Turbopack for fast development builds
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Development Scripts

```bash
# Start development server with Turbopack (fast builds)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting with ESLint
npm run lint

# Additional useful commands
npx tsc --noEmit          # TypeScript type checking
npm audit                 # Security audit
npm run build --analyze   # Bundle analysis (if configured)
```

### Available Scripts Explained

- **`npm run dev`**: Starts the development server with Turbopack for fast builds and hot reloading
- **`npm run build`**: Creates an optimized production build with static generation
- **`npm run start`**: Starts the production server (requires `npm run build` first)
- **`npm run lint`**: Runs ESLint to check code quality and style issues

---

## � Dependencies & Tools

### Production Dependencies

#### **Core Framework**

- **next** (15.3.2) - React framework with App Router
- **react** (19.0.0) - UI library
- **react-dom** (19.0.0) - React DOM renderer
- **typescript** (5.0) - Type safety and development experience

#### **Data Fetching & State Management**

- **@tanstack/react-query** (5.80.2) - Data fetching and caching
- **@tanstack/react-query-devtools** (5.80.2) - Development tools for React Query
- **axios** (1.9.0) - HTTP client for API requests
- **zustand** (5.0.5) - Lightweight state management

#### **Form Handling & Validation**

- **react-hook-form** (7.56.4) - Performant forms with easy validation
- **@hookform/resolvers** (5.0.1) - Validation resolvers for React Hook Form
- **zod** (3.25.46) - TypeScript-first schema validation

#### **UI Components & Styling**

- **tailwindcss** (4.0) - Utility-first CSS framework
- **@tailwindcss/postcss** (4.0) - PostCSS plugin for Tailwind
- **tailwind-merge** (3.3.0) - Utility for merging Tailwind classes
- **class-variance-authority** (0.7.1) - Component variant management
- **clsx** (2.1.1) - Conditional className utility
- **lucide-react** (0.511.0) - Beautiful & consistent icon toolkit

#### **Radix UI Components**

- **@radix-ui/react-avatar** (1.1.10) - Accessible avatar component
- **@radix-ui/react-checkbox** (1.3.2) - Accessible checkbox component
- **@radix-ui/react-dialog** (1.1.14) - Modal and dialog components
- **@radix-ui/react-dropdown-menu** (2.1.15) - Dropdown menu component
- **@radix-ui/react-label** (2.1.7) - Accessible label component
- **@radix-ui/react-progress** (1.1.6) - Progress indicator component
- **@radix-ui/react-select** (2.2.5) - Accessible select component
- **@radix-ui/react-separator** (1.1.7) - Visual separator component
- **@radix-ui/react-slot** (1.2.3) - Slot component for composition

#### **Animation & Motion**

- **framer-motion** (12.15.0) - Production-ready motion library
- **gsap** (3.13.0) - High-performance animation library
- **tw-animate-css** (1.3.0) - Tailwind CSS animations

#### **Authentication & Security**

- **better-auth** (1.2.8) - Modern authentication library
- **@supabase/supabase-js** (2.49.8) - Supabase client library
- **@supabase/ssr** (0.6.1) - Supabase SSR utilities

#### **Database & Backend**

- **pg** (8.16.0) - PostgreSQL client for Node.js
- **@types/pg** (8.15.2) - TypeScript types for pg
- **socket.io** (4.8.1) - Real-time bidirectional event-based communication
- **socket.io-client** (4.8.1) - Socket.IO client library

#### **Internationalization**

- **next-intl** (4.1.0) - Internationalization for Next.js

#### **Utilities & Notifications**

- **react-toastify** (11.0.5) - Toast notifications for React
- **dotenv** (16.5.0) - Environment variable loader

### Development Dependencies

#### **TypeScript & Type Definitions**

- **@types/node** (20.0) - Node.js type definitions
- **@types/react** (19.0) - React type definitions
- **@types/react-dom** (19.0) - React DOM type definitions

#### **Code Quality & Linting**

- **eslint** (9.0) - JavaScript and TypeScript linter
- **eslint-config-next** (15.3.2) - ESLint configuration for Next.js
- **@eslint/eslintrc** (3.0) - ESLint configuration utilities

#### **Development Tools**

- **tsx** (4.19.4) - TypeScript execution environment

### Key Features by Dependency

#### **Performance Optimizations**

- **Turbopack**: Fast development builds (built into Next.js 15.3.2)
- **React Query**: Intelligent caching and background updates
- **Zustand**: Minimal re-renders with selective subscriptions
- **Tailwind CSS**: Purged CSS for minimal bundle size

#### **Developer Experience**

- **TypeScript**: Complete type safety across the application
- **ESLint**: Code quality and consistency enforcement
- **React Query DevTools**: Visual debugging for data fetching
- **Hot Reloading**: Instant feedback during development

#### **Accessibility & UX**

- **Radix UI**: WAI-ARIA compliant components
- **Framer Motion**: Smooth, performant animations
- **React Hook Form**: Optimized form performance
- **React Toastify**: Accessible toast notifications

---

## �🔧 Configuration

### Environment Variables

#### Required Variables

```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL=https://api.paystup.com

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=https://auth.paystup.com
BETTER_AUTH_SECRET=your-256-bit-secret

# Database Connection
DATABASE_URL=postgresql://username:password@host:port/database
```

#### Optional Variables

```env
# OAuth Providers
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-secret
APPLE_CLIENT_ID=your-apple-oauth-client-id
APPLE_CLIENT_SECRET=your-apple-oauth-secret

# External Services
EXCHANGE_RATE_API_KEY=your-exchange-rate-service-key
NOTIFICATION_SERVICE_KEY=your-notification-service-key

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
```

### Tailwind CSS Configuration

The project uses custom Tailwind breakpoints for responsive design:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: "480px", // Small mobile
      sm2: "568px", // Large mobile
      sm3: "640px", // Small tablet
      md: "768px", // Tablet
      md2: "840px", // Large tablet
      md3: "960px", // Small desktop
      lg: "1024px", // Desktop
      lg2: "1280px", // Large desktop
      xl: "1440px", // Extra large
      "2xl": "1600px", // Ultra wide
    },
  },
};
```

---

## 🌐 Internationalization

### Supported Languages

The application supports 14 languages with complete translations:

| Language         | Code    | Script     | RTL Support |
| ---------------- | ------- | ---------- | ----------- |
| English          | `en`    | Latin      | No          |
| French           | `fr`    | Latin      | No          |
| Portuguese       | `pt`    | Latin      | No          |
| Arabic           | `ar`    | Arabic     | Yes         |
| Swahili          | `sw`    | Latin      | No          |
| Hindi            | `hi`    | Devanagari | No          |
| Mandarin Chinese | `zh-CN` | Chinese    | No          |
| Urdu             | `ur`    | Arabic     | Yes         |
| Bengali          | `bn`    | Bengali    | No          |
| Indonesian       | `id`    | Latin      | No          |
| Punjabi          | `pa`    | Gurmukhi   | No          |
| Japanese         | `ja`    | Japanese   | No          |
| Vietnamese       | `vi`    | Latin      | No          |
| Marathi          | `mr`    | Devanagari | No          |

### Adding New Languages

1. **Create translation file**

   ```bash
   # Create new language file
   touch messages/[language-code].json
   ```

2. **Add translations**

   ```json
   {
     "Common": {
       "buttons": {
         "back": "Back",
         "next": "Next",
         "save": "Save"
       }
     },
     "Dashboard": {
       "title": "Dashboard",
       "welcome": "Welcome back!"
     }
   }
   ```

3. **Update routing configuration**
   ```typescript
   // i18n/routing.ts
   export const routing = createLocalizedPathnamesNavigation({
     locales: [
       "en",
       "fr",
       "pt",
       "ar",
       "sw",
       "hi",
       "zh-CN",
       "ur",
       "bn",
       "id",
       "pa",
       "ja",
       "vi",
       "mr",
       "new-language",
     ],
     // ... rest of configuration
   });
   ```

### Using Translations

```typescript
// In components
import { useTranslations } from "next-intl";

function MyComponent() {
  const t = useTranslations("Dashboard");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("welcome")}</p>
    </div>
  );
}
```

---

## 🔐 Authentication

### Authentication Flow

The application uses Better Auth with multiple authentication methods:

1. **Email/Password Authentication**

   - Email verification required
   - Password strength validation
   - Secure session management

2. **OAuth Authentication**
   - Google OAuth integration
   - Apple OAuth integration
   - Automatic account linking

### Authentication State Management

```typescript
// Using the auth store
import { useAuthStore } from "@/lib/stores/auth-store";

function AuthComponent() {
  const { isAuthenticated, user, authToken, setUser, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

```typescript
// Using AuthGuard component
import AuthGuard from "@/components/auth/AuthGuard";

function ProtectedPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
```

---

## 📡 API Client

### Overview

The API client is a comprehensive TypeScript system built with Axios and React Query, providing:

- **Type-safe API interactions**
- **Automatic authentication**
- **Intelligent caching**
- **Error handling and retry logic**
- **Real-time updates**
- **Performance monitoring**

### Architecture

```
lib/api/
├── index.ts                    # Main export hub
├── types.ts                    # TypeScript definitions
├── axios-config.ts             # HTTP client configuration
├── query-client.ts             # React Query setup
├── query-provider.tsx          # Provider component
└── hooks/
    ├── auth-hooks.ts           # Authentication hooks
    ├── transaction-hooks.ts    # Transaction hooks
    └── exchange-rate-hooks.ts  # Exchange rate hooks
```

### Key Features

#### 🔐 Automatic Authentication

```typescript
// Automatically adds auth token to requests
const { data } = await request.get("/user/profile");
// Headers: { Authorization: 'Bearer <token>' }
```

#### 🔄 Smart Caching

```typescript
// Cached for 5 minutes, background refetch
const { data, isLoading } = useUserProfile();
```

#### 🚀 Retry Logic

```typescript
// Automatic retry with exponential backoff
// 3 attempts: 1s, 2s, 4s delays
const response = await request.post("/transactions", data);
```

#### 📊 Real-time Updates

```typescript
// Polls every 5 seconds for pending transactions
const { data } = useTransactionUpdates(transactionId);
```

### Usage Examples

#### Authentication

```typescript
import { useLogin, useRegister, useLogout } from "@/lib/api";

function AuthForm() {
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // User automatically redirected to dashboard
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
```

#### Data Fetching

```typescript
import { useTransactions, useUserProfile } from "@/lib/api";

function Dashboard() {
  // Fetch user profile with caching
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  // Fetch transactions with pagination
  const {
    data: transactions,
    isLoading: transactionsLoading,
    error,
  } = useTransactions({
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "desc",
  });

  if (profileLoading || transactionsLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <h1>Welcome, {profile?.name}!</h1>
      <TransactionList transactions={transactions?.transactions} />
      <Pagination meta={transactions?.meta} />
    </div>
  );
}
```

#### Creating Transactions

```typescript
import { useCreateTransaction } from "@/lib/api";

function SendMoneyForm() {
  const createTransaction = useCreateTransaction();

  const handleSubmit = async (formData) => {
    try {
      const transaction = await createTransaction.mutateAsync({
        type: "send",
        amount: formData.amount,
        currency: formData.currency,
        recipient: {
          name: formData.recipientName,
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
          country: formData.country,
        },
        description: formData.description,
      });

      console.log("Transaction created:", transaction);
      // Navigate to success page
    } catch (error) {
      console.error("Transaction failed:", error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={createTransaction.isPending}>
        {createTransaction.isPending ? "Processing..." : "Send Money"}
      </button>

      {createTransaction.error && (
        <ErrorMessage error={createTransaction.error} />
      )}
    </form>
  );
}
```

#### Real-time Currency Conversion

```typescript
import { useRealTimeConversion } from "@/lib/api";
import { useState, useEffect } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const conversion = useRealTimeConversion();

  // Debounced conversion
  useEffect(() => {
    const timer = setTimeout(() => {
      if (amount > 0) {
        conversion.mutate({
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="space-y-4">
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border rounded px-3 py-2"
        />
        <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
      </div>

      <div className="text-center">
        <span>to</span>
      </div>

      <div>
        <CurrencySelect value={toCurrency} onChange={setToCurrency} />
      </div>

      {conversion.data && (
        <div className="bg-green-50 p-4 rounded">
          <p className="text-lg font-semibold">
            {amount} {fromCurrency} = {conversion.data.convertedAmount}{" "}
            {toCurrency}
          </p>
          <p className="text-sm text-gray-600">
            Rate: {conversion.data.exchangeRate}
          </p>
          <p className="text-sm text-gray-600">
            Fee: {conversion.data.fee} {fromCurrency}
          </p>
        </div>
      )}

      {conversion.isPending && <div>Calculating conversion...</div>}
    </div>
  );
}
```

#### Advanced Usage

##### Custom API Calls

```typescript
import { request } from "@/lib/api";

// Direct API calls with automatic auth and retry
const fetchCustomData = async () => {
  try {
    const response = await request.get("/custom-endpoint");
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// File uploads with progress tracking
import { uploadFile } from "@/lib/api";

const uploadDocument = async (file: File) => {
  try {
    const response = await uploadFile("/kyc/documents", file, (progress) => {
      console.log(`Upload progress: ${progress}%`);
      setUploadProgress(progress);
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
```

##### Cache Management

```typescript
import { cacheUtils, invalidateQueries } from "@/lib/api";

// Invalidate specific queries
const refreshTransactions = () => {
  invalidateQueries.transactions();
};

// Clear all cache
const clearAllCache = () => {
  cacheUtils.clearAll();
};

// Prefetch data
const prefetchUserProfile = async () => {
  await cacheUtils.prefetchQuery(["user", "profile"], () =>
    request.get("/user/profile")
  );
};

// Set data manually
const updateCachedProfile = (newProfileData) => {
  cacheUtils.setQueryData(["user", "profile"], newProfileData);
};
```

##### Error Handling

```typescript
import { errorUtils } from "@/lib/api";

function ErrorBoundary({ error }) {
  const userFriendlyMessage = errorUtils.getUserFriendlyMessage(error);

  if (errorUtils.isNetworkError(error)) {
    return (
      <div className="bg-red-50 p-4 rounded">
        <h3>Connection Error</h3>
        <p>Please check your internet connection and try again.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (errorUtils.isAuthError(error)) {
    return (
      <div className="bg-yellow-50 p-4 rounded">
        <h3>Authentication Required</h3>
        <p>Please sign in to continue.</p>
        <button onClick={() => router.push("/auth/signin")}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="bg-red-50 p-4 rounded">
      <h3>Error</h3>
      <p>{userFriendlyMessage}</p>
    </div>
  );
}
```

### API Client Configuration

#### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.paystup.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://auth.paystup.com
```

#### Customizing Query Client

```typescript
// lib/api/query-client.ts
const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Performance Monitoring

```typescript
import { performanceUtils } from "@/lib/api";

// Measure API performance
const result = await performanceUtils.measureApiCall(
  () => request.get("/slow-endpoint"),
  "SlowEndpoint"
);

// Check cache statistics
const stats = performanceUtils.logCacheStats();
console.log("Cache hit rate:", stats);
```

## 💳 Send Money Flow

### Multi-step Send Process

The send money feature includes a comprehensive multi-step flow:

1. **Recipient Details**

   - Full name and account information
   - Bank selection with country-specific options
   - Account number validation

2. **Amount & Currency**

   - Real-time currency conversion
   - Fee calculation and display
   - Exchange rate transparency

3. **Review & Confirm**
   - Transaction summary
   - Final confirmation with password
   - Terms and conditions acceptance

### Send Money Components

```typescript
// Send money with real-time conversion
import { useSendStore } from "@/lib/stores/send-store";
import { useRealTimeConversion } from "@/lib/api";

function SendAmountStep() {
  const { amount, fromCurrency, toCurrency, setAmount, setConversionData } =
    useSendStore();

  const conversion = useRealTimeConversion();

  useEffect(() => {
    if (amount > 0) {
      conversion.mutate({
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      });
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    if (conversion.data) {
      setConversionData(conversion.data);
    }
  }, [conversion.data]);

  return (
    <div>
      <AmountInput
        value={amount}
        onChange={setAmount}
        currency={fromCurrency}
      />

      {conversion.data && (
        <ConversionDisplay
          conversion={conversion.data}
          loading={conversion.isPending}
        />
      )}
    </div>
  );
}
```

### State Management

```typescript
// Send store with persistence
import { useSendStore } from "@/lib/stores/send-store";

function SendFlow() {
  const {
    currentStep,
    recipientDetails,
    amount,
    conversionData,
    nextStep,
    previousStep,
    resetSend,
  } = useSendStore();

  const handleComplete = () => {
    // Process transaction
    resetSend(); // Clear state after completion
  };

  return (
    <div>
      <ProgressIndicator currentStep={currentStep} totalSteps={3} />

      {currentStep === 1 && <RecipientStep />}
      {currentStep === 2 && <AmountStep />}
      {currentStep === 3 && <ReviewStep onComplete={handleComplete} />}

      <NavigationButtons
        onNext={nextStep}
        onPrevious={previousStep}
        canGoNext={canProceedToNextStep()}
      />
    </div>
  );
}
```

---

## 📊 Dashboard

### Dashboard Features

- **Account Overview**: Balance, recent transactions, quick actions
- **Transaction History**: Paginated list with filtering and search
- **Quick Send**: Streamlined money transfer interface
- **Profile Management**: KYC status, profile completion
- **Notifications**: Real-time updates and alerts

### Dashboard Components

```typescript
// Dashboard with data fetching
import {
  useUserProfile,
  useTransactions,
  useTransactionSummary,
} from "@/lib/api";

function Dashboard() {
  const { data: profile } = useUserProfile();
  const { data: summary } = useTransactionSummary();
  const { data: recentTransactions } = useTransactions({
    limit: 5,
    sort: "createdAt",
    order: "desc",
  });

  return (
    <div className="space-y-6">
      <WelcomeCard user={profile} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard balance={summary?.totalBalance} />
        <TransactionCountCard count={summary?.totalTransactions} />
        <PendingCard count={summary?.pendingTransactions} />
      </div>

      <RecentTransactions transactions={recentTransactions?.transactions} />

      {profile?.kycStatus !== "verified" && (
        <KYCPromptCard status={profile?.kycStatus} />
      )}
    </div>
  );
}
```

### KYC Integration

```typescript
// KYC status management
import { useKYCStore } from "@/lib/stores/kyc-store";

function KYCFlow() {
  const { currentStep, personalInfo, documents, submitKYC, isSubmitting } =
    useKYCStore();

  const handleSubmit = async () => {
    try {
      await submitKYC();
      // Redirect to success page
    } catch (error) {
      // Handle submission error
    }
  };

  return (
    <div>
      <KYCProgressIndicator currentStep={currentStep} />

      {currentStep === 1 && <PersonalInfoStep />}
      {currentStep === 2 && <AddressStep />}
      {currentStep === 3 && <DocumentUploadStep />}
      {currentStep === 4 && <ReviewStep onSubmit={handleSubmit} />}
    </div>
  );
}
```

---

## 🆘 Help Center

### Help Center Features

- **Topic-based Navigation**: Organized help topics with detailed content
- **Search Functionality**: Find help articles quickly
- **Contact Forms**: Submit support requests with file attachments
- **FAQ Section**: Common questions and answers
- **Live Chat Integration**: Real-time support (when available)

### Help Center Structure

```typescript
// Help center with dynamic content
import { useTranslations } from "next-intl";

function HelpCenter() {
  const t = useTranslations("Help");

  const helpTopics = [
    {
      id: "getting-started",
      title: t("topics.gettingStarted.title"),
      description: t("topics.gettingStarted.description"),
      icon: "rocket",
    },
    {
      id: "sending-money",
      title: t("topics.sendingMoney.title"),
      description: t("topics.sendingMoney.description"),
      icon: "send",
    },
    // ... more topics
  ];

  return (
    <div>
      <HelpHeader />
      <SearchBar />
      <TopicGrid topics={helpTopics} />
      <ContactSection />
    </div>
  );
}
```

### Contact Form Integration

```typescript
// Contact form with file upload
import { useContactForm } from "@/lib/api";

function ContactForm() {
  const contactMutation = useContactForm();
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = async (formData) => {
    try {
      await contactMutation.mutateAsync({
        ...formData,
        attachments,
      });
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea name="message" placeholder="Describe your issue..." required />

      <FileUpload
        multiple
        accept="image/*,.pdf,.doc,.docx"
        onFilesChange={setAttachments}
      />

      <button type="submit" disabled={contactMutation.isPending}>
        {contactMutation.isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

---

## 🎨 UI Components

### Design System

The project uses a comprehensive design system with:

- **Color Palette**: Consistent brand colors with semantic meanings
- **Typography**: Hierarchical text styles with proper contrast
- **Spacing**: Consistent spacing scale for layouts
- **Components**: Reusable UI components with variants

### Color Scheme

```css
/* Primary Colors */
--primary: #0bab7c; /* Main brand color */
--primary-hover: #099268; /* Hover state */
--primary-light: #e6f7f3; /* Light variant */

/* Neutral Colors */
--background: #f9fafb; /* Page background */
--surface: #ffffff; /* Card background */
--text-primary: #111827; /* Headings */
--text-secondary: #4b5563; /* Body text */
--text-muted: #6b7280; /* Muted text */

/* Form Colors */
--form-label: #4b5563; /* Form labels */
--form-placeholder: #b5b5b5; /* Placeholders */
--form-border: #d1d5db; /* Input borders */
```

### Component Examples

```typescript
// Button component with variants
import { Button } from "@/components/ui/button";

function ButtonExamples() {
  return (
    <div className="space-x-4">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="destructive">Delete Button</Button>
    </div>
  );
}

// Form components
import { Input, Label, Select } from "@/components/ui/form";

function FormExample() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Select id="country">
          <option value="">Select country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
        </Select>
      </div>
    </div>
  );
}
```

### Responsive Components

```typescript
// Responsive layout components
function ResponsiveLayout() {
  return (
    <div className="container mx-auto px-4">
      {/* Mobile: single column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>Mobile-first card</Card>
        <Card>Responsive design</Card>
        <Card>Tailwind CSS</Card>
      </div>

      {/* Responsive text sizes */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Responsive Heading
      </h1>

      {/* Responsive spacing */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        Content with responsive margins
      </div>
    </div>
  );
}
```

---

## 📱 Responsive Design

### Breakpoint Strategy

The application uses a mobile-first approach with custom breakpoints:

```typescript
// Responsive design patterns
const breakpoints = {
  sm: "480px", // Small mobile
  sm2: "568px", // Large mobile
  sm3: "640px", // Small tablet
  md: "768px", // Tablet
  md2: "840px", // Large tablet
  md3: "960px", // Small desktop
  lg: "1024px", // Desktop
  lg2: "1280px", // Large desktop
  xl: "1440px", // Extra large
  "2xl": "1600px", // Ultra wide
};
```

### Mobile Optimizations

```typescript
// Mobile-specific features
function MobileOptimizations() {
  return (
    <div>
      {/* Touch-friendly buttons (min 44px) */}
      <button className="min-h-[44px] min-w-[44px] touch-manipulation">
        Touch Button
      </button>

      {/* Mobile navigation */}
      <nav className="sm:hidden">
        <MobileMenu />
      </nav>

      {/* Desktop navigation */}
      <nav className="hidden sm:block">
        <DesktopMenu />
      </nav>

      {/* Responsive text */}
      <p className="text-base sm:text-lg">Readable text on all devices</p>
    </div>
  );
}
```

### Responsive Patterns

```typescript
// Common responsive patterns
function ResponsivePatterns() {
  return (
    <div>
      {/* Responsive sidebar */}
      <div className="flex">
        <aside className="hidden md:block w-64">
          <Sidebar />
        </aside>
        <main className="flex-1 md:ml-64">
          <Content />
        </main>
      </div>

      {/* Mobile drawer */}
      <div className="md:hidden">
        <MobileDrawer />
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id}>{item.content}</Card>
        ))}
      </div>
    </div>
  );
}
```

---

## 🧪 Testing

### Current Testing Setup

The project is configured for testing but does not currently include test dependencies in package.json. The following testing strategy is recommended:

### Recommended Testing Stack

1. **Unit Testing**: Jest + React Testing Library for component tests
2. **Integration Testing**: API integration tests with MSW (Mock Service Worker)
3. **E2E Testing**: Playwright or Cypress for full workflow tests
4. **Type Testing**: TypeScript compiler for type safety validation

### Setting Up Testing (Optional)

To add testing to the project, install the following dependencies:

```bash
# Core testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Additional testing utilities
npm install --save-dev @testing-library/user-event msw

# E2E testing (choose one)
npm install --save-dev @playwright/test
# or
npm install --save-dev cypress

# Add test scripts to package.json
```

### Current Quality Assurance

The project currently uses:

- **TypeScript**: Compile-time type checking with `npx tsc --noEmit`
- **ESLint**: Code quality and style checking with `npm run lint`
- **Build Validation**: Production build testing with `npm run build`

### Quality Assurance Commands

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build validation
npm run build

# Security audit
npm audit

# Dependency analysis
npm ls --depth=0
```

---

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start

# Analyze bundle size
npm run analyze
```

### Environment Configuration

```env
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production

# API endpoints
NEXT_PUBLIC_API_BASE_URL=https://api.paystup.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://auth.paystup.com

# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# OAuth
GOOGLE_CLIENT_ID=prod-google-client-id
GOOGLE_CLIENT_SECRET=prod-google-secret
APPLE_CLIENT_ID=prod-apple-client-id
APPLE_CLIENT_SECRET=prod-apple-secret
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Manual Deployment

```bash
# Build the application
npm run build

# Copy files to server
rsync -av .next/ user@server:/path/to/app/.next/
rsync -av public/ user@server:/path/to/app/public/
rsync -av package.json user@server:/path/to/app/

# Install dependencies on server
ssh user@server "cd /path/to/app && npm ci --only=production"

# Start the application
ssh user@server "cd /path/to/app && pm2 start npm --name paystup -- start"
```

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Test your changes**: Run tests and ensure they pass
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes

### Coding Standards

- **TypeScript**: Use strict TypeScript with proper typing
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Use Prettier for code formatting
- **Conventional Commits**: Use conventional commit messages
- **Component Structure**: Follow the established component patterns

### Project Structure

```
paystup/
├── app/                    # Next.js app directory
│   ├── [locale]/          # Internationalized routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── api/              # API client system
│   ├── stores/           # Zustand stores
│   ├── utils/            # Utility functions
│   └── services/         # External services
├── messages/             # Internationalization files
├── public/               # Static assets
└── i18n/                # Internationalization config
```

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our Discord server for real-time help

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For hosting and deployment platform
- **TanStack**: For React Query data fetching library
- **Tailwind CSS**: For the utility-first CSS framework
- **shadcn/ui**: For beautiful and accessible UI components
- **Better Auth**: For secure authentication solutions

---

<div align="center">
  <p>Made with ❤️ by the Paystup Team</p>
  <p>
    <a href="https://paystup.com">Website</a> •
    <a href="https://docs.paystup.com">Documentation</a> •
    <a href="https://github.com/paystup/paystup">GitHub</a> •
    <a href="https://twitter.com/paystup">Twitter</a>
  </p>
</div>
