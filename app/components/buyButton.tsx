import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Product } from '../_types';
import { buyProduct } from '../../backend/getData';
import { useRouter } from 'expo-router';
import GeneralButton from './GeneralButton';

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
    <GeneralButton
      onPress={() => handleProductBuy(product.id)}
      title={`${product.name}€ ${product.price % 1 === 0 ? `${product.price}.-` : product.price}`}
    />
  );
}

