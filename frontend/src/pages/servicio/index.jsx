import { Routes, Route } from "react-router-dom";
import Servicio from "./Servicio";
import NotFound from "../404";
import ServicioForm from "./ServicioForm";

export default function ServicioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Servicio />} />
      <Route path="/:id" element={<Servicio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}