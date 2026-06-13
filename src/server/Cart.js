import axios from "axios";

const API = "http://localhost:3000";

export const addToCart = (data) => {
  return axios.post(`${API}/cart`, data);
};

export const getCart = () => {
  return axios.get(`${API}/cart`);
};

export const deleteCart = (id) => {
  return axios.delete(`${API}/cart/${id}`);
};