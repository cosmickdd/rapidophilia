// Currency formatting utilities
export const formatIndianRupees = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Alternative format with ₹ symbol
export const formatRupeesWithSymbol = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Short format for large amounts (e.g., ₹1.2K)
export const formatRupeesShort = (amount: number): string => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
};