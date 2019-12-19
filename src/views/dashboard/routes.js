export default [
  {
    path: '/',
    name: 'home',
    meta: { icon: 'mdi-home', title: 'Home' },
    component: () => import(/* webpackChunkName: "home" */ './Home')
  },
  {
    path: '/index',
    name: 'index',
    meta: { icon: 'mdi-view-dashboard', title: 'Dashboad' },
    component: () => import(/* webpackChunkName: "index" */ './Dashboard')
  }
];
