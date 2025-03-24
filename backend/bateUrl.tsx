import axios from 'axios';

// Define URL configuration type
export type BaseURLConfig = {
  LOCAL: string;
  IP_192: string;
  IP_10: string;
};

// Define available URLs
export const BASE_URLS: BaseURLConfig = {
  LOCAL: 'http://127.0.0.1:8000',
  IP_192: 'http://192.168.1.99:8000',
  IP_10: 'http://10.0.2.2:8000',
};

// Export the current base URL
export let currentBaseURL = BASE_URLS.IP_10;

// Function to set base URL with validation
export const setBaseURL = (url: string): void => {
  // Validate if URL is in allowed URLs
  const isValidURL = Object.values(BASE_URLS).includes(url);
  if (!isValidURL) {
    throw new Error('Invalid base URL provided');
  }
  currentBaseURL = url;
};

// Function to get current base URL
export const getBaseURL = (): string => {
  return currentBaseURL;
};

// Function to test URL connectivity
export const testURLConnection = async (url: string): Promise<boolean> => {
  try {
    await axios.get(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Auto URL detection function
export const autoDetectBaseURL = async (): Promise<string> => {
  for (const url of Object.values(BASE_URLS)) {
    if (await testURLConnection(url)) {
      setBaseURL(url);
      return url;
    }
  }
  return currentBaseURL; // Fallback to default if no URLs are accessible
};