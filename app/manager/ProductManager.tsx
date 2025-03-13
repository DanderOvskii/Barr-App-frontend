import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import {
  getAllData,
  updateProduct,
  deleteProduct,
  createProduct,
  createCategory,
  deleteCategory
} from "../../backend/productmanagerAPI";
import { Product, CategoryWithProducts, DisplayProduct } from "../types";
export default function ProductManager() {
  console.log("ProductManager rendered");
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const currentCategoryProducts =
    selectedCategory && categories?.length > 0
      ? categories.find((cat) => cat.id === selectedCategory)?.products || []
      : [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAllData();
        console.log("gotDATATATA");
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

  const handleProductChange = (field: keyof Product, value: string) => {
    if (!editedProduct) return;

    const formattedValue = value.replace(",", ".");

    setEditedProduct({
      ...editedProduct,
      [field]: field === "name" ? value : formattedValue,
    });
  };

  //--------------------------------------------------------------------------------
  const handleCancel = () => {
    setEditedProduct(selectedProduct);
  };

  //--------------------------------------------------------------------------------
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
      if (editedProduct.amount.toString() !== original?.amount.toString()) {
        changes.amount =
          parseFloat(editedProduct.amount as unknown as string) || 0;
      }

      if (editedProduct.calorien.toString() !== original?.calorien.toString()) {
        changes.calorien =
          parseFloat(editedProduct.calorien as unknown as string) || 0;
      }

      if (editedProduct.alcohol.toString() !== original?.alcohol.toString()) {
        changes.alcohol =
          parseFloat(editedProduct.alcohol as unknown as string) || 0;
      }
      if (editedProduct.vooraad.toString() !== original?.vooraad.toString()) {
        changes.vooraad =
          parseFloat(editedProduct.vooraad as unknown as string) || 0;
      }
      if (editedProduct.korting.toString() !== original?.korting.toString()) {
        changes.korting =
          parseFloat(editedProduct.korting as unknown as string) || 0;
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

  //--------------------------------------------------------------------------------
  const addProduct = async (categoryId: number) => {
    try {
      const newProduct: DisplayProduct = {
        id: 0,
        name: "",
        price: "",
        amount: "",
        category_id: categoryId,
        calorien: "",
        alcohol: "",
        vooraad: "",
        korting: "",
      };

      // When creating product, convert empty strings to 0
      const productToCreate: Product = {
        ...newProduct,
        price: Number(newProduct.price) || 0,
        amount: Number(newProduct.amount) || 0,
        calorien: Number(newProduct.calorien) || 0,
        alcohol: Number(newProduct.alcohol) || 0,
        vooraad: Number(newProduct.vooraad) || 0,
        korting: Number(newProduct.korting) || 0,
      };

      const createdProduct = await createProduct(productToCreate);

      // Set the created product with empty string values for display
      setCategories((prevCategories) =>
        prevCategories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              products: [
                ...category.products,
                {
                  ...createdProduct,
                  price: "",
                  amount: "",
                  calorien: "",
                  alcohol: "",
                  vooraad: "",
                  korting: "",
                },
              ],
            };
          }
          return category;
        })
      );

      setSelectedProduct({
        ...createdProduct,
        price: "",
        amount: "",
        calorien: "",
        alcohol: "",
        vooraad: "",
        korting: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      Alert.alert("Error", "Failed to create new product");
    }
  };

  //--------------------------------------------------------------------------------
  const handeleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      setIsSaving(true);
      await deleteProduct(selectedProduct.id);
      // Refresh the product list after deletion
      const updatedData = await getAllData();
      setCategories(updatedData);
      setSelectedProduct(
        selectedCategory
          ? updatedData.find(
              (cat: CategoryWithProducts) => cat.id === selectedCategory
            )?.products[0] || null
          : null
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "Failed to delete product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCatogory = async () => {
    if (isAddingCategory && newCategoryName.trim()) {
      try {
        const newCategory = await createCategory({
          name: newCategoryName.trim(),
        });
        setCategories([...categories, { ...newCategory, products: [] }]);
        setNewCategoryName("");
        setIsAddingCategory(false);
        Alert.alert("Success", "Category added successfully");
      } catch (error) {
        console.error("Error creating category:", error);
        Alert.alert("Error", "Failed to create category");
      }
    } else {
      setIsAddingCategory(true);
    }
  };

  const handeleDeleteCategory = async () => {
    if (!selectedCategory) return;
    try {
      setIsSaving(true);
      await deleteCategory(selectedCategory);
      // Refresh the product list after deletion
      const updatedData = await getAllData();
      setCategories(updatedData);
      
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "Failed to delete product");
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
          {isAddingCategory ? (
            <View style={styles.addCategoryContainer}>
              <TextInput
                style={styles.input}
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                placeholder="Category name"
                placeholderTextColor="#999"
                autoFocus
              />
              <View style={styles.addCategoryButtons}>
                <TouchableOpacity
                  style={[styles.cancleButton, { flex: 1 }]}
                  onPress={() => {
                    setIsAddingCategory(false);
                    setNewCategoryName("");
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  onPress={handleAddCatogory}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsAddingCategory(true)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.deleteButton, isSaving && styles.deleteButton]}
            onPress={handeleDeleteCategory}
            disabled={isSaving}
          >
            <Text style={styles.buttonText}>delete</Text>
          </TouchableOpacity>
        </View>

        {/* Products Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Product</Text>
          <ScrollView
            style={styles.scrollableColumn}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
          >
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
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => selectedCategory && addProduct(selectedCategory)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Product Info Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Product Info</Text>
          {selectedProduct ? (
            <ScrollView
              style={styles.scrollableColumn}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={true}
            >
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
                  value={editedProduct?.price.toString() || ""}
                  onChangeText={(value) => handleProductChange("price", value)}
                  placeholder="Enter price"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>hoeveelheid g/ml</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.amount.toString() || ""}
                  onChangeText={(value) => handleProductChange("amount", value)}
                  placeholder="Enter amount"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Calorieën</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.calorien.toString() || ""}
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
                  value={editedProduct?.alcohol.toString() || ""}
                  onChangeText={(value) =>
                    handleProductChange("alcohol", value)
                  }
                  placeholder="Enter alcohol content"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>korting</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.korting.toString() || ""}
                  onChangeText={(value) =>
                    handleProductChange("korting", value)
                  }
                  placeholder="Enter korting"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>vooraad</Text>
                <TextInput
                  style={styles.input}
                  value={editedProduct?.vooraad.toString() || ""}
                  onChangeText={(value) =>
                    handleProductChange("vooraad", value)
                  }
                  placeholder="Enter vooraad"
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
              <TouchableOpacity
                style={[styles.deleteButton, isSaving && styles.deleteButton]}
                onPress={handeleDeleteProduct}
                disabled={isSaving}
              >
                <Text style={styles.buttonText}>delete</Text>
              </TouchableOpacity>
            </ScrollView>
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
    flex: 1,
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
  saveButton: {
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
  cancleButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff6347",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#dc3545",
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
    marginBottom: 5,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
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

  savingButton: {
    backgroundColor: "#999",
  },
  scrollableColumn: {
    flexGrow: 1, // Changed from flex: 1
    width: "100%",
    height: "100%",
  },
  addCategoryContainer: {
    width: "100%",
    gap: 10,
  },
  addCategoryButtons: {
    flexDirection: "row",
    gap: 10,
  },
});
