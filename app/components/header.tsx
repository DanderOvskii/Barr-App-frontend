import { getCurrentUser } from "@/backend/getData";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { user } from "../types";
import AppColors from "../appColors";
import { ROUTES } from "../../navigation/navRoutes";

export default function Header({ user }: { user?: user }) {
  const [userData, setUserData] = useState<user>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If there's an auth error, redirect to login
        if (error instanceof Error && error.message.includes("401")) {
          router.replace(ROUTES.AUTH.LOGIN);
        }
      }
    };

    fetchUserData();
  }, [user]);
  console.log("userData", userData);
  return (
    <View style={styles.header}>
      <View style={styles.namesContainer}>
        <Text style={styles.name}>{userData?.username || "Loading..."}</Text>
        <Text style={styles.sirname}>{"siegers"}</Text>
      </View>

      <Text style={styles.balance}>€{userData?.wallet || "Loading..."}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  namesContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 20,
    color: AppColors.text,
    textTransform: "uppercase",
    fontFamily: "Resolve-BlackWd",
  },
  sirname: {
    fontSize: 20,
    color: AppColors.background,
    textTransform: "uppercase",
    fontFamily: "Resolve-BlackWd",
    textShadowColor: AppColors.text,
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 2,
  },
  balance: {
    fontSize: 20,
    color: AppColors.text,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: AppColors.background,
    marginBottom: 10,
    borderColor: AppColors.primary,
    borderWidth: 2,
  },
});
