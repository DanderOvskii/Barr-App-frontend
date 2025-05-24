import axios from "axios";
import { Stack, useRouter, useSegments } from "expo-router";
const router = useRouter();

export const handleApiError = (error: unknown, context = "request"): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const detail = error.response?.data?.detail;

    if (status === 403) {
      alert("You must be an admin to access this " + context + ".");
      router.back();
    } else if (status === 401) {
      alert("You are not logged in or your session expired.");
      router.replace("/(login)/login");
    } else if (detail) {
      alert(detail);
    } else {
      alert("An error occurred during the " + context + ".");
    }
  } else {
    alert("Unexpected error: " + (error as Error).message || "Unknown error");
  }

  throw error; // Re-throw for chaining
};
