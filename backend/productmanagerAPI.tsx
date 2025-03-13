import axios from "axios";
import { Product, Category } from "../app/types";
import { currentBaseURL } from "./bateUrl";

export const getAllData = async () => {
  try {
    const response = await axios.get(`${currentBaseURL}/ProductManager`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (categoryData: { name: string }) => {
  try {
    const response = await fetch(`${currentBaseURL}/ProductManager/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Failed to create category");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    if (!categoryId) {
      throw new Error("Invalid product ID");
    }
    console.log("Deleting category with ID:", categoryId);
    const response = await axios.delete(
      `${currentBaseURL}/ProductManager/categories/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
    throw error;
  }
};

export const updateProduct = async (
  productId: number,
  updatedProduct: Partial<Product>
) => {
  try {
    // Add validation
    if (!productId || !updatedProduct) {
      throw new Error("Invalid product data");
    }

    // Add proper error handling for the response
    const response = await axios.put(
      `${currentBaseURL}/ProductManager/${productId}`,
      updatedProduct,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Verify the response
    if (response.status !== 200) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    // More detailed error handling
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
    throw error;
  }
};

export const createProduct = async (newProduct: Partial<Product>) => {
  try {
    const response = await axios.post(
      `${currentBaseURL}/ProductManager`,
      newProduct,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    if (!productId) {
      throw new Error("Invalid product ID");
    }

    const response = await axios.delete(
      `${currentBaseURL}/ProductManager/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
    throw error;
  }
};
