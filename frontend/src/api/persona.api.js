import axios from "axios";

export const getPersonasRequest = async () => {
  return await axios.get("http://localhost:4000/persona");
};

export const getPersonaRequest = async (id) => {
  return await axios.get(`http://localhost:4000/persona/${id}`);
};

export const createPersonaRequest  = async (persona) => {
  return await axios.post("http://localhost:4000/persona", persona);
};
export const updatePersonaRequest  = async (id, newPersona) => {
  return await axios.put(`http://localhost:4000/persona/${id}`,newPersona);
};
export const deletePersonaRequest  = async (id) => {
  return await axios.delete(`http://localhost:4000/persona/${id}`);
};
