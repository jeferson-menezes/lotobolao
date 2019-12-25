const jogos = [{ id: 1, nome: 'Mega-Sena' }, { id: 2, nome: 'Lotofácil' }, { id: 2, nome: 'Lotomania' }];
const dezenasMega = [
  { dezena: 1, texto: '01' }, { dezena: 2, texto: '02' }, { dezena: 3, texto: '03' }, { dezena: 4, texto: '04' }, { dezena: 5, texto: '05' }, { dezena: 6, texto: '06' }, { dezena: 7, texto: '07' }, { dezena: 8, texto: '08' }, { dezena: 9, texto: '09' }, { dezena: 10, texto: '10' },
  { dezena: 11, texto: '11' }, { dezena: 12, texto: '12' }, { dezena: 13, texto: '13' }, { dezena: 14, texto: '14' }, { dezena: 15, texto: '15' }, { dezena: 16, texto: '16' }, { dezena: 17, texto: '17' }, { dezena: 18, texto: '18' }, { dezena: 19, texto: '19' }, { dezena: 20, texto: '20' },
  { dezena: 21, texto: '21' }, { dezena: 22, texto: '22' }, { dezena: 23, texto: '23' }, { dezena: 24, texto: '24' }, { dezena: 25, texto: '25' }, { dezena: 26, texto: '26' }, { dezena: 27, texto: '27' }, { dezena: 28, texto: '28' }, { dezena: 29, texto: '29' }, { dezena: 30, texto: '30' },
  { dezena: 31, texto: '31' }, { dezena: 32, texto: '32' }, { dezena: 33, texto: '33' }, { dezena: 34, texto: '34' }, { dezena: 35, texto: '35' }, { dezena: 36, texto: '36' }, { dezena: 37, texto: '37' }, { dezena: 38, texto: '38' }, { dezena: 39, texto: '39' }, { dezena: 40, texto: '40' },
  { dezena: 41, texto: '41' }, { dezena: 42, texto: '42' }, { dezena: 43, texto: '43' }, { dezena: 44, texto: '44' }, { dezena: 45, texto: '45' }, { dezena: 46, texto: '46' }, { dezena: 47, texto: '47' }, { dezena: 48, texto: '48' }, { dezena: 49, texto: '49' }, { dezena: 50, texto: '50' },
  { dezena: 51, texto: '51' }, { dezena: 52, texto: '52' }, { dezena: 53, texto: '53' }, { dezena: 54, texto: '54' }, { dezena: 55, texto: '55' }, { dezena: 56, texto: '56' }, { dezena: 57, texto: '57' }, { dezena: 58, texto: '58' }, { dezena: 59, texto: '59' }, { dezena: 60, texto: '60' }
];
const urlLoteria = 'http://confiraloterias.com.br/api0/json.php?loteria=megasena&token';
const urlKey = '=9yNMw5h0K2QTUEC';

export const loterias = () => jogos;
export const getLoteria = id => jogos.find(e => e.id === id);
export const getDezenasMega = () => dezenasMega;
export const getUrl = () => `${urlLoteria}${urlKey}`;
export const getDezenasTexto = arr => {
  let list = [];
  let obj = {};
  arr.forEach(dezena => {
    obj = dezenasMega.find(e => e.dezena === dezena);
    list.push(obj.texto);
  });
  return list;
};
