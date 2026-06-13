import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createUser = (data) => {
  return axios.post(`${BASE_URL}/user/create`, data);
};