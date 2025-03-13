import axios from "axios";
import { Product, Category } from "../app/types";
import { currentBaseURL } from "./bateUrl";

export const getProducts = async (categoryId: number) => {
  try {
    const response = await axios.get(
      `${currentBaseURL}/Products?categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${currentBaseURL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${currentBaseURL}/search`, {
      params: { q: query },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Search API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to search categories"
      );
    }
    throw error;
  }
};

export const registerUser = async (
  username: string,
  password: string,
  birthdate: Date
) => {
  try {
    const response = await axios.post(`${currentBaseURL}/register`, null, {
      params: {
        username: username.trim(),
        password: password,
        birthdate: birthdate.toISOString().split("T")[0],
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    // Create URLSearchParams for form-urlencoded data
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axios.post(
      `${currentBaseURL}/token`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${currentBaseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("User API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.detail || "Failed to fetch user data"
      );
    }
    throw error;
  }
};

export const buyProduct = async (productId: number) => {
  try {
    const response = await axios.post(
      `${currentBaseURL}/buy/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Buy API Error:", error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to buy product");
    }
    throw error;
  }
};

export const updateUser = async (userData: {
  username: string;
  password?: string;
  wallet: number;
}) => {
  try {
    const response = await axios.put(
      `${currentBaseURL}/users/update`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Update User API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to update user data"
      );
    }
    throw error;
  }
};

