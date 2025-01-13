import React from "react";
import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { createProduct } from "../../backend/getData"; // Import createProduct

export default function AddProduct({ selectedCategory= number}) {
  const handleAddProduct = async () => {
    if (!selectedCategory) {
      Alert.alert("Error", "Please select a category before adding a product.");
      return;
    }

    // Default values for the new product
    const newProduct = {
      name: "New Product",
      price: 0,
      calorien: 0,
      alcohol: 0,
      categoryId: selectedCategory, // Add the selected category ID
    };

    try {
      // Call the API to create a new product
      const createdProduct = await createProduct(newProduct);

      // Update the categories state with the new product
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (cat.id === selectedCategory) {
            return {
              ...cat,
              products: [...cat.products, createdProduct], // Add the new product to the current category
            };
          }
          return cat;
        })
      );

      Alert.alert("Success", "Product created successfully");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create product");
    }
  };

  return (
    <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff6347", // Tomato color for add button
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
});
