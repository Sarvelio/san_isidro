import { Routes, Route } from "react-router-dom";
import Servicio from "./Servicio";
import ServicioList from "./ServicioList";
import Detalles from "./pagos";
import NotFound from "../404";

export default function ServicioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ServicioList />} />
      <Route path="/create" element={<Servicio />} />
      <Route path="/:idServicio/pagos/*" element={<Detalles />} />
      <Route path="/:id" element={<Servicio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
