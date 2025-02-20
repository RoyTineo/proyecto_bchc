import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Input from '../ui/Input'
import Button from '../ui/Button'

import { IoChevronDown } from "react-icons/io5";

// Validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  amount: Yup.number()
    .min(1, "El monto debe ser mayor a 0")
    .required("El monto es obligatorio"),
});

const FormSolicitud = () => {
  const initialValues = {
    name: "",
    email: "",
    amount: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    // Aquí iría la lógica para enviar los datos al backend
    console.log("Datos enviados:", values);

    // Mostrar SweetAlert2
    Swal.fire({
      icon: "success",
      title: "¡Solicitud enviada!",
      text: "Tus datos han sido registrados correctamente.",
      confirmButtonText: "OK",
    });

    resetForm(); // Reiniciar el formulario
  };

  return (
    <div className=" mx-auto mt-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* ----------------------datos de la solicitud*/}
            <div className="grid sm:grid-rows-1 md:grid-rows-2 xl:grid-rows-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-2 px-4 mt-10 p-6 bg-white shadow-md rounded ">
                {/* campo: id solicitud */}
              <div className="">
               <Input label="ID Solicitud:" name="idSolicitud" />
              </div>
              {/* campo: fecha */}
              <div className="">
                <label
                  htmlFor="fecha"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Fecha:
                </label>
                <Field
                  type="text"
                  id="fecha"
                  name="fecha"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div className="">
                {/* Campo: Tipo de Credito */}
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Tipo de Credito:
                </label>
                <div className=" grid grid-cols-1">
                  <Field
                    as="select"
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </Field>
                  <IoChevronDown
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              {/* campo: destinoCredito */}
              <div className="">
                <label
                  htmlFor="destinoCredito"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Destino del Credito:
                </label>
                <Field
                  type="text"
                  id="destinoCredito"
                  name="destinoCredito"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <h3>Datos del Solicitante</h3>
            <div className="text-center mt-4">
              <Button type="submit" variant="primary">
                Enviar  
              </Button>
            </div>


            {/* ----------------------datos del solicitante*/}
            <div className="grid  sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-6 px-4 mt-4 p-6 bg-slate-50 shadow-md rounded ">
              {/* campo: apellidoPaterno */}
              <div className="">
                <label
                  htmlFor="apellidoPaterno"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Apellido Paterno:
                </label>
                <Field
                  type="text"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* campo: apellidoMaterno */}
              <div className="">
                <label
                  htmlFor="apellidoMaterno"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Apellido Materno:
                </label>
                <Field
                  type="text"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* campo: nombre */}
              <div className="">
                <label
                  htmlFor="nombre"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Nombre:
                </label>
                <Field
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* campo: dni */}
              <div className="">
                <label
                  htmlFor="dni"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  DNI:
                </label>
                <Field
                  type="text"
                  id="dni"
                  name="dni"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* campo: telefono */}
              <div className="">
                <label
                  htmlFor="telefono"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Teléfono:
                </label>
                <Field
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {/* campo: direccion */}
              <div className="xl:col-span-3">
                <label
                  htmlFor="direccion"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Dirección:
                </label>
                <Field
                  type="text"
                  id="direccion"
                  name="direccion"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* ############################# */}

            {/* Campo: Nombre */}
            <div className="mb-4">
              
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Nombre"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Campo: Correo */}
            <div className="mb-4">
              
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Campo: Monto */}
            <div className="mb-4">
             
              <Field
                type="number"
                id="amount"
                name="amount"
                placeholder="Monto"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Botón de Enviar */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Registrar Solicitud
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormSolicitud;
