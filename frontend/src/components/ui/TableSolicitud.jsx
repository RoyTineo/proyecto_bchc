import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Modal from "./Modal";

const TableSolicitud = ({ solicitudes, onEdit, onDelete }) => {
    
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
     // Función para abrir el modal con los datos de la persona seleccionada
  const handleView = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              #
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Fecha
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Tipo de credito
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Solicitante
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Fiador
            </th>
            
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Monto
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Destino
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Operaciones
            </th>
          </tr>
        </thead>
        <tbody>
            
            
          {solicitudes?.length > 0 ? 
          (
              solicitudes.map((solicitud, index) => ( 
                  <tr
                key={solicitud.idtb_solicitud || index}
                className="hover:bg-gray-100"
              >
                <td className="py-3 px-4 font-semibold">{index + 1}</td>
                <td className="py-3 px-4 font-normal">{solicitud.fecha_solicitud}</td>
                <td className="py-3 px-4 font-normal">
                  {solicitud.tipo_credito}
                </td>
                {/* <td className="py-3 px-4 font-normal">{solicitud.destino}</td> */}
                <td className="py-3 px-4 font-normal">
                  {solicitud.idtb_personaSolicitante}
                </td>
                <td className="py-3 px-4 font-normal">{solicitud.idtb_personaFiador}</td>
                <td className="py-3 px-4 font-normal">
                 S/. {solicitud.monto}.00
                </td>
                <td className="py-3 px-4 font-normal">{solicitud.destino}</td>
                <td className="py-3 px-4 flex space-x-2">
                  {/* Botón de Ver Detalles */}
                  <button
                    onClick={() => handleView(solicitud)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEye />
                  </button>
                  {/* Botón de Editar */}
                  <button
                    onClick={() => onEdit(solicitud.idtb_solicitud)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  {/* Botón de Eliminar */}
                  <button
                    onClick={() => onDelete(solicitud.idtb_solicitud)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No hay Solicitudes registradassa.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Modal para mostrar detalles de la persona */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles de la Solicitud"
      >
        {selectedSolicitud && (
          <div>
            <p><strong>Identificador:</strong> {selectedSolicitud.idtb_solicitud} </p>
            <p><strong>Fecha de la Solicitud:</strong> {selectedSolicitud.fecha_solicitud}</p>
            <p><strong>Tipo de Credito:</strong> {selectedSolicitud.tipo_credito  || "No registrado"}</p>
            <p><strong>Destino:</strong> {selectedSolicitud.destino || "No registrado"}</p>
            <p><strong>Moneda:</strong> {selectedSolicitud.moneda || "No registrada"}</p>
            <p><strong>Monto:</strong> {selectedSolicitud.monto || "No registrada"}</p>
            <p><strong>Plazo:</strong> {selectedSolicitud.plazo || "No registrada"}</p>
            <p><strong>Solicitante:</strong> {selectedSolicitud.idtb_personaSolicitante || "No registrado"}</p>
            <p><strong>Fiador:</strong> {selectedSolicitud.idtb_personaFiador || "No registrado"}</p>
            <p><strong>Situación:</strong> {selectedSolicitud.situacion || "No registrado"}</p>
            
          </div>
        )}
      </Modal>

    </div>
  );
};

export default TableSolicitud;
