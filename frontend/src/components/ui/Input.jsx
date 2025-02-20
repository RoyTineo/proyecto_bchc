

import React from "react";
import { Field, ErrorMessage } from "formik";

const Input = ({ label, name, type = "text", ...props }) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={name} className="block text-sm/6 font-medium pb-1">
          {label}
        </label>
      )}
      
      <Field
        id={name}
        name={name}
        type={type}
        {...props}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default Input;