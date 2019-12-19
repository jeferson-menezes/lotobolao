// import store from '../store';
export default async(to, from, next) => {
  document.title = `${to.meta.title} - Bolão Lotérica`;
  next();
  // if (to.name === 'config') {
  //   next();
  // } else if (to.name !== 'index' && !store.getters['config/hasBolaoId']) {
  //   try {
  //     await store.dispatch('config/checaBolao');

  //     next({ name: to.name });
  //   } catch (error) {
  //     next({ name: 'index' });
  //   }
  // } else {
  //   if (to.name === 'index' && store.getters['config/hasBolaoId']) {
  //     next({ name: 'home' });
  //   } else {
  //     next();
  //   }
  // }
};
