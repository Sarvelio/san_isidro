import { Routes, Route } from "react-router-dom";
import Caja from "./Caja";
import CajaList from "./CajaList";
import Detalles from "./detalles";
import NotFound from "../404";

export default function CajaRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CajaList />} />
      <Route path="/create" element={<Caja />} />
      <Route path="/:idCaja/detalles/*" element={<Detalles />} />
      <Route path="/:id" element={<Caja />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
