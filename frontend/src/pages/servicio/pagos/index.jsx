import { Routes, Route } from "react-router-dom";
import Pagos from "./Pagos";
import PagosList from "./PagosList";
import NotFound from "../../404";

export default function PagosRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PagosList />} />
      <Route path="/create" element={<Pagos />} />
      <Route path="/:id" element={<Pagos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
