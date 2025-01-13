import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getProducts } from "../backend/getData";
import { Product } from './types';


type RouteParams = {
  id: number; // Assuming id is a number, adjust if it's a string
};

export default function Producten() {
  const router = useRouter();
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [data, setData] = useState<Product[] | null>(null);
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
  const handleInfoPress = (product: Product) => {
    router.push({
      pathname: "/ProductInfo",
      params: { product: JSON.stringify(product) }
    });
  };
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
          data.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <TouchableOpacity style={styles.categoryButton}>
                <View style={styles.buttonContent}>
                  <Text style={styles.categoryButtonText}>
                    {product.name} €{product.price % 1 === 0 ? `${product.price}.-` : product.price}
                  </Text>
                  <TouchableOpacity style={styles.infoButton} onPress={() => handleInfoPress(product)}>
                    <Text style={styles.infoButtonText}>i</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
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
    width: '100%',
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryButtonText: {
    fontSize: 18,
    color: "white",
  },
  infoButton: {
    width: 30,
    height: 30,
    backgroundColor: '#2196F3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '10%',
    marginBottom: 15,
  },
});
