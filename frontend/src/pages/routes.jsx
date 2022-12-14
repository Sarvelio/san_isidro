import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import PrivateRoute from "./PrivateRoute";
import Login from "./login";
import NotFound from "./404";

// Pages
import UserRoutes from "./user";

// Styles
import "react-toastify/dist/ReactToastify.min.css";
import SectorRoutes from "./sector";
import UsuarioRoutes from "./usuario";
import ProyectoRoutes from "./proyecto";
import Configuracion from "./configuracion/Configuracion";
import ServicioRoutes from "./servicio";
import CajaRoutes from "./caja";
import useAccount from "../hooks/useAccount";
import { useEffect } from "react";

export default function App() {
  const { user } = useAccount();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {user.rol == 1 && (
          <>
            <Route
              path="/user/*"
              element={
                <PrivateRoute>
                  <UserRoutes />
                </PrivateRoute>
              }
            />
            <Route
              path="/configuracion/:id"
              element={
                <PrivateRoute>
                  <Configuracion />
                </PrivateRoute>
              }
            />
          </>
        )}

        <Route
          path="/sector/*"
          element={
            <PrivateRoute>
              <SectorRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/*"
          element={
            <PrivateRoute>
              <UsuarioRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/proyecto/*"
          element={
            <PrivateRoute>
              <ProyectoRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/servicio/*"
          element={
            <PrivateRoute>
              <ServicioRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/caja/*"
          element={
            <PrivateRoute>
              <CajaRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}
