import { useContext, useState } from "react";
import {
  getSolicitudesRequest,
  getSolicitudRequest,
  createSolicitudRequest,
  updateSolicitudRequest,
  deleteSolicitudRequest,
} from "../api/solicitud.api";

import { SolicitudContext } from "./SolicitudContext";

// Creando mi propio hook, me permite importar  el contexto en cualquier componente y acceder a los datos que necesito.
export const useSolicitud = () => {
  const context = useContext(SolicitudContext);
  if (context === undefined) {
    throw new Error("useSolicitud deberia estar dentro de SolicitudProvider");
  }
  return context;
};
export const SolicitudContextProvider = ({ children }) => {
  // arreglo de solicitudes
  const [solicitudes, setSolicitudes] = useState([]);

  // cargar la lista de solicitudes
  async function loadSolicitudes() {
    const response = await getSolicitudesRequest();
    setSolicitudes(response.data);
    // console.log("Aqui deberia venir los datos",response.data);
  }

// Eliminar solicitud, cambiando de estado a 0
  const deleteSolicitud = async (id,newFields) => {
    try {
      const response = await deleteSolicitudRequest(id,newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  const createSolicitud = async (solicitud) => {
    console.log("la soli",solicitud)
    try {
      const response = await createSolicitudRequest(solicitud);
      console.log(response);
      if( response.status === 200){
        setSolicitudes([...solicitudes, response.data]); // Solo actualizar si el registro fue exitoso
      }
      return response; // Retorna la respuesta para manejar el formulario.
    } catch (error) {
      console.error(error);
      return error.response || { status: 500, message: "Error en la solicitud" };
    }
  };
  
  const getSolicitud = async (id) => {
    try {
      const response = await getSolicitudRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateSolicitud = async (id, newFields) => {
    try {
      const response = await updateSolicitudRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SolicitudContext.Provider
      value={{
        solicitudes,
        loadSolicitudes,
        deleteSolicitud,
        createSolicitud,
        getSolicitud,
        updateSolicitud,
      }}
      
    >
      {children}
    </SolicitudContext.Provider>
  );
};
