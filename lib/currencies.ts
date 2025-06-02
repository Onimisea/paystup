export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  countries?: string[]; // Country codes that use this currency
}

export const currencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    countries: ["US"],
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    countries: [
      "DE",
      "FR",
      "IT",
      "ES",
      "NL",
      "BE",
      "AT",
      "PT",
      "GR",
      "IE",
      "FI",
      "LU",
      "MT",
      "CY",
      "SK",
      "SI",
      "EE",
      "LV",
      "LT",
    ],
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
    countries: ["GB"],
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    flag: "🇯🇵",
    countries: ["JP"],
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    flag: "🇦🇺",
    countries: ["AU"],
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    flag: "🇨🇦",
    countries: ["CA"],
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    flag: "🇨🇭",
    countries: ["CH"],
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    flag: "🇨🇳",
    countries: ["CN"],
  },
  {
    code: "SEK",
    name: "Swedish Krona",
    symbol: "kr",
    flag: "🇸🇪",
    countries: ["SE"],
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    symbol: "NZ$",
    flag: "🇳🇿",
    countries: ["NZ"],
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "$",
    flag: "🇲🇽",
    countries: ["MX"],
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    flag: "🇸🇬",
    countries: ["SG"],
  },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
    symbol: "HK$",
    flag: "🇭🇰",
    countries: ["HK"],
  },
  {
    code: "NOK",
    name: "Norwegian Krone",
    symbol: "kr",
    flag: "🇳🇴",
    countries: ["NO"],
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    flag: "🇿🇦",
    countries: ["ZA"],
  },
  {
    code: "TRY",
    name: "Turkish Lira",
    symbol: "₺",
    flag: "🇹🇷",
    countries: ["TR"],
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    flag: "🇧🇷",
    countries: ["BR"],
  },
  {
    code: "TWD",
    name: "Taiwan Dollar",
    symbol: "NT$",
    flag: "🇹🇼",
    countries: ["TW"],
  },
  {
    code: "DKK",
    name: "Danish Krone",
    symbol: "kr",
    flag: "🇩🇰",
    countries: ["DK"],
  },
  {
    code: "PLN",
    name: "Polish Zloty",
    symbol: "zł",
    flag: "🇵🇱",
    countries: ["PL"],
  },
  {
    code: "THB",
    name: "Thai Baht",
    symbol: "฿",
    flag: "🇹🇭",
    countries: ["TH"],
  },
  {
    code: "IDR",
    name: "Indonesian Rupiah",
    symbol: "Rp",
    flag: "🇮🇩",
    countries: ["ID"],
  },
  {
    code: "HUF",
    name: "Hungarian Forint",
    symbol: "Ft",
    flag: "🇭🇺",
    countries: ["HU"],
  },
  {
    code: "CZK",
    name: "Czech Koruna",
    symbol: "Kč",
    flag: "🇨🇿",
    countries: ["CZ"],
  },
  {
    code: "ILS",
    name: "Israeli Shekel",
    symbol: "₪",
    flag: "🇮🇱",
    countries: ["IL"],
  },
  {
    code: "CLP",
    name: "Chilean Peso",
    symbol: "$",
    flag: "🇨🇱",
    countries: ["CL"],
  },
  {
    code: "PHP",
    name: "Philippine Peso",
    symbol: "₱",
    flag: "🇵🇭",
    countries: ["PH"],
  },
  {
    code: "AED",
    name: "UAE Dirham",
    symbol: "د.إ",
    flag: "🇦🇪",
    countries: ["AE"],
  },
  {
    code: "COP",
    name: "Colombian Peso",
    symbol: "$",
    flag: "🇨🇴",
    countries: ["CO"],
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "﷼",
    flag: "🇸🇦",
    countries: ["SA"],
  },
  {
    code: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM",
    flag: "🇲🇾",
    countries: ["MY"],
  },
  {
    code: "RON",
    name: "Romanian Leu",
    symbol: "lei",
    flag: "🇷🇴",
    countries: ["RO"],
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    flag: "🇳🇬",
    countries: ["NG"],
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    flag: "🇮🇳",
    countries: ["IN"],
  },
  {
    code: "KRW",
    name: "South Korean Won",
    symbol: "₩",
    flag: "🇰🇷",
    countries: ["KR"],
  },
  {
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    flag: "🇷🇺",
    countries: ["RU"],
  },
  {
    code: "HRK",
    name: "Croatian Kuna",
    symbol: "kn",
    flag: "🇭🇷",
    countries: ["HR"],
  },
  {
    code: "BGN",
    name: "Bulgarian Lev",
    symbol: "лв",
    flag: "🇧🇬",
    countries: ["BG"],
  },
  {
    code: "ISK",
    name: "Icelandic Krona",
    symbol: "kr",
    flag: "🇮🇸",
    countries: ["IS"],
  },
  {
    code: "EGP",
    name: "Egyptian Pound",
    symbol: "£",
    flag: "🇪🇬",
    countries: ["EG"],
  },
  {
    code: "PKR",
    name: "Pakistani Rupee",
    symbol: "₨",
    flag: "🇵🇰",
    countries: ["PK"],
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    symbol: "৳",
    flag: "🇧🇩",
    countries: ["BD"],
  },
  {
    code: "LKR",
    name: "Sri Lankan Rupee",
    symbol: "₨",
    flag: "🇱🇰",
    countries: ["LK"],
  },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م.", flag: "🇲🇦" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت", flag: "🇹🇳" },
  { code: "DZD", name: "Algerian Dinar", symbol: "د.ج", flag: "🇩🇿" },
  { code: "LYD", name: "Libyan Dinar", symbol: "ل.د", flag: "🇱🇾" },
  { code: "SDG", name: "Sudanese Pound", symbol: "ج.س.", flag: "🇸🇩" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK", flag: "🇿🇲" },
  { code: "BWP", name: "Botswana Pula", symbol: "P", flag: "🇧🇼" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨", flag: "🇲🇺" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨", flag: "🇸🇨" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT", flag: "🇲🇿" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz", flag: "🇦🇴" },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$", flag: "🇳🇦" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L", flag: "🇸🇿" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L", flag: "🇱🇸" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK", flag: "🇲🇼" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw", flag: "🇷🇼" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu", flag: "🇧🇮" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj", flag: "🇩🇯" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk", flag: "🇪🇷" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh", flag: "🇸🇴" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC", flag: "🇨🇩" },
  {
    code: "XAF",
    name: "Central African CFA Franc",
    symbol: "FCFA",
    flag: "🇨🇫",
  },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA", flag: "🇧🇫" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF", flag: "🇰🇲" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar", flag: "🇲🇬" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$", flag: "🇨🇻" },
  {
    code: "STN",
    name: "São Tomé and Príncipe Dobra",
    symbol: "Db",
    flag: "🇸🇹",
  },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D", flag: "🇬🇲" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG", flag: "🇬🇳" },
  { code: "SLE", name: "Sierra Leonean Leone", symbol: "Le", flag: "🇸🇱" },
  { code: "LRD", name: "Liberian Dollar", symbol: "L$", flag: "🇱🇷" },
  { code: "CIV", name: "Ivorian Franc", symbol: "CFA", flag: "🇨🇮" },
  { code: "BFA", name: "Burkinabé Franc", symbol: "CFA", flag: "🇧🇫" },
  { code: "MLI", name: "Malian Franc", symbol: "CFA", flag: "🇲🇱" },
  { code: "NER", name: "Nigerien Franc", symbol: "CFA", flag: "🇳🇪" },
  { code: "SEN", name: "Senegalese Franc", symbol: "CFA", flag: "🇸🇳" },
  { code: "TGO", name: "Togolese Franc", symbol: "CFA", flag: "🇹🇬" },
  { code: "BEN", name: "Beninese Franc", symbol: "CFA", flag: "🇧🇯" },
];

// Mock exchange rates (in a real app, this would come from an API)
export const exchangeRates: Record<string, Record<string, number>> = {
  NGN: {
    USD: 0.0013,
    EUR: 0.0012,
    GBP: 0.001,
    INR: 0.1,
    JPY: 0.19,
    AUD: 0.002,
    CAD: 0.0018,
    CHF: 0.0012,
    CNY: 0.0094,
    SEK: 0.014,
    NZD: 0.0021,
    MXN: 0.026,
    SGD: 0.0018,
    HKD: 0.01,
    NOK: 0.014,
    ZAR: 0.024,
    TRY: 0.044,
    BRL: 0.0078,
    TWD: 0.041,
    DKK: 0.009,
    PLN: 0.0055,
    THB: 0.047,
    IDR: 20.5,
    HUF: 0.49,
    CZK: 0.031,
    ILS: 0.0048,
    CLP: 1.25,
    PHP: 0.074,
    AED: 0.0048,
    COP: 5.7,
    SAR: 0.0049,
    MYR: 0.0061,
    RON: 0.006,
    KRW: 1.75,
    RUB: 0.13,
  },
  INR: {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    NGN: 9.1,
    JPY: 1.8,
    AUD: 0.018,
    CAD: 0.016,
    CHF: 0.011,
    CNY: 0.086,
    SEK: 0.13,
    NZD: 0.019,
    MXN: 0.24,
    SGD: 0.016,
    HKD: 0.094,
    NOK: 0.13,
    ZAR: 0.22,
    TRY: 0.4,
    BRL: 0.071,
    TWD: 0.37,
    DKK: 0.082,
    PLN: 0.05,
    THB: 0.43,
    IDR: 187,
    HUF: 4.5,
    CZK: 0.28,
    ILS: 0.044,
    CLP: 11.4,
    PHP: 0.67,
    AED: 0.044,
    COP: 52,
    SAR: 0.045,
    MYR: 0.056,
    RON: 0.055,
    KRW: 16,
    RUB: 1.2,
  },
};

export function getCurrencyByCode(code: string): Currency | undefined {
  return currencies.find((currency) => currency.code === code);
}

export function searchCurrencies(query: string): Currency[] {
  const lowercaseQuery = query.toLowerCase();
  return currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(lowercaseQuery) ||
      currency.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) return amount;

  const rate = exchangeRates[fromCurrency]?.[toCurrency];
  if (!rate) return 0;

  return amount * rate;
}

export function calculateFees(amount: number, currency: string): number {
  // Mock fee calculation (typically 0.5% with minimum fee)
  const feePercentage = 0.005; // 0.5%
  const minimumFee = currency === "NGN" ? 50 : currency === "USD" ? 1 : 5;

  const calculatedFee = amount * feePercentage;
  return Math.max(calculatedFee, minimumFee);
}

export function formatCurrency(amount: number, currency: string): string {
  const currencyData = getCurrencyByCode(currency);
  if (!currencyData) return `${amount.toFixed(2)} ${currency}`;

  return `${currencyData.symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getCurrencyByCountry(
  countryCode: string
): Currency | undefined {
  return currencies.find((currency) =>
    currency.countries?.includes(countryCode)
  );
}
