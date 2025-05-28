import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getCurrentUser, updateUser } from "../../backend/getData";
import { user } from "../_types";
import Header from "../components/header";

export default function AccountManager() {
  const [userData, setUserData] = useState<user | null>(null);
  const [editedData, setEditedData] = useState({
    username: "",
    password: "",
    wallet: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);
        setEditedData({
          username: user.username,
          password: "",
          wallet: user.wallet.toString(),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateUser({
        username: editedData.username,
        password: editedData.password || undefined,
        wallet: parseFloat(editedData.wallet),
      });

      Alert.alert("Success", "Account details updated successfully");
      // Refresh user data
      const updatedUser = await getCurrentUser();
      setUserData(updatedUser);
    } catch (error) {
      setError("Failed to update account details");
      Alert.alert("Error", "Failed to update account details");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header user={userData} />
      <Text style={styles.title}>Account Settings</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={editedData.username}
            onChangeText={(text) =>
              setEditedData({ ...editedData, username: text })
            }
            placeholder="Enter username"
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={editedData.password}
            onChangeText={(text) =>
              setEditedData({ ...editedData, password: text })
            }
            placeholder="Enter new password (optional)"
            secureTextEntry
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Wallet Amount</Text>
          <TextInput
            style={styles.input}
            value={editedData.wallet}
            onChangeText={(text) =>
              setEditedData({ ...editedData, wallet: text })
            }
            placeholder="Enter wallet amount"
            keyboardType="decimal-pad"
            editable={!isLoading}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
