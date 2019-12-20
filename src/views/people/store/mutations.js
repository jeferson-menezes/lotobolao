import * as types from './mutation-types';

export default {
  [types.SET_PARTICIPANTES](state, payload) {
    state.participantes = payload;
  },
  [types.SET_PARTICIPANTE](state, payload) {
    state.participante = payload;
  },
  [types.SET_DEZENAS](state, payload) {
    state.dezenas = payload;
  }
};
