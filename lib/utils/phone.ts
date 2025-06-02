export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format as XXX XXX XX XX for Nigerian numbers
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`;
};

export const validatePhoneNumber = (phoneNumber: string, countryCode: string): boolean => {
  const numbers = phoneNumber.replace(/\D/g, '');
  
  switch (countryCode) {
    case '+234': // Nigeria
      return numbers.length === 10 && numbers.startsWith('0') === false;
    case '+1': // US/Canada
      return numbers.length === 10;
    case '+44': // UK
      return numbers.length >= 10 && numbers.length <= 11;
    case '+91': // India
      return numbers.length === 10;
    default:
      return numbers.length >= 7 && numbers.length <= 15;
  }
};
