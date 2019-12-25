import * as types from './mutation-types';
import services from '@/http';
export const ActionResultadoConcurso = ({ commit }, concurso) => {
  services.dashboard.megasenaPorConcurso({ concurso: concurso })
    .then(res => res.json())
    .then(data => commit(types.SET_CONCURSO, data.concurso || {}))
    .catch(err => {
      console.log(err);
    });
};
