import React from "react";

const Button = ({ type = "button", variant = "primary", children, ...props }) => {
  const baseClass =
    "px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white rounded-lg focus:ring-4 focus:outline-none";
   
  const variants = {
    primary: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
    secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  };

  return (
    <button
      type={type}
      className={`${baseClass} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
