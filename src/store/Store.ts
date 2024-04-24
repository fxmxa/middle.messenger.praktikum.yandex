import EventBus from '@/utils/EventBus.ts';
import { isPlainObject, merge } from '@/utils/objects.ts';
import { UserResponseType } from '@/types/user.ts';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export type StoreType = {
  user?: UserResponseType
  usersFound?: UserResponseType[]
  chats?: Array<{
    id: number
    title: string
    avatar: string | null
    created_by: number
    unread_count: number
    last_message: {
      user: {
        first_name: string
        second_name: string
        display_name: string | null
        login: string
        avatar: any
      }
      time: string
      content: string
      id: number
    }
  }>
  activeChat?: {
    users: Array<{
      id: number
      first_name: string
      second_name: string
      display_name?: string
      login: string
      avatar?: string
      role: string
    }>
    messages: Array<{
      id: number
      user_id: number
      chat_id: number
      type: string
      time: string
      content: string
      is_read: boolean
      file: any
    }>
    token: string
    id: number
    scroll: boolean
  }
}

export const StoreEvents = {
  Updated: 'updated',
} as const;

class Store extends EventBus {
  private state: StoreType = {};

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

export default new Store();
