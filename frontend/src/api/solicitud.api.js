import axios from "axios";

const API_URL = "http://localhost:4000/api/solicitud";

export const getSolicitudesRequest = async () => {
  return await axios.get(API_URL);
};

export const getSolicitudRequest = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const createSolicitudRequest  = async (solicitud) => {
  return await axios.post(API_URL, solicitud);
};
export const updateSolicitudRequest  = async (id, newSolicitud) => {
  return await axios.put(`${API_URL}/${id}`,newSolicitud);
};

// Eliminar solicitud cambiando de estado a 0
export const deleteSolicitudRequest  = async (id, newSolicitud) => {
  return await axios.put(`${API_URL}/${id}`,newSolicitud);
};