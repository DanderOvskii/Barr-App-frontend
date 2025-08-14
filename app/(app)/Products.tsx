import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getProducts, buyProduct } from "../../backend/getData";
import { Product } from "../_types";
import SearchBar from "../components/SearchBar";
import BuyButton from "../components/buyButton";
import Header from "../components/header";
import AppColors from "../appColors";
import Title from "../components/title";
import { ROUTES } from "../../navigation/navRoutes";

export default function Producten() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const idNumber =  Number(id);
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProducts(idNumber);
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [id]);
  const handleInfoPress = (productId: number) => {
    router.push({
      pathname: ROUTES.APP.PRODUCT_INFO,
      params: { productId: productId },
    });
  };
  return (
    <View style={styles.container}>
      <Header />

      <SearchBar
        placeholder="Search products..."
        onSelectItem={(product) => handleInfoPress(product.id)}
      />

      <Title title="Products" />

      <View style={styles.categoryContainer}>
        {data &&
          data.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <BuyButton product={product} />
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => handleInfoPress(product.id)}
                
              >
                <Text style={styles.infoButtonText}>i</Text>
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
    backgroundColor: AppColors.background, // Light blue background
    paddingLeft: 20,
    paddingRight: 20,
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
    color: AppColors.text,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Resolve-BlackWd",
  },
  categoryContainer: {
    alignItems: "center",
    width: "100%",
  },
  categoryButton: {
    width: "100%",
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
    backgroundColor: "#2196F3",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "10%",
    marginBottom: 15,
  },
});
