export default [
  {
    path: '/enter',
    name: 'enter',
    meta: { icon: 'mdi-clover', title: 'Participar' },
    component: () => import(/* webpackChunkName: "enter" */ './EnterPeople')
  },
  {
    path: '/list',
    name: 'list',
    meta: { icon: 'mdi-account-group', title: 'Participantes' },
    component: () => import(/* webpackChunkName: "list" */ './ListPeople')
  },
  {
    path: '/hint/:id',
    name: 'hint',
    meta: { icon: 'mdi-horseshoe', title: 'Palpite' },
    component: () => import(/* webpackChunkName: "hint" */ './Hint')
  }
];
