import { Routes, Route } from "react-router-dom";
import Pago from "./Pago";
import PagoList from "./PagoList";
import NotFound from "../../404";

export default function PagoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PagoList />} />
      <Route path="/create" element={<Pago />} />
      <Route path="/:id" element={<Pago />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
