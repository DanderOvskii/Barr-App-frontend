// components/CustomTextInput.js

import React from "react";
import { View, TextInput, Text, StyleSheet, TextStyle } from "react-native";
import AppColors from "../appColors";
interface CustomTextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: TextStyle;
  editable?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "decimal-pad";
}
const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  style,
  editable = true,
  keyboardType = "default",
}: CustomTextInputProps) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={AppColors.black}
      secureTextEntry={secureTextEntry}
      style={[style, styles.input]}
      editable={editable}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: AppColors.primary,
    fontSize: 20,
    fontFamily: "Roboto-bold",
  },
});

export default CustomTextInput;
