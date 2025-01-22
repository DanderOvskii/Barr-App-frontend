import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login/Login" options={{ title: 'Login' }} />
      <Stack.Screen name="Home" options={{ title: 'Home' }} />
      <Stack.Screen name="Products" options={{ title: 'Products' }} />
      <Stack.Screen name="manager/ProductManager" options={{ title: 'ProductManager' }} />
      <Stack.Screen name="ProductInfo" options={{ title: 'info' }} />
    </Stack>
  );
}
