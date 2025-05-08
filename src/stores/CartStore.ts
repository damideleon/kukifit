// Utilities
import type { Money } from "@/data/model/Money";
import type { ProductCarry } from "@/data/model/ProductCarry";
import type { ProductItem } from "@/data/model/ProductItem";
import { defineStore } from "pinia";

type CarryState = {
  items: Map<string, ProductCarry>;
};

export const useCartStore = defineStore("cart", {
  state: (): CarryState => ({
    items: new Map<string, ProductCarry>(),
  }),

  actions: {
    setItem(item: ProductItem, quantity: number) {
      this.items.set(item.id, {
        id: item.id,
        name: item.title,
        price: item.price,
        quantity
      });
    },

    removeItem(id: string) {
      this.items.delete(id);
    },

    clear() {
      this.items.clear();
    }
  },

  getters: {
    total(state) {
      return Array.from(state.items.values()).reduce(
        (total, item) => total + item.price.amount * item.quantity,
        0
      );
    }
  }
});
