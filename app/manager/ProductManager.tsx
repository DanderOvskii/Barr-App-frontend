import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getAllData, updateProduct } from "../../backend/getData";
import { Product, CategoryWithProducts } from "../types";
import addproduct from "./addproduct";
export default function ProductManager() {
  console.log("ProductManager rendered");
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAllData();
        setCategories(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct(selectedProduct);
    } else {
      setEditedProduct(null);
    }
  }, [selectedProduct]);

  const currentCategoryProducts = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)?.products || []
    : [];

  const handleProductChange = (field: keyof Product, value: string) => {
    if (!editedProduct) return;

    const formattedValue = value.replace(",", ".");

    setEditedProduct({
      ...editedProduct,
      [field]: field === "name" ? value : formattedValue,
    });
  };
  const handleCancel = () => {
    setEditedProduct(selectedProduct);
  };
  const handleSave = async () => {
    if (!editedProduct || !selectedCategory) return;

    try {
      setIsSaving(true);

      // Only send changed fields
      const changes: Partial<Product> = {};
      const original = selectedProduct;

      // Compare and only include changed fields
      if (editedProduct.name !== original?.name)
        changes.name = editedProduct.name;
      if (editedProduct.price.toString() !== original?.price.toString()) {
        changes.price =
          parseFloat(editedProduct.price as unknown as string) || 0;
      }

      if (editedProduct.calorien.toString() !== original?.calorien.toString()) {
        changes.calorien =
          parseFloat(editedProduct.calorien as unknown as string) || 0;
      }
      
      if (editedProduct.alcohol.toString() !== original?.alcohol.toString()) {
        changes.alcohol =
          parseFloat(editedProduct.alcohol as unknown as string) || 0;
      }
      // Only make API call if there are actual changes
      if (Object.keys(changes).length > 0) {
        const updatedProduct = await updateProduct(editedProduct.id, changes);

        // Update local state with the response from server
        setCategories(
          categories.map((cat) => {
            if (cat.id === selectedCategory) {
              return {
                ...cat,
                products: cat.products.map((p) =>
                  p.id === updatedProduct.id ? updatedProduct : p
                ),
              };
            }
            return cat;
          })
        );

        // Update selected product with server response
        setSelectedProduct(updatedProduct);
        setEditedProduct(updatedProduct);

        // Optional: Show success message
        Alert.alert("Success", "Product updated successfully");
      }
    } catch (error) {
      // Better error handling
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update product";
      Alert.alert("Error", errorMessage);
      console.error("Error saving product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Categories Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Categorie</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.button,
                selectedCategory === category.id && styles.selectedButton,
              ]}
              onPress={() => {
                setSelectedCategory(category.id);
                setSelectedProduct(null); // Reset selected product when changing category
              }}
            >
              <Text style={styles.buttonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Products Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Product</Text>
          {currentCategoryProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.button,
                selectedProduct?.id === product.id && styles.selectedButton,
              ]}
              onPress={() => setSelectedProduct(product)}
            >
              <Text style={styles.buttonText}>{product.name}</Text>
            </TouchableOpacity>
          ))}
          {selectedCategory && (
         <TouchableOpacity style={styles.addButton} 
         onPress={() => selectedCategory && addproduct(selectedCategory)}>
         <Text style={styles.buttonText}>+</Text>
       </TouchableOpacity>
          )}
        </View>

        {/* Product Info Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Product Info</Text>
          {selectedProduct ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Naam</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.name}
                  onChangeText={(value) => handleProductChange("name", value)}
                  placeholder="Enter name"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Prijs</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.price.toString()}
                  onChangeText={(value) => handleProductChange("price", value)}
                  placeholder="Enter price"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Calorieën</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.calorien.toString()}
                  onChangeText={(value) =>
                    handleProductChange("calorien", value)
                  }
                  placeholder="Enter calories"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Alcohol per 100ml</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.alcohol.toString()}
                  onChangeText={(value) =>
                    handleProductChange("alcohol", value)
                  }
                  placeholder="Enter alcohol content"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <TouchableOpacity
                style={[styles.saveButton, isSaving && styles.savingButton]}
                onPress={handleSave}
                disabled={isSaving}
              >
                <Text style={styles.buttonText}>
                  {isSaving ? "Saving..." : "Save"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancleButton, isSaving && styles.savingButton]}
                onPress={handleCancel}
                disabled={isSaving}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
            </>
          ) : (
            <Text style={styles.noSelection}>
              Select a product to view details
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  columnHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: "#2e7d32", // darker green for selected state
  },
  addButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff6347", // tomato color for add button
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
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  noSelection: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  saveButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  savingButton: {
    backgroundColor: "#999",
  },
  cancleButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff6347",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
