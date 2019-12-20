import { maisSelecionadas } from '../../../js/helper/loteria';
export const palpites = ({ participantes }) => {
  const arr = participantes.filter(e => e.dezenas).map(e => e.dezenas);
  return maisSelecionadas(arr);
};
