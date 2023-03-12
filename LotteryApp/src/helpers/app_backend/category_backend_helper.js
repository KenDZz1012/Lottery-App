import { get, post, put, del } from "../api_helper";

const BASE_API_URL = `${process.env.REACT_APP_CATEGORY_ENDPOINT}`;

const getListCategory = () => {
  return get(`${BASE_API_URL}`);
};

const getCategoryById = (id) => {
  return get(`${BASE_API_URL}/${id}`);
};

const addNewCategrory = (category) => {
  return post(`${BASE_API_URL}`, category);
};

const updateCategory = (category) => {
  return put(`${BASE_API_URL}`, category);
};

const deleteCategory = (id) => {
  return del(`${BASE_API_URL}/${id}`);
};

export {
  getListCategory,
  getCategoryById,
  addNewCategrory,
  updateCategory,
  deleteCategory,
};
