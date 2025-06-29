import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import AppColors from "../appColors";

type TitleProps = {
  title: string;
};
export default function Title({title}: TitleProps) {
  return <Text style={styles.categoryHeader}>{title}</Text>;
}
const styles = StyleSheet.create({
  categoryHeader: {
    fontSize: 24,
    color: AppColors.text,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "Resolve-BlackWd",
  },
});
