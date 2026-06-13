import axios from "axios";

const API = "http://localhost:3000";

export const createLike = async (data) => {
  const res = await axios.post(`${API}/like`, data);
  return res.data;
};

export const getLikes = async () => {
  const res = await axios.get(`${API}/like`);
  return res.data;
};

export const deleteLike = async (id) => {
  const res = await axios.delete(`${API}/like/${id}`);
  return res.data;
};