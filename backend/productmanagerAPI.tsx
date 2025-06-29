import { Product, Category } from "../app/_types";
import { currentBaseURL } from "./bateUrl";
import { api, handleApiError, logout, getAuthHeaders } from "./api";

export const getAllData = async () => {
  try {
    const response = await api.get(`${currentBaseURL}/ProductManager`, {
      headers: await getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching all data");
  }
};

export const createCategory = async (categoryData: { name: string }) => {
  try {
    const response = await fetch(
      `${currentBaseURL}/ProductManager/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeaders()),
        },
        body: JSON.stringify(categoryData),
      }
    );

    return await response.json();
  } catch (error) {
    handleApiError(error, "Failed to create category");
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    if (!categoryId) {
      throw new Error("Invalid product ID");
    }
    const response = await api.delete(
      `${currentBaseURL}/ProductManager/categories/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to delete category");
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
    const response = await api.put(
      `${currentBaseURL}/ProductManager/${productId}`,
      updatedProduct,
      {
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeaders()),
        },
      }
    );
    return response.data;
  } catch (error) {
    // More detailed error handling
    handleApiError(error, "Failed to update product");
  }
};

export const createProduct = async (newProduct: Partial<Product>) => {
  try {
    const response = await api.post(
      `${currentBaseURL}/ProductManager`,
      newProduct,
      {
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeaders()),
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to create product");
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    if (!productId) {
      throw new Error("Invalid product ID");
    }

    const response = await api.delete(
      `${currentBaseURL}/ProductManager/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(await getAuthHeaders()),
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to delete product");
  }
};
