import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { MyRoutes } from "./routes/routes";
import "./App.css";

import { PersonaContextProvider } from "./context/PersonaProvider";

function App() {
  return (
    <PersonaContextProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </PersonaContextProvider>
  );
}

export default App;
