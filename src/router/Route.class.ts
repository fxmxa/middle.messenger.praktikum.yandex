import Block from '../utils/Block.ts';

export default class RouteClass {
  private _pathname;

  private _block;

  private _root;

  private _isRendered;

  constructor(pathname: string, block : Block, root: string) {
    this._pathname = pathname;
    this._block = block;
    this._root = root;
    this._isRendered = false;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._isRendered) {
      this._isRendered = render(this._root, this._block);
      return;
    }

    this._block.show();
  }
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}
function render(query: string, block: Block): boolean {
  const root = document.querySelector(query);
  if (!root) {
    return false;
  }
  root.appendChild(block.getContent());
  return true;
}
