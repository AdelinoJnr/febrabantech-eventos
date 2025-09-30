export const formatCurrency = (value: number | string | null | undefined): string => {
  const numberValue = Number(value) || 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
}