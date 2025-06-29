import { api, handleApiError,logout,getAuthHeaders } from "./api";
import { Product, Category } from "../app/_types";
import { currentBaseURL } from "./bateUrl";




export const getCategories = async () => {
  try {
    const response = await api.get(`${currentBaseURL}/`, {
      headers: await getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Categorieën ophalen mislukt.");
  }
};

export const getProducts = async (categoryId: number) => {
  try {
    const response = await api.get(
      `${currentBaseURL}/Products?categoryId=${categoryId}`,{
        headers: await getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Producten ophalen mislukt.");
  }
};

export const getProduct = async (productId: number) => {
  try {
    const response = await api.get(
      `${currentBaseURL}/Product?productId=${productId}`,{
        headers: await getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Product ophalen mislukt.");
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await api.get(`${currentBaseURL}/search`, {
      params: { q: query },
      headers: {
        "Content-Type": "application/json",
        ...await getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Zoeken naar producten mislukt.");
  }
};

export const registerUser = async (
  username: string,
  password: string,
  birthdate: Date
) => {
  try {
    const response = await api.post(`${currentBaseURL}/register`, null, {
      params: {
        username: username.trim(),
        password: password,
        birthdate: birthdate.toISOString().split("T")[0],
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Registreren mislukt.");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await api.post(
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
    handleApiError(error, "Inloggen mislukt.");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`${currentBaseURL}/users/me`, {
      headers: await getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Gebruiker ophalen mislukt.");
  }
};

export const buyProduct = async (productId: number) => {
  try {
    const response = await api.post(
      `${currentBaseURL}/buy/${productId}`,
      null,
      {
        headers: await getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Aankoop mislukt.");
  }
};

export const updateUser = async (userData: {
  username: string;
  password?: string;
  wallet: number;
}) => {
  try {
    const response = await api.put(
      `${currentBaseURL}/users/update`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          ...await getAuthHeaders(),
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Gebruiker bijwerken mislukt.");
  }
};
