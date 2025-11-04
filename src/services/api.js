// src/services/api.js
const isProduction = import.meta.env.MODE === "production";

export const backendUrl =
  isProduction
    ? import.meta.env.VITE_API_URL
    : "http://localhost:8000";
console.log("API URL usada:", backendUrl);
