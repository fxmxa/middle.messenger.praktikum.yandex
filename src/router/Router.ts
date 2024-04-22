import Route from '@/router/Route.ts';
import Block from '@/utils/Block.ts';

export default class Router {
  routes;

  history;

  _currentRoute;

  _rootQuery;

  constructor(rootQuery = '#app') {
    this.routes = [] as Route[];
    this.history = window.history;
    this._currentRoute = null as null | Route;
    this._rootQuery = rootQuery;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this._rootQuery);

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
    const route = this.getRoute(pathname) || this.getRoute('/error400');
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();

    setDocumentTitle(pathname);
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
  const title = convertPath(pathname) || 'Messenger';
  document.title = title;
}

function convertPath(pathname: string) {
  const string = pathname.slice(1).replaceAll('-', ' ');
  return string.replace(string.charAt(0), string.charAt(0).toUpperCase());
}
