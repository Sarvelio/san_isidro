import { Routes, Route } from "react-router-dom";
import Detalles from "./Detalles";
import DetallesList from "./DetallesList";
import NotFound from "../../404";

export default function DetallesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DetallesList />} />
      <Route path="/create" element={<Detalles />} />
      <Route path="/:id" element={<Detalles />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
