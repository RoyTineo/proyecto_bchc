import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes/routes";
import "./App.css";

import { PersonaContextProvider } from "./context/PersonaProvider";
import { SolicitudContextProvider } from "./context/SolicitudProvider";

function App() {
  return (
    <SolicitudContextProvider>
          <PersonaContextProvider>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </PersonaContextProvider>
    </SolicitudContextProvider>
  );
}

export default App;
