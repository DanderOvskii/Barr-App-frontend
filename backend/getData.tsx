import axios from 'axios';
import { Product, Category } from "../app/types";
import { currentBaseURL } from './bateUrl';


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
export const createCategory = async (categoryData: { name: string }) => {
  try {
    const response = await fetch(`${currentBaseURL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error('Failed to create category');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating category:', error);
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


export const registerUser = async (username: string, password: string, birthdate:Date) => {
  try {
    const response = await axios.post(`${currentBaseURL}/register`,
      null,
      {
        params: {
          username: username.trim(),
          password: password,
          birthdate: birthdate.toISOString().split('T')[0],
        }
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
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

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${currentBaseURL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('User API Error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Failed to fetch user data');
    }
    throw error;
  }
};

export const buyProduct = async (productId: number) => {
  try {
    const response = await axios.post(`${currentBaseURL}/buy/${productId}`, null, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Buy API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to buy product');
    }
    throw error;
  }
}

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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Update User API Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update user data');
    }
    throw error;
  }
};