interface ExchangeRateResponse {
  success: boolean;
  rates: Record<string, number>;
  base: string;
  date: string;
}

// Interface for exchange rate errors (for future use)
// interface ExchangeRateError {
//   success: false;
//   error: {
//     code: number;
//     type: string;
//     info: string;
//   };
// }

// Using exchangerate-api.com as the primary service (free tier available)
const EXCHANGE_API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";

// Fallback to fixer.io (requires API key)
const FIXER_API_BASE_URL = "https://api.fixer.io/latest";
const FIXER_API_KEY = process.env.NEXT_PUBLIC_FIXER_API_KEY;

// Cache for exchange rates (5 minutes cache)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const exchangeRateCache = new Map<
  string,
  { data: Record<string, number>; timestamp: number }
>();

export async function getExchangeRates(
  baseCurrency: string = "USD"
): Promise<Record<string, number>> {
  const cacheKey = baseCurrency;
  const now = Date.now();

  // Check cache first
  const cached = exchangeRateCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Try primary API first (exchangerate-api.com)
    const response = await fetch(`${EXCHANGE_API_BASE_URL}/${baseCurrency}`);

    if (response.ok) {
      const data: ExchangeRateResponse = await response.json();
      if (data.success !== false && data.rates) {
        // Cache the result
        exchangeRateCache.set(cacheKey, {
          data: data.rates,
          timestamp: now,
        });
        return data.rates;
      }
    }

    // Fallback to fixer.io if primary fails and API key is available
    if (FIXER_API_KEY) {
      const fixerResponse = await fetch(
        `${FIXER_API_BASE_URL}?access_key=${FIXER_API_KEY}&base=${baseCurrency}`
      );

      if (fixerResponse.ok) {
        const fixerData: ExchangeRateResponse = await fixerResponse.json();
        if (fixerData.success !== false && fixerData.rates) {
          // Cache the result
          exchangeRateCache.set(cacheKey, {
            data: fixerData.rates,
            timestamp: now,
          });
          return fixerData.rates;
        }
      }
    }

    // If both APIs fail, return fallback rates
    console.warn("Exchange rate APIs failed, using fallback rates");
    return getFallbackRates(baseCurrency);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return getFallbackRates(baseCurrency);
  }
}

export async function convertCurrencyLive(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<{ convertedAmount: number; rate: number }> {
  if (fromCurrency === toCurrency) {
    return { convertedAmount: amount, rate: 1 };
  }

  try {
    const rates = await getExchangeRates(fromCurrency);
    const rate = rates[toCurrency];

    if (!rate) {
      throw new Error(
        `Exchange rate not found for ${fromCurrency} to ${toCurrency}`
      );
    }

    const convertedAmount = amount * rate;
    return { convertedAmount, rate };
  } catch (error) {
    console.error("Currency conversion error:", error);
    // Fallback to static rates
    const fallbackRate = getFallbackRate(fromCurrency, toCurrency);
    return {
      convertedAmount: amount * fallbackRate,
      rate: fallbackRate,
    };
  }
}

// Fallback exchange rates (updated periodically)
function getFallbackRates(baseCurrency: string): Record<string, number> {
  const fallbackRates: Record<string, Record<string, number>> = {
    USD: {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.0,
      AUD: 1.35,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.45,
      SEK: 8.85,
      NZD: 1.42,
      MXN: 20.5,
      SGD: 1.35,
      HKD: 7.8,
      NOK: 8.6,
      ZAR: 14.8,
      TRY: 8.5,
      BRL: 5.2,
      TWD: 28.0,
      DKK: 6.35,
      PLN: 3.9,
      THB: 33.0,
      IDR: 14250,
      HUF: 295,
      CZK: 21.5,
      ILS: 3.25,
      CLP: 800,
      PHP: 50.5,
      AED: 3.67,
      COP: 3850,
      SAR: 3.75,
      MYR: 4.15,
      RON: 4.2,
      NGN: 770,
      INR: 74.5,
      KRW: 1180,
      RUB: 74.0,
    },
    EUR: {
      USD: 1.18,
      GBP: 0.86,
      JPY: 129.5,
      // Add more as needed
    },
    GBP: {
      USD: 1.37,
      EUR: 1.16,
      JPY: 151.0,
      // Add more as needed
    },
    NGN: {
      USD: 0.0013,
      EUR: 0.0011,
      GBP: 0.00095,
      INR: 0.096,
      // Add more as needed
    },
    INR: {
      USD: 0.0134,
      EUR: 0.0114,
      GBP: 0.0099,
      NGN: 10.4,
      // Add more as needed
    },
  };

  return fallbackRates[baseCurrency] || {};
}

function getFallbackRate(fromCurrency: string, toCurrency: string): number {
  const fromRates = getFallbackRates(fromCurrency);
  if (fromRates[toCurrency]) {
    return fromRates[toCurrency];
  }

  // Try reverse conversion
  const toRates = getFallbackRates(toCurrency);
  if (toRates[fromCurrency]) {
    return 1 / toRates[fromCurrency];
  }

  // Convert through USD if direct rate not available
  const usdRates = getFallbackRates("USD");
  const fromToUsd =
    getFallbackRates(fromCurrency)["USD"] || 1 / usdRates[fromCurrency] || 1;
  const usdToTarget = usdRates[toCurrency] || 1;

  return fromToUsd * usdToTarget;
}

// Get real-time exchange rate for a specific pair
export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  if (fromCurrency === toCurrency) return 1;

  try {
    const rates = await getExchangeRates(fromCurrency);
    return rates[toCurrency] || getFallbackRate(fromCurrency, toCurrency);
  } catch (error) {
    console.error("Error getting exchange rate:", error);
    return getFallbackRate(fromCurrency, toCurrency);
  }
}

// Clear cache (useful for testing or manual refresh)
export function clearExchangeRateCache(): void {
  exchangeRateCache.clear();
}
