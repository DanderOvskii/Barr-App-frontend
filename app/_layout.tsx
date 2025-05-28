// app/_layout.tsx

import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/navigation/navRoutes";
import { useFonts } from "expo-font";
import { View } from "react-native";

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const inAuthGroup = segments[0] === "(auth)";
      const isManagerGroup = segments[0] === "(manager)";

      const token = await AsyncStorage.getItem("token");
      const isAdmin = true; // Replace with actual check
      if (!token && !inAuthGroup) {
        router.replace(ROUTES.AUTH.LOGIN);
      } else if (token && inAuthGroup) {
        router.replace(ROUTES.HOME);
      } else if (isManagerGroup && !isAdmin) {
        router.replace(ROUTES.HOME);
      }
    };
    
    checkAuth();
  }, [segments]);
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto": require("../assets/fonts/Roboto-Regular.ttf"),
    "Resolve-BlackWd": require("../assets/fonts/Resolve-BlackWd.otf"),
    "AtomicMarker": require("../assets/fonts/AtomicMarker.otf"),
  });
  useProtectedRoute();
  
  if (!fontsLoaded) {
    return <View />; // You can also return a splash screen or loading indicator
  }
  return <Slot />;
}
