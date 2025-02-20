import React from "react";
import { Route, Routes } from "react-router-dom";
import {Index} from "../pages/Index";
import { Solicitudes } from "../pages/Solicitudes";
import { Evaluaciones } from "../pages/Evaluaciones";
import { Resoluciones } from "../pages/Resoluciones";
import { Administracion } from "../pages/Administracion";
import { Cliente } from "../pages/Cliente";
import { Persona } from "../pages/Persona";
import MainLayout from "../components/layouts/MainLayout";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Rutas dentro del diseño principal */}
        <Route index element={<Index />} />
        <Route path="Persona" element={<Persona />} />
        <Route path="Cliente" element={<Cliente />} />
        <Route path="Solicitudes" element={<Solicitudes />} />
        <Route path="Evaluaciones" element={<Evaluaciones />} />
        <Route path="Resoluciones" element={<Resoluciones />} />
        <Route path="Administracion" element={<Administracion />} />
      </Route>
    </Routes>
  );
}
