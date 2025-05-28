import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { loginUser } from "../../backend/getData";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "@/navigation/navRoutes";
import AppColors from "../appColors";
import GeneralButton from "../components/GeneralButton";

export default function login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validation = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = async () => {
    if (!validation()) return;

    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      // Store the token (you might want to use secure storage in production)
      // Example: await SecureStore.setItemAsync('userToken', response.token);

      // Navigate to main screen
      await AsyncStorage.setItem("token", response.access_token);

      router.replace(ROUTES.HOME);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSighnUp = () => {
    router.push(ROUTES.AUTH.SIGNUP);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        editable={!isLoading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <GeneralButton
        title={isLoading ? "" : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
       

      <GeneralButton
        title="Sign Up"
        disabled={isLoading}
        onPress={goToSighnUp}
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: AppColors.text,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
 
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
});
