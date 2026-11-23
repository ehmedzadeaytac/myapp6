export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};
export type ProductData = Omit<Product, "id">;