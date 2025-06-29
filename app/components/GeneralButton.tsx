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
};
const GeneralButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}:GeneralButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
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
    borderColor: AppColors.primary,
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
    backgroundColor: "#A0A0A0",
  },
 
});

export default GeneralButton;
