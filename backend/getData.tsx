import axios from 'axios';

export const getData = async () => {
  try {
    // const response = await axios.get('http://192.168.1.99:8000/Products/');
    // const response = await axios.get('http://10.0.2.2:8000/Products/');
    const response = await axios.get('http://127.0.0.1:8000/Products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};