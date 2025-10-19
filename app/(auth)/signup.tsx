import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { registerUser } from "../../backend/getData";
import { useRouter } from "expo-router";
import CustomDatePicker from "../components/datepicker";
import { webStorage } from "@/backend/api";
import { ROUTES } from "@/navigation/navRoutes";
import GeneralButton from "../components/GeneralButton";
import AppColors from "../appColors";
import CustomTextInput from "../components/textInput";

export default function signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSignup = async () => {
    if (!validation()) return;

    setIsLoading(true);
    try {
      const response = await registerUser(username, password, birthdate);
      await webStorage.setItem("token", response.access_token);
      router.replace(ROUTES.APP.HOME);
    } catch (error: any) {
      setError(error.message);
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const goToLogin = () => {
    router.replace(ROUTES.AUTH.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN-UP</Text>
      <CustomTextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        editable={!isLoading}
      />
      <CustomTextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <CustomDatePicker
        date={birthdate}
        onDateChange={(selectedDate) => setBirthdate(selectedDate)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <GeneralButton
        title={isLoading ? "" : "Sign Up"}
        onPress={handleSignup}
        disabled={isLoading}
      />

      <GeneralButton
        title="Login"
        disabled={isLoading}
        onPress={goToLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: AppColors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: AppColors.text,
    fontFamily: "Resolve-BlackWd",
  },
  input: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
