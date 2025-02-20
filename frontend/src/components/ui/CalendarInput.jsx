import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarToday } from "react-icons/md";

const CalendarInput = ({ label, name, ...props }) => {
  const { setFieldValue } = useFormikContext(); // Permite actualizar el valor del campo en Formik
  const [field, meta] = useField(name); // Formik Field y Meta para manejo de errores

  return (
    <div className="">
      {label && (
        <label className="block text-sm/6 font-medium pb-1">{label}</label>
      )}

      <div className="grid grid-cols-1  ">
        <div className="relative flex items-center">
            {/* Icono */}
          <MdCalendarToday
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
          {/* Campo DatePicker */}
          <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => setFieldValue(name, val)}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          
        </div>
      </div>

      {/* Mensaje de error */}
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CalendarInput;
