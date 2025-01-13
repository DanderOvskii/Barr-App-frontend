import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="Products" options={{ title: 'Products' }} />
      <Stack.Screen name="ProductManager" options={{ title: 'ProductManager' }} />
    </Stack>
  );
}
