import { useEffect, useState } from "react";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useSolicitud } from "../context/SolicitudProvider";
import Input from "../components/ui/Input";
import ComboBox from "../components/ui/ComboBox";
import CalendarInput from "../components/ui/CalendarInput";
import DniInput from "../components/ui/DniInput";
import TableSolicitud from "../components/ui/TableSolicitud";

const tipoCredito = [
  { value: "Principal", label: "Principal" },
  { value: "Paralelo", label: "Paralelo" },
  { value: "Extraordinario", label: "Extraordinario" },
  { value: "Campaña", label: "Campaña" },
  { value: "Ampliacion", label: "Ampliacion" },
];

export const Solicitudes = () => {
  const {
    solicitudes,
    loadSolicitudes,
    deleteSolicitud,
    createSolicitud,
    getSolicitud,
    updateSolicitud,
  } = useSolicitud();

  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const initialValues = {
    fecha_solicitud: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    tipo_credito: "",
    destino: "",
    moneda: "SOLES",
    monto: "",
    plazo: "",
    dniSolicitante: "",
    dniFiador:"",
    // nombreSolicitante: "",
    // nombreFiador:"",
    idtb_personaSolicitante: "",
    idtb_personaFiador: "",
    situacion: "1",
  };

  const validationSchema = Yup.object({
    tipo_credito: Yup.string().required("Requerido"),
    destino: Yup.string().required("Requerido"),
    moneda: Yup.string().required("Requerido"),
    monto: Yup.number().positive().required("Requerido"),
    plazo: Yup.number().positive().integer().required("Requerido"),
    dniSolicitante: Yup.string().required("Debe seleccionar un solicitante"),
    dniFiador: Yup.string().required("Debe seleccionar un fiador"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Valores", values);
    try {
      if (editing) {
        await updateSolicitud(currentId, values);
        Swal.fire(
          "Actualizado",
          "Solicitud actualizada correctamente",
          "success"
        );
      } else {
        await createSolicitud(values);
        Swal.fire("Registrado", "Solicitud creada correctamente", "success");
      }
      resetForm();
      setEditing(false);
      setCurrentId(null);
      loadSolicitudes();
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al procesar la solicitud", "error");
    }
  };

  const handleEdit = async (id) => {
    Swal.fire("Editar", `Editar Solicitud con ID: ${id}`, "info");
    const solicitud = await getSolicitud(id);
    if (solicitud) {
      setEditing(true);
      setCurrentId(id);
    }
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
    // Eliminar solicitud, cambiando de estado a 0
    if (result.isConfirmed) {
      await deleteSolicitud(id, { estado: 0 }); // Actualiza el estado a 0 en la base de datos
      loadSolicitudes(); // Recargar la lista para reflejar los cambios
      Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
    }
  };

  //mostrando solicitudes con estado diferentes a 0 osea todos los activos y en forma desendente
  function renderMain() {
    const solicitudesActivas = solicitudes.filter(
      (solicitud) => solicitud.estado !== 0
    );
  
    if (solicitudesActivas.length === 0) {
      return <h2>No hay Solicitudes Registradas</h2>;
    }
  
    // Ordenar las solicitudes de más reciente a más antigua
    const sortedSolicitudes = [...solicitudesActivas].sort(
      (a, b) => b.idtb_solicitud - a.idtb_solicitud
    );
  
    return (
      <TableSolicitud
        solicitudes={sortedSolicitudes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Solicitudes</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <CalendarInput
              label="Fecha de Solicitud"
              name="fecha_solicitud"
              setFieldValue={setFieldValue}
            />
            <ComboBox
              label="Tipo de Credito:"
              name="tipo_credito"
              options={tipoCredito}
            />
            <Input label="Destino" name="destino" />
            <Input label="Moneda" name="moneda" />
            <Input label="Monto" name="monto" type="number" />
            <Input label="Plazo (meses)" name="plazo" type="number" />
            <DniInput
              label="Solicitante"
              name="dniSolicitante"
              setFieldValue={setFieldValue}
              nombreField="nombreSolicitante"
              idField="idtb_personaSolicitante"
              tipoPersona="Solicitante"
            />
            <Input
              name="nombreSolicitante"
              readOnly
              
            />
            <Input type="hidden" readOnly name="idtb_personaSolicitante" />


            <DniInput
              label="Fiador"
              name="dniFiador"
              setFieldValue={setFieldValue}
              nombreField="nombreFiador"
              idField="idtb_personaFiador"
              tipoPersona="Fiador"
            />
            <Input
              name="nombreFiador"
              readOnly
              
            />
            <Input  readOnly type="hidden" name="idtb_personaFiador" />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              {editing ? "Actualizar" : "Registrar"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="bg-white shadow-md rounded-md p-8 my-8">
        <h1 className="text-xl font-bold mb-4">Solicitudes Registradas</h1>
        {renderMain()}
      </div>
    </div>
  );
};
