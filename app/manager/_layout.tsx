// app/manager/_layout.tsx

import { Stack } from "expo-router";

export default function ManagerLayout() {
  return  <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f2f2f2" },
        headerTintColor: "#333",
        title: "Manager Panel",
      }}
    />;
}
