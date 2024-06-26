import RouteClass from './Route.class.ts';
import Block from '../utils/block/Block.ts';

export default class RouterClass {
  routes;

  history;

  _currentRoute;

  _rootQuery;

  constructor(rootQuery = '#app') {
    this.routes = [] as RouteClass[];
    this.history = window.history;
    this._currentRoute = null as null | RouteClass;
    this._rootQuery = rootQuery;
  }

  use(pathname: string, block: Block) {
    const route = new RouteClass(pathname, block, this._rootQuery);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event) => {
      const target = event.currentTarget as Document;
      if (!target) {
        return;
      }
      this._onRoute(target.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const path = pathname.length > 1 && pathname.at(-1) === '/' ? pathname.slice(0, -1) : pathname;

    const route = this.getRoute(path) || this.getRoute('/error400');
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();

    setDocumentTitle(path);
  }

  go(pathname: string) {
    this.history.pushState({ pathname }, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

function setDocumentTitle(pathname: string) {
  const title = convertPath(pathname) || 'Sign in';
  document.title = title;
}

function convertPath(pathname: string) {
  const string = pathname.slice(1).replaceAll('-', ' ');
  return string.replace(string.charAt(0), string.charAt(0).toUpperCase());
}
