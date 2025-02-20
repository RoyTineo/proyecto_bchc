import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import TablePersona from "../components/ui/TablePersona";
import { usePersona } from "../context/PersonaProvider";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export const Persona = () => {
  const {
    personas,
    loadPersonas,
    deletePersona,
    createPersona,
    updatePersona,
    getPersona,
  } = usePersona();

  const [editingPersona, setEditingPersona] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState(null);

  useEffect(() => {
    loadPersonas();
  }, []);

  const handleEdit = async (id) => {
    Swal.fire("Editar", `Editar Persona con ID: ${id}`, "info");
    const persona = await getPersona(id);
    setSelectedPersona(persona);
    setEditingPersona(persona);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deletePersona(id);
      loadPersonas();
      Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
    }
  };

  const validationSchema = Yup.object({
    apellidoPaterno: Yup.string().required(
      "El apellido paterno es obligatorio"
    ),
    apellidoMaterno: Yup.string().required(
      "El apellido materno es obligatorio"
    ),
    nombre: Yup.string().required("El nombre es obligatorio"),
    dni: Yup.string()
      .matches(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos numéricos")
      .required("El DNI es obligatorio"),
    telefono: Yup.string().matches(
      /^\d{7,9}$/,
      "El teléfono debe tener entre 7 y 9 dígitos numéricos"
    ),
    direccion: Yup.string().optional(),
  });

  function renderMain() {
    if (personas.length === 0) return <h2>No hay Personas Registradas</h2>;
    return (
      <TablePersona
        customers={personas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <>
      <Formik
        initialValues={
          selectedPersona || {
            apellidoPaterno: "",
            apellidoMaterno: "",
            nombre: "",
            dni: "",
            telefono: "",
            direccion: "",
          }
        }
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          if (editingPersona) {
            await updatePersona(selectedPersona.idtb_persona, values);
            setEditingPersona(false);
            setSelectedPersona(null);
            Swal.fire(
              "Actualizado!",
              "Registro actualizado con éxito!",
              "success"
            );
          } else {
            await createPersona(values);
            Swal.fire("Registrado!", "Registro agregado con éxito!", "success");
          }
          actions.resetForm();
          loadPersonas();
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="bg-white shadow-md rounded-md pb-8">
              <h2 className="text-xl font-bold p-8">
                {editingPersona ? "Editar Persona" : "Registro de Personas"}
              </h2>
              <div className="grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
                <Input label="Apellido Paterno:" name="apellidoPaterno" />
                <Input label="Apellido Materno:" name="apellidoMaterno" />
                <Input label="Nombre:" name="nombre" />
                <Input label="DNI:" name="dni" />
                <Input label="Teléfono:" name="telefono" />
                <div className="sm:col-span-2 md:col-span-3 xl:col-span-3">
                  <Input label="Dirección:" name="direccion" />
                </div>
              </div>
              <div className="text-center mt-4">
                <Button type="submit" variant="success">
                  {editingPersona ? "Actualizar" : "Registrar"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="bg-white shadow-md rounded-md p-8 my-8">
        <h1 className="text-xl font-bold mb-4">Lista de Personas</h1>
        {renderMain()}
      </div>
    </>
  );
};

export default Persona;
