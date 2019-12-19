export default [
  {
    path: '/',
    name: 'home',
    meta: { icon: 'mdi-home', title: 'Home' },
    component: () => import(/* webpackChunkName: "home" */ './Home')
  }
];
