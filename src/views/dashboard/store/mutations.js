import * as types from './mutation-types';

export default {
  [types.SET_CONCURSO](state, payload) {
    state.concurso = payload;
  }
};
