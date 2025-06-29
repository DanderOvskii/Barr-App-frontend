import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ROUTES } from "@/navigation/navRoutes";
import { currentBaseURL } from "./bateUrl";

export const api = axios.create({
  baseURL: currentBaseURL,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      router.replace(ROUTES.AUTH.LOGIN);
      // Optionally, you can reject with a custom error or just return
    }else if (error.response?.status === 403) {
      alert("You do not have permission to access this resource.");
        router.back();
    }
    else if (error.response?.data?.detail) {
        alert(error.response.data.detail);
        }
    return Promise.reject(error);
  }
);

export function handleApiError(error: any, defaultMessage = "Er is iets misgegaan. Probeer het opnieuw.") {
  // Axios error with server message
  if (error?.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  // Axios error with status text
  if (error?.response?.statusText) {
    throw new Error(error.response.statusText);
  }
  // Fallback
  throw new Error(defaultMessage);
}

export const logout = async () => {
  await AsyncStorage.removeItem("token");
  router.replace(ROUTES.AUTH.LOGIN);
};

export const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  if (!token){ 
    await logout();
    throw new Error("No token found")};
  return {
    Authorization: `Bearer ${token}`,
  };
};