/**
 * API Types and Interfaces
 * Comprehensive TypeScript definitions for API requests and responses
 */

// Base API Response Structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Error Response Structure
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
  timestamp: string;
}

// Pagination Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Query Parameters
export interface QueryParams extends PaginationParams {
  search?: string;
  filter?: Record<string, any>;
  include?: string[];
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  country?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    country?: string;
    emailVerified?: boolean;
    kycStatus?: 'pending' | 'verified' | 'rejected';
  };
  token: string;
  refreshToken?: string;
  expiresAt: string;
}

// User Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  country?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  kycStatus: 'pending' | 'verified' | 'rejected';
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

// Transaction Types
export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'conversion' | 'deposit' | 'withdrawal';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  fee: number;
  exchangeRate?: number;
  description: string;
  reference: string;
  recipient?: {
    name: string;
    email?: string;
    accountNumber?: string;
    bankName?: string;
    country: string;
  };
  sender?: {
    name: string;
    email?: string;
    country: string;
  };
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface CreateTransactionRequest {
  type: 'send' | 'conversion';
  amount: number;
  currency: string;
  targetCurrency?: string;
  recipient?: {
    name: string;
    accountNumber: string;
    bankName: string;
    country: string;
  };
  description?: string;
  metadata?: Record<string, any>;
}

// Exchange Rate Types
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  inverseRate: number;
  lastUpdated: string;
  source: string;
}

export interface ExchangeRateRequest {
  from: string;
  to: string;
  amount?: number;
}

// KYC Types
export interface KYCDocument {
  id: string;
  type: 'passport' | 'drivers_license' | 'national_id' | 'utility_bill' | 'bank_statement';
  status: 'pending' | 'approved' | 'rejected';
  url: string;
  uploadedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface KYCSubmission {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    phoneNumber: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  documents: {
    identityDocument: File;
    proofOfAddress: File;
  };
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// Settings Types
export interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    transactionAlerts: boolean;
    marketingEmails: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    loginNotifications: boolean;
  };
  preferences: {
    language: string;
    currency: string;
    timezone: string;
  };
}

// API Endpoint Types
export interface ApiEndpoints {
  // Authentication
  login: '/auth/login';
  register: '/auth/register';
  logout: '/auth/logout';
  refresh: '/auth/refresh';
  forgotPassword: '/auth/forgot-password';
  resetPassword: '/auth/reset-password';
  
  // User
  profile: '/user/profile';
  updateProfile: '/user/profile';
  uploadAvatar: '/user/avatar';
  
  // Transactions
  transactions: '/transactions';
  createTransaction: '/transactions';
  transactionDetails: '/transactions/:id';
  
  // Exchange Rates
  exchangeRates: '/exchange-rates';
  convertCurrency: '/exchange-rates/convert';
  
  // KYC
  kycStatus: '/kyc/status';
  submitKyc: '/kyc/submit';
  uploadDocument: '/kyc/documents';
  
  // Notifications
  notifications: '/notifications';
  markAsRead: '/notifications/:id/read';
  
  // Settings
  settings: '/settings';
  updateSettings: '/settings';
}

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Request Configuration
export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean;
}
