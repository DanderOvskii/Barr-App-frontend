export type Product = {
    id: number;
    name: string;
    price: number;
    category_id: number;
    calorien:number;
    alcohol:number;
    // Add any other product properties you have
  };
export type Category = {
    id: number;
    name: string;
  };

  export interface CategoryWithProducts extends Category {
    products: Product[];
  }