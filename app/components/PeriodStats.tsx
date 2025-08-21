import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppColors from "../appColors";
import Header from "./header";
import { getPeriodStats } from "../../backend/getData";
import { stats } from "../_types";
import CustomDatePicker from "./datepicker";
import GeneralButton from "./GeneralButton";

type PurchasHistoryProps = {
  height?: number;
  titleSwithch?: boolean;
};
type TimePeriod = 0 | 1 | 2;

export default function PeriodStats({
  height,
  titleSwithch = true,
}: PurchasHistoryProps) {
  const [data, setData] = useState<stats>();
  const [error, setError] = useState<Error | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(2);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getPeriodStats(selectedDate,selectedPeriod);
        setData(result);
      } catch (error: unknown) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
        console.log("done")
      }
    };

    fetchData();
  }, [selectedDate,selectedPeriod]);

  console.log(selectedPeriod);
  return (
    <View>
      {titleSwithch ? <Text style={styles.title}>Stats</Text> : null}
      <View style={[styles.container, { height: height }]}>
        <Text style={styles.subtitle}>select a date</Text>
        <CustomDatePicker
          date={selectedDate}
          onDateChange={(selectedDate) => setSelectedDate(selectedDate)}
        />
        <Text style={styles.subtitle}>select overview</Text>
        <View style={styles.buttonContainer}>
          <GeneralButton
            title="year"
            onPress={() => {
              setSelectedPeriod(2);
            }}
            style={styles.buttonStyle}
          />

          <GeneralButton
            title="month"
            onPress={() => {
              setSelectedPeriod(1);
            }}
            style={styles.buttonStyle}
          />

          <GeneralButton
            title="day"
            onPress={() => {
              setSelectedPeriod(0);
            }}
            style={styles.buttonStyle}
          />
        </View>
        {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
        {data && !isLoading && (
          <>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Products Bought:</Text>
              <Text style={styles.statValue}>{data.products_bought}</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Spent:</Text>
              <Text style={styles.statValue}>
                €{data.total_spent?.toFixed(2) || "0.00"}
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Alcohol Consumed:</Text>
              <Text style={styles.statValue}>
                {data.alcohol_consumed?.toFixed(2) || "0.00"}ml
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Calories Consumed:</Text>
              <Text style={styles.statValue}>
                {data.calories_consumed || 0} kcal
              </Text>
            </View>
          </>
        )}

        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
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
  subtitle: {
    fontSize: 15,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
    width: null,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "500",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: AppColors.primary,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  loadingText: {
    color: AppColors.primary,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
});
