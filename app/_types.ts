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
  discount_price?: number; // Optional field for discounted price
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
  isAdmin: boolean;
}

export type updateUserType ={
  username: string;
  password?: string;
  wallet: number;
}

export type Purchase = {
  id: number; 
  product_name: string;
  amount: number;
  product_price: number;
  total_price: number;
  discount: number;
  purchase_date: string;
}

export type stats = {
  products_bought: number;
  total_spent: number;
  calories_consumed: number;
  alcohol_consumed: number;
}