import { useContext, useState } from "react";
import {
  getPersonasRequest,
  getPersonaRequest,
  createPersonaRequest,
  updatePersonaRequest,
  deletePersonaRequest,
  getPersonaByDNIRequest,
} from "../api/persona.api";

import { PersonaContext } from "./PersonaContext";

// Creando mi propio hook, me permite importar  el contexto en cualquier componente y acceder a los datos que necesito.
export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error("usePersona deberia estar dentro de PersonaProvider");
  }
  return context;
};
export const PersonaContextProvider = ({ children }) => {
  // arreglo de personas
  const [personas, setPersonas] = useState([]);

  // cargar la lista de personas
  async function loadPersonas() {
    const response = await getPersonasRequest();
    setPersonas(response.data);
    // console.log(response.data);
  }
  // Eliminar persona, cambiando de estado a 0
  const deletePersona = async (id, newFields) => {
    try {
      const response = await deletePersonaRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  // const deletePersona = async (id) => {
  //   try {
  //     const response = await deletePersonaRequest(id);
  //     setPersonas(personas.filter((persona) => persona.id !== id));
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const createPersona = async (persona) => {
    try {
      const response = await createPersonaRequest(persona);
      console.log(response);
      if (response.status === 200) {
        setPersonas([...personas, response.data]); // Solo actualizar si el registro fue exitoso
      }
      return response; // Retorna la respuesta para manejar el formulario.
    } catch (error) {
      console.error(error);
      return (
        error.response || { status: 500, message: "Error en la solicitud" }
      );
    }
  };
  const getPersona = async (id) => {
    try {
      const response = await getPersonaRequest(id);
      return response.data;
    } catch (error) {
      console.error("Error al obtener persona", error);
    }
  };

  const getPersonaByDNI = async (dni) => {
    try {
      const response = await getPersonaByDNIRequest(dni);
      return response.data; // Retorna la persona encontrada
    } catch (error) {
      console.error("Error al obtener persona:", error);
      return null;
    }
  };

  const updatePersona = async (id, newFields) => {
    try {
      const response = await updatePersonaRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PersonaContext.Provider
      value={{
        personas,
        loadPersonas,
        deletePersona,
        createPersona,
        getPersona,
        updatePersona,
        getPersonaByDNI,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
};
