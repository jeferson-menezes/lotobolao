export default [
  {
    path: '/enter',
    name: 'enter',
    meta: { icon: 'fa-cogs', title: 'Participar' },
    component: () => import(/* webpackChunkName: "enter" */ './EnterPeople')
  },
  {
    path: '/list',
    name: 'list',
    meta: { icon: 'fa-list', title: 'Participantes' },
    component: () => import(/* webpackChunkName: "list" */ './ListPeople')
  }
];
