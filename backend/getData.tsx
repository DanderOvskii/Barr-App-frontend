import axios from 'axios';
import { Product, Category } from "../app/types";
const BASE_URLS = {
  LOCAL: 'http://127.0.0.1:8000',
  IP_192: 'http://192.168.1.99:8000',
  IP_10: 'http://10.0.2.2:8000',
};

let currentBaseURL = BASE_URLS.LOCAL; // Default base URL

export const setBaseURL = (url: string) => {
  currentBaseURL = url;
};
export const getProducts = async (categoryId: number) => {
  try {
    const response = await axios.get(`${currentBaseURL}/Products?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${currentBaseURL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getAllData = async () => {
  try {
    const response = await axios.get(`${currentBaseURL}/ProductManager`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const updateProduct = async (productId: number, updatedProduct: Partial<Product>) => {
  try {
    // Add validation
    if (!productId || !updatedProduct) {
      throw new Error('Invalid product data');
    }

    // Add proper error handling for the response
    const response = await axios.put(
      `${currentBaseURL}/ProductManager/${productId}`, 
      updatedProduct,
      {
        headers: {
          'Content-Type': 'application/json',
        }
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
      console.error('API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
    throw error;
  }
};


export const createProduct = async (newProduct: Partial<Product>) => {
  try {
    const response = await axios.post(`${currentBaseURL}/ProductManager`, newProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    if (!productId) {
      throw new Error('Invalid product ID');
    }

    const response = await axios.delete(
      `${currentBaseURL}/ProductManager/${productId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${currentBaseURL}/search`, {
      params: { q: query },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Search API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to search categories');
    }
    throw error;
  }
};


export const loginUser = async (username: string, password: string) => {
  try {
    // Create URLSearchParams for form-urlencoded data
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(`${currentBaseURL}/token`, 
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};