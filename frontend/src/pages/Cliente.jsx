import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import TableCliente from "../components/ui/TableCliente";

import Input from "../components/ui/Input";
import ComboBox from "../components/ui/ComboBox";
import Button from "../components/ui/Button";

const creditOptions = [
  { value: "solicitante", label: "Solicitante" },
  { value: "fiador", label: "Fiador" },
];

export const Cliente = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Juan Pérez", dni: "12345678", phone: "987654321", rol:"Solicitante" },
    { id: 2, name: "Ana López", dni: "87654321", phone: "987654322", rol:"Solicitante" },
    { id: 3, name: "Carlos García", dni: "11223344", phone: "987654323", rol:"Solicitante" },
  ]);

  const handleEdit = (id) => {
    Swal.fire("Editar", `Editar cliente con ID: ${id}`, "info");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomers(customers.filter((customer) => customer.id !== id));
        Swal.fire("Eliminado", "El cliente ha sido eliminado.", "success");
      }
    });
  };

  const handleGenerateRequest = (id) => {
    Swal.fire(
      "Solicitud",
      `Generar solicitud para el cliente con ID: ${id}`,
      "success"
    );
  };
  return (
    <>
      <Formik>
        <div className=" bg-white shadow-md rounded-md pb-8">
          <h2 className=" text-xl font-bold p-8">Registro de Cliente</h2>
          <div className="grid sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6  px-8  ">
            <div className="">
              <Input label="Apellido Paterno:" name="apellidoPaterno" />
            </div>
            <div className="">
              <Input label="Apellido Materno:" name="apellidoMaterno" />
            </div>
            <div className="">
              <Input label="Nombre:" name="nombre" />
            </div>
            <div className="">
              <Input label="DNI:" name="dni" />
            </div>
            <div className="">
              <Input label="Teléfono:" name="telefono" />
            </div>
            <div className="md:col-span-2 xl:col-span-2">
              <Input label="Dirección:" name="direccion" />
            </div>
            <div className="">
              <ComboBox label="Rol:" name="rol" options={creditOptions} />
            </div>
          </div>
          <div className=" text-center mt-4 ">
            <Button type="submit" variant="success">
              Registrar
            </Button>
          </div>
        </div>
      </Formik>
      {/* #### Tablas ### */}
      <div className="bg-white shadow-md rounded-md p-8 my-8">
        <h1 className="text-xl font-bold mb-4">Lista de Clientes</h1>
        <TableCliente
          customers={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onGenerateRequest={handleGenerateRequest}
        />
      </div>
    </>
  );
};

export default Cliente;
