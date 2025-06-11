import axios from "axios";
const backendServer = 'https://ttxtss-backend.onrender.com'

axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: backendServer, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // If you want to send cookies with every request
});
