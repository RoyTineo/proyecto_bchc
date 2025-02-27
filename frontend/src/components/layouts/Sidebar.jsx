import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoDocumentText,
  IoHome,
  IoEye,
  IoCheckbox,
  IoPerson,
  IoPersonAddSharp,
} from "react-icons/io5";

import logo from "../../assets/Logo_Blanco_BC&HC_80x52.png";

const Sidebar = () => {
  return (
    <div className=" h-screen w-64 bg-slate-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700 text-center text-lg font-bold">
        <img
          src={logo} // Puedes reemplazar con tu logo.
          alt="Logo"
          className="mx-auto"
        />
      </div>

      <nav className="flex-1 p-4">
        <ul>
          {Menu.map(({ icon, label, to }) => (
            <li key={label} className="mb-4">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-600"
                  }`
                }
              >
                <div className="text-xl">{icon}</div>
                <span className="text-sm">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-sm">
        <a href="#" className="hover:underline">
          Mi Perfil
        </a>
      </div>
    </div>
  );
};

// LINKS DEL MENU
const Menu = [
  {
    label: "Inicio",
    icon: <IoHome />,
    to: "/",
  },
  {
    label: "Persona",
    icon: <IoPersonAddSharp />,
    to: "/Persona",
  },
  
  {
    label: "Generar Solicitudes",
    icon: <IoDocumentText />,
    to: "/Solicitudes",
  },
  {
    label: "Evaluaciones",
    icon: <IoEye />,
    to: "/Evaluaciones",
  },
  {
    label: "Resoluciones",
    icon: <IoCheckbox />,
    to: "/Resoluciones",
  },
  {
    label: "Administración",
    icon: <IoPerson />,
    to: "/Administracion",
  },
];
// END LINKS DEL MENU

export default Sidebar;
