import ProductCard from "@/components/ProductCard";
import { BUTTON_COLOR, buttonShape } from "@/constants/button";
import { useProducts } from "@/context/ProductsContext";
import { router } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { products } = useProducts();

  const openDetails = (id: string) => {
    router.push({ pathname: "/details", params: { id } });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No products yet</Text>}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => openDetails(item.id)} />
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.addText}>+ Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  list: {
    padding: 16,
    paddingBottom: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#777",
  },
  addBtn: {
    margin: 16,
    marginBottom: 28,
    padding: 14,
    backgroundColor: BUTTON_COLOR,
    alignItems: "center",
    ...buttonShape,
  },
  addText: {
    color: "#fff",
    fontSize: 17,
    
    fontWeight: "bold",
  },
});