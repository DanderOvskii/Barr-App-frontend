import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Product } from "../_types";
import BuyButton from "../components/buyButton";
import Header from "../components/header";
import AppColors from "../appColors";
import Title from "../components/title";
import { getProduct } from "@/backend/getData";

export default function ProductInfo() {
  const { productId } = useLocalSearchParams();
  const productIdNumber = Number(productId);
  const [data, setData] = useState<Product | null>(null);
  const [error, setError] = useState<Error | null>(null);
console.log("product ID:", productId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProduct(productIdNumber);
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [productId]);

   if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <Title title={"Product information"} />
        <Text style={{ color: "red" }}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Header />
        <Title title={"Product information"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Title title={"Product information"} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{data.name}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>€{data.price}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{data.amount}g/ml</Text>

        <Text style={styles.label}>Calories:</Text>
        <Text style={styles.value}>{data.calorien}-Kcal</Text>

        <Text style={styles.label}>Alcohol:</Text>
        <Text style={styles.value}>{data.alcohol} per 100ml</Text>
      </View>
      <BuyButton product={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: AppColors.background,
    paddingHorizontal: "10%",
  },

  infoContainer: {
    backgroundColor: AppColors.background,
    padding: 15,
    borderWidth: 2,
    borderColor: AppColors.primary,

    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.text,
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: AppColors.text,
    marginBottom: 10,
  },
});
