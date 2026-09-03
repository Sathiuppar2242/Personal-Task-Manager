import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getTasks = () => {
  return axios.get(API_URL);
};

const createTask = (task) => {
  return axios.post(API_URL, task);
};

const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task);
};

const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};