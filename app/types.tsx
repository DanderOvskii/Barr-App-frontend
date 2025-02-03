export type Product = {
  id: number;
  name: string;
  price: number;
  amount: number;
  category_id: number;
  calorien: number;
  alcohol: number;
  korting: number;
  vooraad: number;
  // Add any other product properties you have
};
export type DisplayProduct = {
  id: number;
  name: string;
  price: string;
  amount: string;
  category_id: number;
  calorien: string;
  alcohol: string;
  korting: string;
  vooraad: string;
};
export type Category = {
  id: number;
  name: string;
};

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export type user = {
  id: number;
  username: string;
  wallet: number;
}