import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const inAuthGroup = segments[0] === "(login)";
      const isManagerGroup = segments[0] === "manager";

      try {
        // Check if user is authenticated
        const token = await AsyncStorage.getItem("token");
        const isAdmin = true;

        if (!inAuthGroup && !token) {
          // Redirect to login only if not authenticated and not in login group
          router.replace("/(login)/login");
        } else if (inAuthGroup && token) {
          // Redirect to home if authenticated and trying to access login
          router.replace("/Home");
        } else if (isManagerGroup && !isAdmin) {
          // Redirect to home if authenticated and trying to access login
          router.replace("/Home");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.replace("/(login)/login");
      }
    };
    checkAuth();
  }, [segments]);
}
export default function RootLayout() {
  const router = useRouter();
  useProtectedRoute();

  const handleSettingPress = () => {
    router.push("/More");
  };
  const SettingButton = () => (
    <TouchableOpacity
      style={{
        marginRight: 8,
        padding: 5,
      }}
      onPress={handleSettingPress}
    >
      <MaterialIcons name="settings" size={30} color="black" />
    </TouchableOpacity>
  );

  return (
    <Stack initialRouteName="(login)/login">
      <Stack.Screen name="(login)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(login)/signup" options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        options={{ title: "Home", headerRight: () => <SettingButton /> }}
      />
      <Stack.Screen name="Products" options={{ title: "Products" }} />
      <Stack.Screen
        name="manager/ProductManager"
        options={{ title: "Product Manager" }}
      />
      <Stack.Screen name="ProductInfo" options={{ title: "Info" }} />
      <Stack.Screen
        name="manager/accountManager"
        options={{ title: "Account Settings" }}
      />
      <Stack.Screen name="More" options={{ title: "More" }} />
    </Stack>
  );
}
