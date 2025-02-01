import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from  'expo-router';
import { Product } from './types';
import BuyButton from './components/buyButton';
import Header from './components/header';


export default function ProductInfo() {
    const { product: productParam } = useLocalSearchParams();
  const product: Product = JSON.parse(productParam as string);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Product Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{product.name}</Text>
        
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>€{product.price % 1 === 0 ? `${product.price}.-` : product.price}</Text>

        <Text style={styles.label}>calorien:</Text>
        <Text style={styles.value}>{product.calorien}-Kcal</Text>

        <Text style={styles.label}>alcohol:</Text>
        <Text style={styles.value}>{product.alcohol} per 100ml</Text>
      </View>
       <BuyButton product={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
    paddingHorizontal: "10%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});