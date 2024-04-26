export type EventCallback<T extends unknown[] = any[]> = (...args:T) => void | boolean | Promise<void>

export default class EventBus {
  listeners: Record<string, EventCallback[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventCallback): void {
    const events = this.listeners[event] ? this.listeners[event] : [];
    events.push(callback);
    this.listeners[event] = events;
  }

  off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`Не существует события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((el) => el !== callback);
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((fn) => {
      fn(...args);
    });
  }
}
