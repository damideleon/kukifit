
import { useStorage } from '@vueuse/core'

export class ReactiveLocalStorage<T> {

  public state: ReturnType<typeof useStorage<T>>;

  constructor(key: string, defaultState: T) {
    this.state = useStorage(key, defaultState, localStorage, { mergeDefaults: true });
  }
}
