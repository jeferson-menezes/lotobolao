import store from '../store';
export default async(to, from, next) => {
  document.title = `${to.meta.title} - Bolão Lotérica`;

  if (to.name === 'game') {
    next();
  } else if (to.name !== 'listGame' && !store.getters['game/hasBolaoId']) {
    try {
      await store.dispatch('game/ActionChecaBolao');

      next({ name: to.name });
    } catch (error) {
      next({ name: 'listGame' });
    }
  } else {
    if (to.name === 'listGame' && store.getters['game/hasBolaoId']) {
      next({ name: 'home' });
    } else {
      next();
    }
  }
};
