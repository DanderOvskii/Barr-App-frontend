// navigation/routes.ts

export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login",
    SIGNUP: "/(auth)/signup",
  },
  HOME: "/Home",
  PRODUCTS: "/Products",
  PRODUCT_INFO: "/ProductInfo",
  MORE: "/More",
  MANAGER: {
    PRODUCT_MANAGER: "/manager/ProductManager",
    ACCOUNT_MANAGER: "/manager/accountManager",
  },
} as const;
