import EventBus from '@/utils/EventBus.ts';
import { isPlainObject } from '@/utils/objects.ts';

type Indexed<T = unknown> = {
  [key in string]: T;
};
export type UserData = {
  id: number
  first_name: string
  second_name: string
  display_name: any
  login: string
  avatar: any
  email: string
  phone: string
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {

  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    const event = `${StoreEvents.Updated}:${path}`;
    set(this.state, path, value);
    this.emit(event);
  }
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw Error('path must be a string');
  }
  if (!isPlainObject(object)) {
    return object;
  }

  const objFromPath = path.split('.')
    .reverse()
    .reduce((obj, key, index) => {
      const newObj = {} as Indexed;
      newObj[key] = index === 0 ? value : obj as Indexed;
      return newObj;
    }, {});

  return merge(object as Indexed, objFromPath as Indexed);
}
function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.entries(rhs).forEach(([key, value]) => {
    const valIsObj = isPlainObject(value);
    const valInLhs = Object.prototype.hasOwnProperty.call(lhs, key) && isPlainObject(lhs[key]);
    const newVal = valInLhs && valIsObj ? merge(lhs[key] as Indexed, value as Indexed) : value;
    lhs[key] = newVal;
  });
  return lhs;
}

export default new Store();
