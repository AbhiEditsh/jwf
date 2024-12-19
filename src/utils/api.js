import axios from "axios";

const api = axios.create({
  baseURL: "https://jewellery01-back.onrender.com/api",
  // baseURL: "http://localhost:9000/api",
});
export default api;
