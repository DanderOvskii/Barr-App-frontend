import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { getProducts } from "../backend/getData";

type RouteParams = {
  id: number; // Assuming id is a number, adjust if it's a string
};

export default function Producten() {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [data, setData] = useState<{ id: number; name: string }[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProducts(id);
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [id]);
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>naam</Text>
        <Text style={styles.balance}>$100.-</Text>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>

      <Text style={styles.categoryHeader}>producten</Text>

      <View style={styles.categoryContainer}>
        {data &&
          data.map((products) => (
            <TouchableOpacity key={products.id} style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>{products.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", // Light blue background
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ff6347", // Tomato red background
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  balance: {
    fontSize: 20,
    color: "white",
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  categoryHeader: {
    fontSize: 24,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  categoryContainer: {
    alignItems: "center",
  },
  categoryButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#4caf50", // Green background
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2, // For Android shadow
  },
  categoryButtonText: {
    fontSize: 18,
    color: "white",
  },
});
