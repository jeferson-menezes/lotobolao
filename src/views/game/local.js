export const setBolao = bolao => localStorage.setItem('bolao', JSON.stringify(bolao));
export const getBolao = () => JSON.parse(localStorage.getItem('bolao'));
export const setDezenas = arr => localStorage.setItem('dezenas', JSON.stringify(arr));
