import * as types from './mutation-types';

export default {
  [types.SET_BOLOES](state, payload) {
    state.boloes = payload;
  },
  [types.SET_BOLAO](state, payload) {
    state.bolao = payload;
  }
};
