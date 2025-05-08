import type { Money } from "./Money";

export type ProductCarry = {
  id: string;
  name: string;
  price: Money;
  quantity: number;
}
