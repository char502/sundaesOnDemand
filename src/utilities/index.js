// JS Doc output

// function formatCurrency
// Format number as currency (UK Pounds)

// param {number} amount
// returns {string} number formatted as currency

// example
// formatCurrency(0)
// => £0.00

// example
// formatCurrency
// => £1.50

// format number as currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
}
