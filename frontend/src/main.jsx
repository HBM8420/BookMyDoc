import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import AdminContextProvider from "./admin/context/AdminContext.jsx";
import DoctorContextProvider from "./admin/context/DoctorContext.jsx";
import AdminAppContextProvider from "./admin/context/AdminAppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <DoctorContextProvider>
          <AdminAppContextProvider>
            <App />
          </AdminAppContextProvider>
        </DoctorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
