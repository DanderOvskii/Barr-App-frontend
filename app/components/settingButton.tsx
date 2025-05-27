import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


  const handleSettingPress = () => {
    router.push("/More");
  };
  export const SettingButton = () => (
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