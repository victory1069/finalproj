exports.formatCurrency = (amount, locale = "en-NG", currency = "NGN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
