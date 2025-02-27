import axios from "axios";

const API_URL = "http://localhost:4000/api/persona";

export const getPersonasRequest = async () => {
  return await axios.get(API_URL);
};

export const getPersonaRequest = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};
export const getPersonaByDNIRequest = async (dni) => {
  return await axios.get(`${API_URL}bydni/${dni}`);
};

export const createPersonaRequest  = async (persona) => {
  return await axios.post(API_URL, persona);
};
export const updatePersonaRequest  = async (id, newPersona) => {
  return await axios.put(`${API_URL}/${id}`,newPersona);
};

// Eliminar persona cambiando de estado a 0
export const deletePersonaRequest  = async (id, newPersona) => {
  return await axios.put(`${API_URL}/${id}`,newPersona);
};
// export const deletePersonaRequest  = async (id) => {
//   return await axios.delete(`http://localhost:4000/persona/${id}`);
// };
