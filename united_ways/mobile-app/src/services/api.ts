import axios from "axios";

const api = axios.create({
  baseURL: "http://YOUR_IP_ADDRESS:5000/api",
  timeout: 10000,
});

export default api;