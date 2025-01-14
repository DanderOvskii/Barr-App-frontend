import { createProduct } from "../../backend/getData";
import { Product } from "../types";
import { Alert } from "react-native";

const addProduct = (categoryId: number) => {
  if (!categoryId) {
    Alert.alert("Error", "No category selected");
    return;
  }

  const newProduct: Partial<Product> = {
    name: "New Product",
    price: 0,
    category_id: categoryId,
    calorien: 0,
    alcohol: 0
  };

  createProduct(newProduct)
    .then(() => Alert.alert("Success", "Product created successfully"))
    .catch((error) => {
      Alert.alert("Error", "Failed to create product");
      console.error(error);
    });
};

export default addProduct;