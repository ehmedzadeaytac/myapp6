import { BUTTON_COLOR, buttonShape } from "@/constants/button";
import { ProductData } from "@/types/product";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

type ProductFormProps = {
  initialValues?: ProductData;
  submitLabel: string;
  onSubmit: (data: ProductData) => void;
};

export default function ProductForm({
  initialValues,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState<string>(initialValues?.name ?? "");
  const [price, setPrice] = useState<string>(
    initialValues ? String(initialValues.price) : "",
  );
  const [description, setDescription] = useState<string>(
    initialValues?.description ?? "",
  );
  const [imageUrl, setImageUrl] = useState<string>(
    initialValues?.imageUrl ?? "",
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const parsedPrice = Number(price.replace(",", "."));

    if (
      !name.trim() ||
      !description.trim() ||
      !price.trim() ||
      isNaN(parsedPrice) ||
      parsedPrice <= 0
    ) {
      Alert.alert("Error", "Please fill in name, price and description!");
      return;
    }

    onSubmit({
      name: name.trim(),
      price: parsedPrice,
      description: description.trim(),
      imageUrl,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.imageHint}>📷 Choose image</Text>
          )}
        </TouchableOpacity>
        {imageUrl ? (
          <Text style={styles.changeHint}>Tap image to change</Text>
        ) : null}

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Product name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="decimal-pad"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Product description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>{submitLabel}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  imageBox: {
    width: 160,
    height: 160,
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "#eef1f5",
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageHint: {
    fontSize: 16,
    color: "#555",
  },
  changeHint: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 12,
    color: "#777",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
  },
  submitBtn: {
    marginTop: 24,
    padding: 14,
    backgroundColor: BUTTON_COLOR,
    alignItems: "center",
    ...buttonShape,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});