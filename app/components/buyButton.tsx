import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Product } from '../types';
import { buyProduct } from '../../backend/getData';
import { useRouter } from 'expo-router';

interface BuyButtonProps {
  product: Product;
}

export default function BuyButton({ product }: BuyButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);

  const handleProductBuy = async (productId: number) => {
    try {
      await buyProduct(productId);
      router.push({
        pathname: "/Home",
      });
    } catch (error: unknown) {
      setError(error as Error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleProductBuy(product.id)}
      style={styles.categoryButton}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.categoryButtonText}>
          {product.name} €
          {product.price % 1 === 0 ? `${product.price}.-` : product.price}
        </Text>
       
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});