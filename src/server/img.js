import axios from "axios";

const API = "http://localhost:3000";

// /**
//  * Add Image
//  * @param {Object} data
//  * { title: string, image: string }
//  */
// export const addImg = (data) => {
//   return axios.post(`${API}/img`, data);
// };

/**
 * Get All Images
 */
export const getImgs = () => {
  return axios.get(`${API}/img`);
};

/**
 * Get Image By ID
 */
export const getImgById = (id) => {
  return axios.get(`${API}/img/${id}`);
};

// /**
//  * Update Image
//  */
// export const updateImg = (id, data) => {
//   return axios.put(`${API}/img/${id}`, data);
// };

/**
 * Delete Image
 */
export const deleteImg = (id) => {
  return axios.delete(`${API}/img/${id}`);
};