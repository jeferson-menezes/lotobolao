export const setBolao = bolao => localStorage.setItem('bolao', JSON.stringify(bolao));
export const getBolao = () => JSON.parse(localStorage.getItem('bolao'));
