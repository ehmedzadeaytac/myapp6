import ProductForm from "@/components/ProductForm";
import { useProducts } from "@/context/ProductsContext";
import { ProductData } from "@/types/product";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, updateProduct } = useProducts();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Product not found</Text>
      </View>
    );
  }

  const handleSubmit = (data: ProductData) => {
    updateProduct(product.id, data);
    router.back();
  };

  return (
    <ProductForm
      initialValues={{
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
      }}
      submitLabel="Save"
      onSubmit={handleSubmit}
    />
  );
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    color: "#777",
  },
});