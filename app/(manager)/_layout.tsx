// app/manager/_layout.tsx

import { Stack } from "expo-router";
import { CustomHeader } from "../../navigation/navHeader";

export default function ManagerLayout() {
  return  <Stack
        screenOptions={({ route }) => ({
          header: () => <CustomHeader title={route.name} />,
          animation: "slide_from_right",
          presentation: "card",
        })}
      />;
}
