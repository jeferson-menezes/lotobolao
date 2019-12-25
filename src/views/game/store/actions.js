/* eslint-disable prefer-promise-reject-errors */
import * as types from './mutation-types';
import * as local from '../local';
import { firestore, storage } from '@/firebase';

export const ActionChecaBolao = ({ dispatch, state }) => {
  if (state.bolao.id) {
    return Promise.resolve(state.bolao.id);
  }

  const bolao = local.getBolao();

  if (!bolao.id) {
    return Promise.reject(new Error('Bolão inválido'));
  }

  dispatch('ActionSelecionaBolao', bolao);

  return dispatch('ActionLoadBolao', bolao.id);
};

export const ActionLoadBolao = ({ dispatch }, payload) => {
  return new Promise(async(resolve, reject) => {
    const ref = firestore.collection('bolao_db').doc(payload);
    ref.get().then(doc => {
      if (doc.exists) {
        let obj = doc.data();
        obj.id = doc.id;
        dispatch('ActionSelecionaBolao', obj);
        resolve();
      } else {
        dispatch('ActionDescelecionaBolao');
        reject('Bolão não localizado');
      }
    }).catch(err => {
      dispatch('ActionDescelecionaBolao');
      reject(err);
    });
  });
};

export const ActionSelecionaBolao = ({ commit }, payload) => {
  commit(types.SET_BOLAO, payload);
  local.setBolao(payload);
};

export const ActionDescelecionaBolao = ({ commit }) => {
  commit(types.SET_BOLAO, {});
  local.setBolao('');
};

export const ActionAddBolao = ({ commit }, bolao) => {
  return new Promise((resolve, reject) => {
    const ref = firestore.collection('bolao_db').doc();
    ref.set(bolao).then(e => {
      resolve(e);
    }).catch(er => {
      reject(er);
      console.log(er);
    });
  });
};

export const ActionListaBoloes = ({ dispatch }) => {
  let lista = [];
  let obj = {};

  firestore.collection('bolao_db').get()
    .then(res => {
      res.forEach(doc => {
        obj = doc.data();
        obj.id = doc.id;
        lista.push(obj);
      });
      dispatch('ActionSetBoloes', lista);
    }).catch(err => {
      console.log(err);
    });
};

export const ActionSetBoloes = ({ commit }, payload) => {
  commit(types.SET_BOLOES, payload);
};

// Storage
export const ActionUploadFile = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    const random = Math.random();

    let storageRef = storage.ref(`${payload.ref}/${random}_${payload.file.name}`);

    let uploadTask = storageRef.put(payload.file);

    uploadTask.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      commit(types.SET_PROGRESS, progress);
    }, erro => {
      console.log(erro);
      reject(erro);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        resolve(url);
      }).catch(err => reject(err));
    });
  });
};

export const ActionDeleteFile = ({ commit }, image) => {
  return new Promise((resolve, reject) => {
    let imageRef = storage.refFromURL(image);

    imageRef.delete()
      .then(() => resolve())
      .catch(erro => {
        reject(erro);
      });
  });
};

export const ActionDeleteFileAll = ({ commit }, images) => {
  let erros = [];
  return new Promise((resolve, reject) => {
    images.forEach(img => {
      let imageRef = storage.refFromURL(img.url);
      imageRef.delete().then().catch(erro => {
        erros.push(erro);
      });
    });
    if (erros.length) {
      reject(erros);
    }
    resolve();
  });
};
