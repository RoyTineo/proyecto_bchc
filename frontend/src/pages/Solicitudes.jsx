import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import FormSolicitud from "../components/shared/FormSolicitud";
import Input from "../components/ui/Input";
import ComboBox from "../components/ui/ComboBox";
import Button from "../components/ui/Button";
import TextHeader from "../components/ui/TextHeader";
import CalendarInput from "../components/ui/CalendarInput";

const tipoCredito = [
  { value: "principal", label: "Principal" },
  { value: "extraordinario", label: "Extraordinario" },
  { value: "campaña", label: "Campaña" },
];
const analista = [
  { value: "Perico Perez Morote", label: "Perico Perez Morote" },
  { value: "Agapito Quispe García", label: "Agapito Quispe García" },
  { value: "campaña", label: "Campaña" },
];
const nivelRiesgo = [
  { value: "alto", label: "Alto" },
  { value: "medio", label: "Medio" },
  { value: "bajo", label: "Bajo" },
];

export const Solicitudes = () => {
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="grid-col-1 ">
          <Formik>
            <div className=" bg-white shadow-md rounded-md p-6">
              <TextHeader text="Datos del Cliente:" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                <div className=" lg:col-span-2  pb-4">
                  <Input
                    label="Nombre del cliente:"
                    name="nombreCliente"
                    placeholder="Nombre completo del cliente"
                  />
                </div>
                <div className="lg:grid-col-1 pb-4">
                  <Input label="DNI:" name="dni" />
                </div>
                <div className="lg:grid-col-1  pb-4 ">
                  <Input label="Teléfono:" name="telefono" />
                </div>
              </div>
            </div>
          </Formik>
        </div>
        <div className="grid-col-1 ">
          <Formik>
            <div className=" bg-white shadow-md rounded-md p-6">
              <TextHeader text="Datos del Fiador:" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 ">
                <div className=" lg:col-span-2  pb-4">
                  <Input
                    label="Nombre del fiador:"
                    name="nombreFiador"
                    placeholder="Nombre completo del fiador"
                  />
                </div>
                <div className="lg:grid-col-1  pb-4">
                  <Input label="DNI:" name="dni" />
                </div>
                <div className="lg:grid-col-1  pb-4 ">
                  <Input label="Teléfono:" name="telefono" />
                </div>
              </div>
            </div>
          </Formik>
        </div>
      </div>

      {/* ############## Solicitud de credito ########### */}
      <div className="bg-white shadow-md rounded-md p-6 mt-6">
        <Formik
          initialValues={{ fechaInicio: "", fechaFin: "" }}
          onSubmit={(values) => {
            Swal.fire(
              "Datos Enviados",
              JSON.stringify(values, null, 2),
              "success"
            );
          }}
        >
          <div className="">
            <TextHeader text="Solicitud de Crédito:" />
            <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 mt-4 ">
              <CalendarInput
                label="Fecha:"
                name="date"
                dateFormat="dd/MM/yyyy" // Formato de la fecha
                placeholderText="Selecciona una fecha"
              />

              {/* <Input label="Fecha:" name="fecha" /> */}
              <ComboBox
                label="Tipo de Credito:"
                name="tipoCredito"
                options={tipoCredito}
              />
              <Input label="Monto:" name="monto" />
              <Input label="Moneda:" name="moneda" value="SOLES" />
              <Input label="Plazo:" name="plazo" />
            </div>
          </div>
        </Formik>
      </div>

      {/* ################ Propuesta de credtio ############## */}
      <div className="bg-white shadow-md rounded-md p-6 mt-6">
        <Formik>
          <div className="">
            <TextHeader text="Propuesta de credito:" />
            <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 mt-4 ">
             
              <ComboBox
                label="Analista:"
                name="analista"
                options={analista}
              />
              <Input label="Agencia:" name="agencia"  value="Ayacucho"/>
              <ComboBox
                label="Nivel de Riesgo::"
                name="nivelRiesgo"
                options={nivelRiesgo}
              />

              <Input label="Monto:" name="monto" />
              <Input label="Tasa (%):" name="tasa" />
              <Input label="Monto Cuota:" name="montoCuota" />
              <Input label="Cuota:" name="Cuota" />
              <Input label="Plazo:" name="plazo" />
              <Input  type="text"label="Observaciones:" name="observaciones" />
            </div>
          </div>
        </Formik>
      </div>
    </>
  );
};
