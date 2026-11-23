import { ProductsProvider } from "@/context/ProductsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ProductsProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Products" }} />
        <Stack.Screen name="details" options={{ title: "Product Details" }} />
        <Stack.Screen name="add" options={{ title: "Add Product" }} />
      </Stack>
    </ProductsProvider>
  );
}