import { ReactiveLocalStorage } from "./ReactiveLocalStorage";

export class FavoriteProducts extends ReactiveLocalStorage<Array<string>> {
  constructor() {
    super('favoriteProducts', [] as string[])
  }

  add(id: string) {
    const list = new Set([...this.state.value as string[], id]);
    this.state.value = Array.from(list);
  }

}

