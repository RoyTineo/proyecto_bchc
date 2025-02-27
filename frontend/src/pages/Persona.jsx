import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import TablePersona from "../components/ui/TablePersona";
import { usePersona } from "../context/PersonaProvider";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import ComboBox from "../components/ui/ComboBox";
import Modal from "../components/ui/Modal"; 

const TipoPersona = [
  { value: "Solicitante", label: "Solicitante" },
  { value: "Fiador", label: "Fiador" },
  { value: "Ambos", label: "Solicitante y Fiador" },
];

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPersonas();
  }, []);

  const handleEdit = async (id) => {
    Swal.fire("Editar", `Editar Persona con ID: ${id}`, "info");
    const persona = await getPersona(id);
    setSelectedPersona(persona);
    // console.log("Personas del handleedit",persona);
    setEditingPersona(persona);
    setShowModal(true);
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
    // Eliminar persona, cambiando de estado a 0
    if (result.isConfirmed) {
      await deletePersona(id, { estado: 0 }); // Actualiza el estado a 0 en la base de datos
      loadPersonas(); // Recargar la lista para reflejar los cambios
      Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
    }
    // if (result.isConfirmed) {
    //   await deletePersona(id);	// Actualiza el estado a 0 en la base de datos
    //   loadPersonas(); // Recargar la lista para reflejar los cambios
    //   Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
    // }
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
    tipo: Yup.string().required("El tipo de persona es obligatorio"),
    ruc: Yup.string().optional(),
    correo: Yup.string().email("Correo electrónico inválido").optional(),
    observacion: Yup.string().optional(),
  });
  //mostrando personas con estado diferentes a 0 osea todos los activos
  function renderMain() {
    const personasActivas = personas.filter((persona) => persona.estado !== 0);
    if (personasActivas.length === 0){


      return <h2>No hay Personas Registradas</h2>;
    }
     // Ordenar las solicitudes de más reciente a más antigua
     const sortedPersonas = [...personasActivas].sort(
      (a, b) => b.idtb_persona - a.idtb_persona
    );
    return (
      <TablePersona
        customers={sortedPersonas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }
  // function renderMain() {
  //   if (personas.length === 0) return <h2>No hay Personas Registradas</h2>;
  //   return (
  //     <TablePersona
  //       customers={personas}
  //       onEdit={handleEdit}
  //       onDelete={handleDelete}
  //     />
  //   );
  // }

  return (
    <>
    <Button onClick={() => setShowModal(true)}>Añadir nueva Persona</Button>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Persona">

      <Formik
        initialValues={
          selectedPersona || {
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            dni: "",
            ruc: "",
            telefono: "",
            direccion: "",
            correo: "",
            observacion: "",
            // estado: "",
            tipo: "",
          }
        }
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          try {
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
              const response = await createPersona(values); // Esperar la respuesta del backend
              // console.log(response)
              if (response.status === 200) {
                Swal.fire(
                  "Registrado!",
                  "Registro agregado con éxito!",
                  "success"
                );
              } else {
                Swal.fire("Error", "No se pudo registrar la persona", "error");
              }
            }
          } catch (error) {
            Swal.fire("Error", "Ocurrió un problema al registrar", "error");
          }

          actions.resetForm();
          loadPersonas();
          setShowModal(false);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="bg-white shadow-md rounded-md pb-8">
              <h2 className="text-xl font-bold p-8">
                {editingPersona ? "Editar Persona" : "Registro de Personas"}
              </h2>
              <div className="grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
                <Input label="*Nombre:" name="nombre" />
                <Input label="*Apellido Paterno:" name="apellidoPaterno" />
                <Input label="*Apellido Materno:" name="apellidoMaterno" />
                <Input label="*DNI:" name="dni" />
                <Input label="Ruc:" name="ruc" />
                <Input label="Teléfono:" name="telefono" />
                <div className="sm:col-span-2">
                  <Input label="Dirección:" name="direccion" />
                </div>
                <Input label="Correo:" name="correo" />

                <ComboBox label="*Tipo:" name="tipo" options={TipoPersona} />
                <div className="sm:col-span-2">
                  <Input label="Observación:" name="observacion" />
                </div>
              </div>
              <div className="text-center mt-4 space-x-4">
                <Button type="submit" variant="success">
                  {editingPersona ? "Actualizar" : "Registrar"}
                </Button>
                <Button type="button" variant="danger" onClick={() => setShowModal(false)}>Cancelar</Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      </Modal>

      <div className="bg-white shadow-md rounded-md p-8 my-8">
        <h1 className="text-xl font-bold mb-4">Lista de Personas</h1>
        {renderMain()}
      </div>
    </>
  );
};

export default Persona;
