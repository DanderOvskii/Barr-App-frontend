import axios from 'axios';
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
    const response = await axios.get(`${currentBaseURL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};