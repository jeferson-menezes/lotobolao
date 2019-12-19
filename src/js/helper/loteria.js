export const acertos = (jogado, resultado) => jogado.filter(a => resultado.includes(a));
export const erros = (jogado, resultado) => jogado.filter(a => !resultado.includes(a));
export const maisSelecionadas = list => {
  let map = new Map();
  let arr = [];
  list.flat().forEach(e => {
    if (map.has(e)) {
      map.set(e, map.get(e) + 1);
    } else {
      map.set(e, 1);
    }
  });

  map.forEach((value, key) => {
    arr.push({ d: key, q: value });
  });
  arr.sort((a, b) => (a.q > b.q) ? 1 : (a.q < b.q) ? -1 : 0);
  return arr.reverse();
};
