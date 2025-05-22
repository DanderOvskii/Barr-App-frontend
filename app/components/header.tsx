import { getCurrentUser } from "@/backend/getData";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { user } from "../types";

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
          router.replace("/(login)/login");
        }
      }
    };

    fetchUserData();
  }, [user]);
  console.log("userData", userData);
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{userData?.username || "Loading..."}</Text>
      <Text style={styles.balance}>€{userData?.wallet || "Loading..."}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  balance: {
    fontSize: 20,
    color: "white",
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
});
