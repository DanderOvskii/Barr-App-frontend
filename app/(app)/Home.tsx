import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getCategories} from "../../backend/getData";
import { Category} from "../_types";
import SearchBar from "../components/SearchBar";
import Header from "../components/header";
import AppColors from "../appColors";
import GeneralButton from "../components/GeneralButton";
import Title from "../components/title";
import { ROUTES } from "@/navigation/navRoutes";
export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   const Verifytoken = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     try {
  //       const response = await fetch(`${currentBaseURL}/verify-token/${token}`);
  //       if (!response.ok) {
  //         throw new Error("No token found");
  //       }
  //     } catch (error) {
  //       console.error("Error verifying token:", error);
  //       AsyncStorage.removeItem("token");
  //       router.replace("/(login)/login");
  //     }
  //   };
  //   Verifytoken();
  // }, []);
  const navigateTo = (id: number) => {
    router.push({
      pathname: ROUTES.APP.PRODUCTS, 
      params: { id },
    });
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

  const handleInfoPress = (productId:number) => {
    router.push({
      pathname: "/ProductInfo",
      params: { id: productId },
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar
        placeholder="Search..."
        onSelectItem={(Product) => handleInfoPress(Product.id)}
      />

     <Title title="Categories" />

      <View style={styles.categoryContainer}>
        {data &&
          data.map((categorie) => (
            <GeneralButton
              onPress={() => navigateTo(categorie.id)}
              title={categorie.name.toUpperCase()}
            />
              
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
 

  categoryHeader: {
    fontSize: 24,
    color: AppColors.text,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Resolve-BlackWd",
  },
  categoryContainer: {
    flex: 1,
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
