import { get, post, put, del } from "../api_helper";

const BASE_API_URL = `${process.env.REACT_APP_RESULT_ENDPOINT}`;

const getListResult = (filter) => {
  let q = spreadSearchQuery(filter);
  return get(`${BASE_API_URL}/?${q}`);
};

const getResultById = (id) => {
  return get(`${BASE_API_URL}/${id}`);
};

const addNewCategrory = (Result) => {
  return post(`${BASE_API_URL}`, Result);
};

const updateResult = (Result) => {
  return put(`${BASE_API_URL}`, Result);
};

const deleteResult = (id) => {
  return del(`${BASE_API_URL}/${id}`);
};

export {
  getListResult,
  getResultById,
  addNewCategrory,
  updateResult,
  deleteResult,
};
