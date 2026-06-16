import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080/api/trips";

const API = axios.create({
  baseURL: API_URL,
});

export default API;