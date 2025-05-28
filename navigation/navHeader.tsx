import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";
import AppColors from "../app/appColors";
import { SettingButton } from "../app/components/settingButton";

export function CustomHeader({ title }: { title: string }) {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {navigation.canGoBack() ? (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={AppColors.text}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButtonPlaceholder} />
        )}

        <Text style={styles.title}>{title}</Text>
      </View>
      <SettingButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: AppColors.background,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonPlaceholder: {
    width: 0,
  },
  title: {
    color: AppColors.text,
    fontFamily: "Resolve-BlackWd",
    fontSize: 30,
    textTransform: "uppercase",
    marginLeft: 10,
  },
  backIcon: {
    marginLeft: 10,
  },
});
