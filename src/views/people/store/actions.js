import * as types from './mutation-types';
import * as local from '@/views/game/local';
import { firestore } from '@/firebase';

export const ActionListParticipantes = ({ dispatch }, id) => {
  firestore.collection('participante').where('bolaoId', '==', id).get()
    .then(snapshot => {
      if (snapshot.empty) {
        return;
      }
      let lista = [];
      let obj = {};
      snapshot.forEach(doc => {
        obj = doc.data();
        obj.id = doc.id;
        lista.push(obj);
      });
      dispatch('ActionSetParticipantes', lista);
      dispatch('ActionDezenasMais');
    }).catch(err => console.log(err));
};

export const ActionSetParticipantes = ({ commit }, payload) => {
  commit(types.SET_PARTICIPANTES, payload);
};

export const ActionDezenasMais = ({ state, commit, getters }) => {
  const arr = getters.palpites;
  if (!arr) {
    return;
  }
  local.setDezenas(arr);
  const bolao = local.getBolao();
  const dezenas = arr.map(e => e.d).slice(0, +bolao.dezenas);
  commit(types.SET_DEZENAS, dezenas);
};

export const ActionEntrarNoBolao = ({ commit }, bolao) => {
  const pessoaRef = firestore.collection('participante');
  return pessoaRef.add(bolao).then(res => res.id).catch(err => console.log(err));
};

export const ActionGetParticipante = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    firestore.collection('participante').where('nome', '==', payload.nome).where('bolaoId', '==', payload.id)
      .get().then(querySnapshot => resolve(querySnapshot.docs))
      .catch(err => reject(err));
  });
};

export const ActionGetParticipanteForId = ({ commit }, id) => {
  if (!id) {
    return;
  }
  const ref = firestore.collection('participante').doc(id);

  return ref.get().then(doc => {
    if (doc.exists) {
      let obj = doc.data();
      obj.id = doc.id;
      commit(types.SET_PARTICIPANTE, obj);
    }
  }).catch(err => {
    commit(types.SET_PARTICIPANTE, {});
    console.log(err);
  }
  );
};

export const ActionAddDezenas = ({ commit }, payload) => {
  const ref = firestore.collection('participante').doc(payload.id);

  return ref.set({ dezenas: payload.dezenas }, { merge: true })
    .then()
    .catch(err => console.log(err));
};

export const ActionAddImagens = ({ commit }, payload) => {
  const ref = firestore.collection('participante').doc(payload.id);

  return ref.set({ arquivos: payload.arquivos, pago: true }, { merge: true })
    .then()
    .catch(err => console.log(err));
};
