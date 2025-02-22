import { useContext, useState } from "react";
import {
  getPersonasRequest,
  getPersonaRequest,
  createPersonaRequest,
  updatePersonaRequest,
  deletePersonaRequest,
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
  const deletePersona = async (id,newFields) => {
    try {
      const response = await deletePersonaRequest(id,newFields);
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
      setPersonas([...personas, response.data]);
    } catch (error) {
      console.error(error);
    }
  };
  const getPersona = async (id) => {
    try {
      const response = await getPersonaRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
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
      }}
      
    >
      {children}
    </PersonaContext.Provider>
  );
};
