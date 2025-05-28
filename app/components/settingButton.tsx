import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppColors from "../appColors";


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
      <MaterialIcons name="settings" size={30} color={AppColors.text}/>
    </TouchableOpacity>
  );
  export default SettingButton;