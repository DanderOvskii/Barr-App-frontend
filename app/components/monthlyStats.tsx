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
import { getMonthlyStats } from "../../backend/getData";
import { stats } from "../_types";

type PurchasHistoryProps = {
  height?: number;
  titleSwithch?: boolean;
};

export default function MonthlyStats({
  height,
  titleSwithch = true,
}: PurchasHistoryProps) {
  const [data, setData] = useState<stats>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMonthlyStats();
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);
  console.log("MonthlyStats data:", data);
  return (
    <View>
        {titleSwithch? (
            <Text style={styles.title}>Monthly Stats</Text>

        ):null}
      <View style={[styles.container, { height: height }]}>
        {data && (
          <>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Products Bought:</Text>
              <Text style={styles.statValue}>{data.products_bought}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Spent:</Text>
              <Text style={styles.statValue}>€{data.total_spent?.toFixed(2) || '0.00'}</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Alcohol Consumed:</Text>
              <Text style={styles.statValue}>{data.alcohol_consumed?.toFixed(2) || '0.00'}ml</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Calories Consumed:</Text>
              <Text style={styles.statValue}>{data.calories_consumed || 0} kcal</Text>
            </View>
          </>
        )}
        
        {error && (
          <Text style={styles.errorText}>Error: {error.message}</Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: AppColors.primary,
    marginBottom: 10,
  },
  container: {
    borderColor: AppColors.primary,
    borderWidth: 2,
    padding: 15,
    borderRadius: 8,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.black,
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  statLabel: {
    fontSize: 16,
    color: AppColors.primary,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primary,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});