import { Routes, Route } from "react-router-dom";
import Servicio from "./Servicio";
import NotFound from "../404";
import ServicioForm from "./ServicioForm";
import ServicioList from "./ServicioList";
import Pagos from "./pagos";

export default function ServicioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ServicioList />} />
      <Route path="/create" element={<Servicio />} />
      <Route path="/:idServicio/pagos/*" element={<Pagos />} />
      <Route path="/:id" element={<Servicio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
