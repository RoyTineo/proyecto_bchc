import React from "react";
import { FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";

const TableCliente = ({ customers, onEdit, onDelete, onGenerateRequest }) => {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">#</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">DNI</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Teléfono</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.idtb_persona} className="hover:bg-gray-100">
              <td className="py-3 px-4 font-semibold">{index + 1}</td>
              <td className="py-3 px-4 font-normal">{customer.nombre+", "+customer.apellidoPaterno + " "+customer.apellidoMaterno}</td>
              <td className="py-3 px-4 font-normal">{customer.dni}</td>
              <td className="py-3 px-4 font-normal">{customer.telefono}</td>
              <td className="py-3 px-4 flex space-x-2">
                {/* Botón de Editar */}
                <button
                  onClick={() => onEdit(customer.idtb_persona)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                {/* Botón de Eliminar */}
                <button
                  onClick={() => onDelete(customer.idtb_persona)}
                  // onClick={console.log("Eliminar" + customer.idtb_persona)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
                {/* Botón de Generar Solicitud */}
                <button
                  onClick={() => onGenerateRequest(customer.idtb_persona)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaFileAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCliente;
