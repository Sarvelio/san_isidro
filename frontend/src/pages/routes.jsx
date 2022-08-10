import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import PrivateRoute from "./PrivateRoute";
import Login from "./login";
import NotFound from "./404";

// Pages
import UserRoutes from "./user";
import RolesRoutes from "./rol";

// Styles
import "react-toastify/dist/ReactToastify.min.css";
import SectorRoutes from "./sector";
import UsuarioRoutes from "./usuario";
import ConfiguracionRoutes from "./configuracion";
import ProyectoRoutes from "./proyecto";

export default function App() {
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
        <Route
          path="/user/*"
          element={
            <PrivateRoute>
              <UserRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/rol/*"
          element={
            <PrivateRoute>
              <RolesRoutes />
            </PrivateRoute>
          }
        />
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
          path="/configuracion/*"
          element={
            <PrivateRoute>
              <ConfiguracionRoutes />
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
