import React from "react";

export function Index() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Bienvenido a la Página de Inicio</h1>
      {/* <!-- Estadisticas --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-0 pt-6">
        {/* <!-- Solicitudes --> */}
        <div className="flex flex-col  px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-6xl font-bold tracking-tight leading-none text-blue-500">
              21
            </div>
            <div className="text-lg font-medium text-blue-500">Solicitudes</div>
          </div>
        </div>
        {/* <!-- Pendientes --> */}
        <div className="flex flex-col  px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-6xl font-bold tracking-tight leading-none text-blue-500">
              21
            </div>
            <div className="text-lg font-medium text-blue-500">Pendientes</div>
          </div>
        </div>
        {/* <!-- Aprobadas --> */}
        <div className="flex flex-col  px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-6xl font-bold tracking-tight leading-none text-blue-500">
              21
            </div>
            <div className="text-lg font-medium text-blue-500">Aprobadas</div>
          </div>
        </div>
        {/* <!-- En observación --> */}
        <div className="flex flex-col  px-6 py-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-6xl font-bold tracking-tight leading-none text-blue-500">
              21
            </div>
            <div className="text-lg font-medium text-blue-500">En observación</div>
          </div>
        </div>
      </div>
    </div>
  );
}
