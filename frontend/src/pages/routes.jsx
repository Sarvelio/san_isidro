import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import PrivateRoute from "./PrivateRoute";
import Login from "./login";
import NotFound from "./404";

// Pages
import UserRoutes from "./user";
import RolesRoutes from "./rol";
import ProjectTypesRoutes from "./project_types";
import ProjectRoutes from "./project";
import BeneficiaryRoutes from "./beneficiary";
import SponsorRoutes from "./sponsor";

// Styles
import "react-toastify/dist/ReactToastify.min.css";
import SectorRoutes from "./sector";
import UsuarioRoutes from "./usuario";

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
          path="/beneficiary/*"
          element={
            <PrivateRoute>
              <BeneficiaryRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/sponsor/*"
          element={
            <PrivateRoute>
              <SponsorRoutes />
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
          path="/types/*"
          element={
            <PrivateRoute>
              <ProjectTypesRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/*"
          element={
            <PrivateRoute>
              <ProjectRoutes />
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
