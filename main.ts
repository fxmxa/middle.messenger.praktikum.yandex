import './src/styles/main.scss';
import route from './src/router/index.ts';

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = route;
}
