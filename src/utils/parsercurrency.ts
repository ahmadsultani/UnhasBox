export const parserCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const formattedAmount = formatter
    .format(amount)
    .replace(/\s/g, "")
    .replace("Rp", "");

  return `Rp${formattedAmount}`;
};
