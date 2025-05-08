import type { Money } from "./Money";

export type ProductItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: Money;
  discountPercentage?: number;
  rating: number;
  stock?: number;
  brand?: string;
  category: Set<string>;
  thumbnail?: string;
  images: string[];
}
