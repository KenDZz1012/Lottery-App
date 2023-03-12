import axios from "axios";

export async function get(url, config = {}) {
  return await axios.get(url, { ...config }).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axios
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axios
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axios
    .delete(url, { ...config })
    .then((response) => response.data);
}

export async function postWithFormData(url, data, config = {}) {
  return axios.post(url, data, { ...config }).then((response) => response.data);
}

export async function putWithFormData(url, data, config = {}) {
  return axios.put(url, data, { ...config }).then((response) => response.data);
}
