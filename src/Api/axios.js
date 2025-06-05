import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://127.0.0.1:5001/cloning-536ef/us-central1/api",
});

export  {axiosInstance};
