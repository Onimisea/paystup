# Paystup API Client

A comprehensive TypeScript API client built with Axios and React Query, featuring automatic authentication, caching, error handling, and retry logic.

## Features

- 🔐 **Automatic Authentication**: Integrates with Zustand auth store for seamless token management
- 🔄 **Smart Caching**: Optimized caching strategies with background refetching
- 🚀 **Retry Logic**: Exponential backoff for network errors and server failures
- 📱 **TypeScript Support**: Full type safety for requests and responses
- 🎯 **React Query Integration**: Powerful data fetching with loading states and error boundaries
- 🔧 **Configurable**: Easy to customize and extend

## Quick Start

### 1. Basic Setup

The API client is automatically configured when you wrap your app with `QueryProvider`:

```tsx
// Already configured in app/[locale]/layout.tsx
import { QueryProvider } from '@/lib/api';

export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
```

### 2. Authentication

```tsx
import { useLogin, useRegister, useLogout } from '@/lib/api';

function LoginForm() {
  const loginMutation = useLogin();

  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // User is automatically redirected to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Login form fields */}
      <button 
        type="submit" 
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### 3. Fetching Data

```tsx
import { useTransactions, useUserProfile } from '@/lib/api';

function Dashboard() {
  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  
  // Fetch transactions with pagination
  const { 
    data: transactions, 
    isLoading: transactionsLoading,
    error 
  } = useTransactions({ 
    page: 1, 
    limit: 10,
    sort: 'createdAt',
    order: 'desc'
  });

  if (profileLoading || transactionsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Welcome, {profile?.name}!</h1>
      <div>
        {transactions?.transactions.map(transaction => (
          <div key={transaction.id}>
            {transaction.description} - {transaction.amount} {transaction.currency}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. Creating Transactions

```tsx
import { useCreateTransaction } from '@/lib/api';

function SendMoneyForm() {
  const createTransaction = useCreateTransaction();

  const handleSendMoney = async (formData) => {
    try {
      const transaction = await createTransaction.mutateAsync({
        type: 'send',
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
      
      console.log('Transaction created:', transaction);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <form onSubmit={handleSendMoney}>
      {/* Send money form fields */}
      <button 
        type="submit" 
        disabled={createTransaction.isPending}
      >
        {createTransaction.isPending ? 'Sending...' : 'Send Money'}
      </button>
    </form>
  );
}
```

### 5. Real-time Currency Conversion

```tsx
import { useRealTimeConversion } from '@/lib/api';
import { useState, useEffect } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
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
    <div>
      <input 
        type="number" 
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select 
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <span>to</span>
      <select 
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      
      {conversion.data && (
        <div>
          {amount} {fromCurrency} = {conversion.data.convertedAmount} {toCurrency}
          <br />
          Rate: {conversion.data.exchangeRate}
          <br />
          Fee: {conversion.data.fee} {fromCurrency}
        </div>
      )}
    </div>
  );
}
```

## Advanced Usage

### Custom API Calls

```tsx
import { request } from '@/lib/api';

// Direct API calls with automatic auth and retry
const fetchCustomData = async () => {
  try {
    const response = await request.get('/custom-endpoint');
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Upload files
import { uploadFile } from '@/lib/api';

const uploadDocument = async (file: File) => {
  try {
    const response = await uploadFile('/kyc/documents', file, (progress) => {
      console.log(`Upload progress: ${progress}%`);
    });
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
```

### Cache Management

```tsx
import { cacheUtils, invalidateQueries } from '@/lib/api';

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
  await cacheUtils.prefetchQuery(
    ['user', 'profile'],
    () => request.get('/user/profile')
  );
};
```

### Error Handling

```tsx
import { errorUtils } from '@/lib/api';

function ErrorBoundary({ error }) {
  const userFriendlyMessage = errorUtils.getUserFriendlyMessage(error);
  
  if (errorUtils.isNetworkError(error)) {
    return <div>Please check your internet connection</div>;
  }
  
  if (errorUtils.isAuthError(error)) {
    return <div>Please sign in again</div>;
  }
  
  return <div>{userFriendlyMessage}</div>;
}
```

## Configuration

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.paystup.com
NEXT_PUBLIC_BETTER_AUTH_URL=https://auth.paystup.com
```

### Customizing Query Client

```tsx
// lib/api/query-client.ts
const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
    },
  },
});
```

## Best Practices

1. **Use React Query hooks** for data fetching instead of direct API calls
2. **Handle loading states** in your components
3. **Implement error boundaries** for graceful error handling
4. **Use optimistic updates** for better UX
5. **Leverage caching** to reduce API calls
6. **Monitor performance** with the built-in utilities

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check if user is logged in and token is valid
2. **Network errors**: Verify API base URL and internet connection
3. **Slow queries**: Use React Query DevTools to identify bottlenecks
4. **Cache issues**: Clear cache or invalidate specific queries

### Debug Mode

Enable React Query DevTools in development:

```tsx
// Automatically enabled in development mode
// Access via the floating button in bottom-right corner
```

### Performance Monitoring

```tsx
import { performanceUtils } from '@/lib/api';

// Measure API performance
const result = await performanceUtils.measureApiCall(
  () => request.get('/slow-endpoint'),
  'SlowEndpoint'
);

// Check cache statistics
const stats = performanceUtils.logCacheStats();
console.log('Cache hit rate:', stats);
```
