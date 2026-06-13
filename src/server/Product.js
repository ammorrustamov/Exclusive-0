import axios from "axios";

const API = "http://localhost:3000";

export const getProducts = () => {
  return axios.get(`${API}/products`);
};

export const getProductById = (id) => {
  return axios.get(`${API}/products/${id}`);
};

export const createProduct = (data) => {
  return axios.post(`${API}/products`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API}/products/${id}`);
};
