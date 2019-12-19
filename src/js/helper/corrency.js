import currency from "currency.js";

const formatBr = { separator: ".", decimal: ",", symbol: "R$ ", formatWithSymbol: true, precision: 2 };
const formatUs = { separator: ".", decimal: "," };

export const real = value => currency(+value, formatBr).format();

export const dolar = value => currency(value, formatUs).dollars() + "." + currency(value, formatUs).cents();

export const porcet = (base, valor) => (valor / base) * 100;
