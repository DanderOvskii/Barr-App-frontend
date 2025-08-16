import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppColors from "../appColors";
import Header from "../components/header";
import { getPurchases } from "../../backend/getData";
import { Purchase } from "../_types";

type PurchasHistoryProps = {
  height?: number;
  titleSwithch?: boolean;
};

export default function PurchasHistory({
  height,
  titleSwithch = true,
}: PurchasHistoryProps) {
  const [data, setData] = useState<Purchase[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPurchases();
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
        {titleSwithch? (
            <Text style={styles.title}>Purchase History</Text>

        ):null}
      <ScrollView style={[styles.scrollView, { height: height }]}>
        {data.map((purchase) => (
          <View key={purchase.id} style={styles.purchaseItem}>
            <Text style={styles.productName}>
              {purchase.amount}x {purchase.product_name} €{purchase.total_price}{" "}
              at {purchase.purchase_date}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.primary,
  },
  scrollView: {
    marginBottom:10,
    borderColor: AppColors.primary,
    borderWidth: 2,
    padding: 10,
  },
  purchaseItem: {
    backgroundColor: AppColors.black,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: AppColors.primary,
  },
});
