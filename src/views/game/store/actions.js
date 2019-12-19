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

  return Promise.resolve();
};

export const ActionSelecionaBolao = ({ commit }, payload) => {
  commit(types.SET_BOLAO, payload);
  local.setBolao(payload);
};

export const ActionAddBolao = ({ commit }, bolao) => {
  return new Promise((resolve, reject) => {
    const ref = firestore.collection('bolao_db').doc();
    ref.set(bolao).then(e => {
      console.log('Res ', e);
      resolve(e);
    }).catch(er => {
      reject(er);
      console.log('Err ', er);
    });
  });
};

export const ActionListaBoloes = ({ commit }) => {
  let lista = [];
  let obj = {};

  firestore.collection('bolao_db').get()
    .then(res => {
      res.forEach(doc => {
        obj = doc.data();
        obj.id = doc.id;
        lista.push(obj);
        console.log();
      });
      commit(types.SET_BOLOES, lista);
    }).catch(err => {
      console.log('Erro ao buscar os bolões', err);
    });
};

// Storage

export const ActionUploadFile = ({ commit }, payload) => {
  console.log(payload);
  return new Promise((resolve, reject) => {
    const random = Math.random();

    let storageRef = storage.ref(`${payload.ref}/${random}_${payload.file.name}`);

    storageRef.put(payload.file)
      .then(snapshot => console.log('Enviando: ', snapshot)).then(() => storageRef.getDownloadURL())
      .then(url => resolve(url))
      .catch(erro => {
        console.log(erro);
        reject(erro);
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
