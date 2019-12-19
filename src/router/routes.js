import { routes as dashboard } from '../views/dashboard';
import { routes as people } from '../views/people';
import { routes as game } from '../views/game';

export default [
  ...dashboard,
  ...people,
  ...game
];
