import { Routes, Route } from "react-router-dom";
import Configuracion from "./Configuracion";
import NotFound from "../404";
import ConfiguracionForm from "./ConfiguracionForm";

export default function ConfiguracionRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Configuracion />} />
      <Route path="/:id" element={<Configuracion />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}