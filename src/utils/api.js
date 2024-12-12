import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jewellery01-back.onrender.com/api', 
});
export default api;
