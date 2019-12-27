import { maisSelecionadas } from '../../../js/helper/loteria';

export const numPessoas = ({ participantes }) => participantes.length;
export const numPalpitadas = ({ participantes }) => participantes.filter(e => e.dezenas).length;
export const numPagos = ({ participantes }) => participantes.filter(e => e.pago).length;

export const palpites = ({ participantes }) => {
  const arr = participantes.filter(e => e.dezenas).map(e => e.dezenas);
  return maisSelecionadas(arr);
};

export const palpitou = ({ participante }) => !!participante.dezenas;
