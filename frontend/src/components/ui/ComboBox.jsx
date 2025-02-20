import React from "react";
import { Field, ErrorMessage } from "formik";

import { IoChevronDown } from "react-icons/io5";

const ComboBox = ({ label, name, options, ...props }) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={name} className="block text-sm/6 font-medium pb-1">
          {label}
        </label>
      )}
      <div className="grid grid-cols-1">
        <Field
          as="select"
          id={name}
          name={name}
          {...props}
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          <option value="">Selecciona una opción</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        <IoChevronDown
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        />
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default ComboBox;
