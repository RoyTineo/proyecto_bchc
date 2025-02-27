
import React, { useState } from "react";
import { FaEdit, FaTrash,FaEye } from "react-icons/fa";
import Modal from "./Modal";  

const TablePersona = ({ customers, onEdit, onDelete }) => {

  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal con los datos de la persona seleccionada
  const handleView = (persona) => {
    setSelectedPersona(persona);
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">#</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">DNI</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tipo</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Teléfono</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers?.length>0?(


            customers.map((customer, index) => (
              <tr key={customer.idtb_persona || index} className="hover:bg-gray-100">
                <td className="py-3 px-4 font-semibold">{index + 1}</td>
                <td className="py-3 px-4 font-normal">{customer.nombre+", "+customer.apellidoPaterno + " "+customer.apellidoMaterno}</td>
                <td className="py-3 px-4 font-normal">{customer.dni}</td>
                <td className="py-3 px-4 font-normal">{customer.tipo}</td>
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
                   {/* Botón Ver */}
                <button
                  onClick={() => handleView(customer)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaEye />
                </button>
                </td>
              </tr>
            )
          )
        ): (
          <tr>
            <td colSpan="5" className="text-center py-4">No hay personas registradas.</td>
          </tr>
        )
      
      }
          
        </tbody>
      </table>

      {/* Modal para mostrar detalles de la persona */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles de la Persona"
      >
        <div className="bg-white shadow-md rounded-md p-8">

        {selectedPersona && (
          <div>
            <p><strong>Nombre:</strong> {selectedPersona.nombre} {selectedPersona.apellidoPaterno} {selectedPersona.apellidoMaterno}</p>
            <p><strong>DNI:</strong> {selectedPersona.dni}</p>
            <p><strong>RUC:</strong> {selectedPersona.ruc  || "No registrado"}</p>
            <p><strong>Teléfono:</strong> {selectedPersona.telefono || "No registrado"}</p>
            <p><strong>Dirección:</strong> {selectedPersona.direccion || "No registrada"}</p>
            <p><strong>Correo:</strong> {selectedPersona.correo || "No registrada"}</p>
            <p><strong>Observación:</strong> {selectedPersona.observacion || "No registrada"}</p>
            <p><strong>Tipo:</strong> {selectedPersona.tipo.toUpperCase() || "No registrado"}</p>
          </div>
          
        )}
        </div>

      </Modal>

    </div>
  );
};

export default TablePersona;
