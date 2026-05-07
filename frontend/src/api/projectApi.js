import axios from "axios";
const API = "https://code-eclipse-backend.onrender.com/api";

//GET all projects
export async function getAllProjects() {
  const { data } = await axios.get(`${API}/projects`);
  return data;
}

//get Single project by id
export async function getProjectById(id) {
  const { data } = await axios.get(`${API}/projects/${id}`);
  return data;
}

//Save a new Project
export async function saveProject(payload) {
  const { data } = await axios.post(`${API}/projects`, payload);
  return data;
}

//Delete a project
export async function deleteProject(id) {
  const { data } = await axios.delete(`${API}/projects/${id}`);
  return data;
}
