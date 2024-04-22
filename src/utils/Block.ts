import EventBus, { EventCallback } from '@/utils/EventBus.ts';
import insertProps from '@/utils/insertProps.ts';

type PropsFunc = (...args: string[]) => void
export type Props = Record<string, string | PropsFunc | string[]>

export type ElementEvent = {
  event: string,
  callback: EventCallback
}

export default class Block {
  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element: HTMLElement;

  _meta;

  tmpl: string;

  children;

  events;

  eventBus;

  props: Props;

  needUpdate;

  newPropsCount;

  constructor(
    props: Props,
    tmpl: string,
    tagName = 'div',
    children: Block[] = [],
    events: ElementEvent[] = [],
  ) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.newPropsCount = 0;
    this.needUpdate = [] as boolean[];
    this.events = events;
    this.children = children;
    this.props = this._makePropsProxy(props);
    this.eventBus = (): EventBus => eventBus;
    this.tmpl = tmpl;
    this._element = this._createDocumentElement(tagName);
    this._registerEvents(eventBus);

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _removeEvents() {
    this.events.forEach(({ event, callback }) => {
      if (!event || !callback) {
        return;
      }
      this._element?.removeEventListener(event, callback);
    });
  }

  _removeAttributes() {
    [...this._element.attributes].filter((attr) => this._element.removeAttribute(attr.name));
  }

  _addEvents() {
    this.events.forEach(({ event, callback }) => {
      if (!event || !callback) {
        return;
      }
      this._element?.addEventListener(event, callback.bind(this));
    });
  }

  _componentDidMount(oldProps: Props) {
    this.componentDidMount(oldProps);
  }

  componentDidMount(oldProps: Props) {
    console.log(oldProps);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    this._removeEvents();
    this._removeAttributes();
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (Object.keys(oldProps).length !== Object.keys(newProps).length) {
      return true;
    }
    const propChanged = Object.keys(oldProps).find((key) => oldProps[key] !== newProps[key]);

    return propChanged !== undefined;
  }

  setProps = (newProps: Props) => {
    if (!newProps) {
      return;
    }
    this.needUpdate = [];
    this.newPropsCount = Object.keys(newProps).length;
    Object.assign(this.props, newProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    if (!this._element) return;

    const tempElement = this._createDocumentElement('div');
    tempElement.innerHTML = block;
    const tempElementInner = tempElement.children[0];

    const tempElementHtml = tempElementInner.innerHTML?.trim() ?? '';
    const tempElementAttrs = tempElementInner.attributes;

    this._element.innerHTML = tempElementHtml;
    if (tempElementAttrs) {
      [...tempElementAttrs].forEach((attr) => this._element?.setAttribute(attr.nodeName, attr?.nodeValue ?? ''));
    }
    this.children.forEach((child) => this._element.appendChild(child.getContent()));
    tempElement.remove();
    this._addEvents();
  }

  render() {
    return insertProps(this.tmpl, this.props);
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: PropsFunc) {
        const oldProps = structuredClone(props);
        const newProps = target;
        newProps[prop] = value;

        // TODO: why update 2 times when object with 2 props
        self.needUpdate.push(self.componentDidUpdate(oldProps, newProps));

        const isLastSet = self.needUpdate.length === self.newPropsCount;
        const needUpdate = self.needUpdate.some((el) => el);
        if (isLastSet && needUpdate) {
          self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const element = this.getContent();
    if (!element) return;
    element.style.display = 'flex';
  }

  hide() {
    const element = this.getContent();
    if (!element) return;
    element.style.display = 'none';
  }
}
