import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/cloning-536ef/us-central1/api",
  
  // deployed version of amazon on render
  baseURL: "https://amazon-api-deploy-tpks.onrender.com",
});

export { axiosInstance };
