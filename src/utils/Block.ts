import EventBus, { EventCallback } from '@/utils/EventBus.ts';
import insertProps from '@/utils/insertProps.ts';

type PropsFunc = (...args: string[]) => void
export type Props = Record<string, string | PropsFunc | string[]>

type Meta = {
  tagName: string,
  props: Props,
}

export type ElementEvent = {
  event: string,
  callback: EventCallback
}

export default class Block {
  static EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element: HTMLElement;

  _meta: Meta;

  tmpl: string;

  children;

  events;

  eventBus;

  props: Props;

  constructor(
    props: Props,
    tmpl: string,
    tagName = 'div',
    children:Block[] = [],
    events: ElementEvent[] = [],
  ) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
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

    this.events.forEach(({ event, callback }) => {
      this._element.addEventListener(event, callback);
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

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (Object.keys(oldProps).length !== Object.keys(newProps).length) {
      return true;
    }
    const propChanged = Object.keys(oldProps).find((key) => oldProps[key] !== newProps[key]);

    return propChanged !== undefined;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
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
  }

  render() {
    return insertProps(this.tmpl, this.props);
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value: PropsFunc) {
        const oldProps = structuredClone(props);
        const newPops = target;
        newPops[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newPops);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    const element = this.getContent();
    if (!element) return;
    element.style.display = 'block';
  }

  hide() {
    const element = this.getContent();
    if (!element) return;
    element.style.display = 'none';
  }
}
