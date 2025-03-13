import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getCategories, getCurrentUser } from "../backend/getData";
import { Category, Product, user } from "./types";
import SearchBar from "./components/SearchBar";
import { currentBaseURL } from "../backend/bateUrl";
import Header from "./components/header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const Verifytoken = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${currentBaseURL}/verify-token/${token}`);
        if (!response.ok) {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        router.replace("/(login)/login");
      }
    };
    Verifytoken();
  }, []);
  const navigateTo = (id: number) => {
    router.push(`/Products?id=${id}`);
  };

  const [data, setData] = useState<Category[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategories();
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);

  console.log(data);
  const handleInfoPress = (product: Product) => {
    router.push({
      pathname: "/ProductInfo",
      params: { product: JSON.stringify(product) },
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar
        placeholder="Search categories..."
        onSelectItem={(Product) => handleInfoPress(Product)}
      />

      <Text style={styles.categoryHeader}>Categorie</Text>

      <View style={styles.categoryContainer}>
        {data &&
          data.map((categorie) => (
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => navigateTo(categorie.id)}
            >
              <Text style={styles.categoryButtonText}>{categorie.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../manager/ProductManager")}
      >
        <Text style={styles.name}>ProductManager</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("../manager/accountManager")}
      >
        <Text style={styles.name}>AccountMamager</Text>
      </TouchableOpacity>
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
  button: {
    minWidth: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ff6347", // Tomato red background
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
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
