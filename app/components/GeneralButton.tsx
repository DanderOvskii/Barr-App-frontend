// components/GeneralButton.js
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import AppColors from "../appColors";

type GeneralButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  type?:"delete" | "cancle" | "save" | "deafault";
};
const GeneralButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  type = "deafault",
}:GeneralButtonProps) => {
  const getBorderColor = () => {
    switch (type) {
      case "delete":
        return AppColors.warning; // Red for delete
      case "cancle":
        return AppColors.cancle; // Gray for cancel
      case "save":
        return AppColors.success; // Green for save
      case "deafault":
      default:
        return AppColors.primary; // Default primary color
    }
  };
  return (
    <TouchableOpacity
      style={[styles.button,{borderColor:getBorderColor()}, disabled && styles.disabledButton, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.background,
    padding: 15,
    alignItems: "center",
    borderWidth: 2,
    marginTop: 10,
    width: "100%",
  },
  text: {
    color: AppColors.text,
    fontSize: 16,
    fontFamily: "Roboto-bold",
  },
  disabledButton: {
    borderColor: AppColors.secondary,
  },
 
});

export default GeneralButton;
