import { Field, ErrorMessage } from "formik";
import { usePersona } from "../../context/PersonaProvider";
import { useState } from "react";

const DniInput = ({ label, name, setFieldValue, nombreField, idField, tipoPersona }) => {
  const { getPersonaByDNI } = usePersona();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBlur = async (e) => {
    const dni = e.target.value.trim();
    if (dni.length === 8) {
      setLoading(true);
      setError("");
      setFieldValue(idField, ""); // Limpiar ID antes de buscar
  
      const persona = await getPersonaByDNI(dni);
  
      if (persona && persona.tipo === tipoPersona) {
        setFieldValue(nombreField, `${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}`);
        setFieldValue(idField, persona.idtb_persona); // Asignar ID correctamente
        // console.log("ide de persona dice",persona.idtb_persona)
      } else {
        setFieldValue(nombreField, "No encontrado");
        setFieldValue(name, ""); // Limpiar el campo de DNI
        setError(`Persona no encontrada o no es un ${tipoPersona}.`);
      }
  
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col">
      <label className="font-medium">{label}</label>
      <Field name={name} placeholder="Ingrese el DNI" className="border p-2 rounded-md" onBlur={handleBlur} />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
      {loading && <p className="text-blue-500 text-sm">Buscando...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DniInput;
