import { Product, ProductData } from "@/types/product";
import { createContext, ReactNode, useContext, useState } from "react";


type ProductsContextType = {
  products: Product[];
  addProduct: (data: ProductData) => void;
  updateProduct: (id: string, data: ProductData) => void;
};

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 1500,
    description: "Powerful laptop for work and study",
    imageUrl: "",
  },
  {
    id: "2",
    name: "Headphones",
    price: 120,
    description: "Wireless noise cancelling headphones",
    imageUrl: "",
  },
];

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (data: ProductData) => {
    const newProduct: Product = { id: Date.now().toString(), ...data };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, data: ProductData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...data } : product,
      ),
    );
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}