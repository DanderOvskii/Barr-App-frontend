import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(login)";
    
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    
    if (!inAuthGroup && !token) {
      // Redirect to login only if not authenticated and not in login group
      router.replace("/(login)/login");
    } else if (inAuthGroup && token) {
      // Redirect to home if authenticated and trying to access login
      router.replace("/Home");
    }
  }, [segments]);
}

export default function RootLayout() {
  useProtectedRoute();

  return (
    <Stack initialRouteName="(login)/login">
      <Stack.Screen name="(login)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(login)/signup" options={{ headerShown: false }} />
      <Stack.Screen name="Home" options={{ title: "Home" }} />
      <Stack.Screen name="Products" options={{ title: "Products" }} />
      <Stack.Screen name="manager/ProductManager" options={{ title: "Product Manager" }} />
      <Stack.Screen name="ProductInfo" options={{ title: "Info" }} />
    </Stack>
  );
}