/**
 * API Configuration file
 * Centralizes all API URL configurations for consistency
 */

// Define the base API URL
const API_BASE_URL = "https://transactions-management-t537.onrender.com";

// API endpoints configuration
const API_CONFIG = {
  baseURL: API_BASE_URL,
  endpoints: {
    createProfile: "/api/createprofile",
    login: "/api/login",
    checkUser: (gmail) => `/api/check-user/${gmail}`,
    transaction: "/api/transaction",
    getTransactions: (gmail) => `/api/transactions/${gmail}`,
    getAllTransactions: "/api/transactions_all",
    updateTransactionStatus: "/api/transaction-status",
  },
};

export default API_CONFIG;