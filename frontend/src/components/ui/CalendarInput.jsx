import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

const CalendarInput = ({ label, name, setFieldValue }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toISOString().split("T")[0] : ""; // Convierte la fecha a formato YYYY-MM-DD
    setFieldValue(name, formattedDate); // Asigna el valor en Formik
  };

  return (
    <div className="">
      {/* Etiqueta del input si se proporciona */}
      {label && (
        <label htmlFor={name} className="block text-sm/6 font-medium pb-1">
          {label}
        </label>
      )}

      {/* Contenedor con posición relativa para colocar el icono */}
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        
        {/* Ícono de calendario al costado derecho */}
        <FaRegCalendarAlt className="absolute top-2 right-3 h-5 w-5 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default CalendarInput;
