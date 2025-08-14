import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Product } from '../_types';
import { buyProduct } from '../../backend/getData';
import { useRouter } from 'expo-router';
import GeneralButton from './GeneralButton';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface BuyButtonProps {
  product: Product;
}

export default function BuyButton({ product }: BuyButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductBuy = async (productId: number) => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    setError(null);
    
    try {
      await buyProduct(productId);
      router.push({
        pathname: "/Home",
      });
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("Product:", product.discount_price, product.price);

  const getTitle = () => {
    if(isLoading) {
      return "Loading...";
    }
    const hasDiscount = product.discount_price !== product.price;
    if (hasDiscount&& product.discount_price) {
      return `${product.name} € ${product.discount_price % 1 === 0 ? `${product.discount_price}.-` : product.discount_price} was € ${product.price % 1 === 0 ? `${product.price}.-` : product.price}`;
    }else {
      return `${product.name} € ${product.price % 1 === 0 ? `${product.price}.-` : product.price}`;
    }
  };

  return (
    <GeneralButton
      onPress={() => handleProductBuy(product.id)}
      title={getTitle()}
      disabled={isLoading}
    />
  );
}

