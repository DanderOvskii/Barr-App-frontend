import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function ProductManager() {
  const categories = ["bier", "snoep", "friss", "frituur"];
  const products = ["haribo", "bueno", "autodrop", "snicker", "sterrenmix", "chips"];
  const productInfo = ["naam", "$2.-", "hoeveelheid", "calorieen", "alcohol 100ml"];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Categories Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Categorie</Text>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Products Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Product</Text>
          {products.map((product, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{product}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Product Info Column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Verkocht Info</Text>
          {productInfo.map((info, index) => (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{info}</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${info}`}
                placeholderTextColor="#999"
              />
            </View>
          ))}
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
  addButton: {
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
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
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
});