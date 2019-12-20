export default [
  {
    path: '/game',
    name: 'game',
    meta: { icon: 'fa-cogs', title: 'Game' },
    component: () => import(/* webpackChunkName: "config" */ './NewGame')
  },
  {
    path: '/listGame',
    name: 'listGame',
    meta: { icon: 'mdi-view-grid', title: 'Bolões' },
    component: () => import(/* webpackChunkName: "index" */ './ListGame')
  }
];
