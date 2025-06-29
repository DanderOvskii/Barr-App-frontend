import react from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "../../navigation/navRoutes";
import AppColors from "../appColors";
import GeneralButton from "../components/GeneralButton";
export default function More() {
  const router = useRouter();
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("isAdmin");
    router.replace(ROUTES.AUTH.LOGIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <GeneralButton
          title="Account settings"
          onPress={() => handleLogout()}
        />

        <GeneralButton title="Your stats" onPress={() => handleLogout()} />

        <GeneralButton
          title="Product Manager"
          onPress={() => router.push(ROUTES.MANAGER.PRODUCT_MANAGER)}
        />

        <GeneralButton
          title="Account Maneger"
          onPress={() => router.push(ROUTES.MANAGER.ACCOUNT_MANAGER)}
        />

        <GeneralButton title="Logout" onPress={() => handleLogout()} />
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
  categoryContainer: {
    alignItems: "center",
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
  logoutButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#dc3545", // Green background
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2, // For Android shadow
  },
  adminButton: {
    width: "80%",
    padding: 15,
    backgroundColor: "#ff6347", // Green background
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
