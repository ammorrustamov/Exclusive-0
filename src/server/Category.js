import axios from "axios";

const API = "http://localhost:3000";

export const getCategories = () => {
  return axios.get(`${API}/category`);
};

export const createCategory = (data) => {
  return axios.post(`${API}/category`, data);
};

export const deleteCategory = (id) => {
  return axios.delete(`${API}/category/${id}`);
};