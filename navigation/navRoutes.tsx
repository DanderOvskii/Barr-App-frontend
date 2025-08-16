// navigation/routes.ts

export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login",
    SIGNUP: "/(auth)/signup",
  },
  APP: {
    HOME: "/(app)/Home",
    PRODUCTS: "/(app)/Products",
    PRODUCT_INFO: "/(app)/ProductInfo",
    MORE: "/(app)/More",
    STATS: "/(app)/Stats",
  },
  MANAGER: {
    PRODUCT_MANAGER: "/(manager)/ProductManager",
    ACCOUNT_MANAGER: "/(manager)/accountManager",
  },
} as const;
