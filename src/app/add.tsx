import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/context/ProductsContext";
import { ProductData } from "@/types/product";
import { router } from "expo-router";

export default function AddProductScreen() {
  const { addProduct } = useProducts();

  const handleSubmit = (data: ProductData) => {
    addProduct(data);
    router.back();
  };

  return <ProductForm submitLabel="Add Product" onSubmit={handleSubmit} />;
}