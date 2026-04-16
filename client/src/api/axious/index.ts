import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth",
  timeout: 5000,
});
