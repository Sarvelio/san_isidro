import { Routes, Route } from "react-router-dom";
import Usuario from "./Usuario";
import UsuarioList from "./UsuarioList";
import NotFound from "../404";

export default function UsuarioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsuarioList />} />
      <Route path="/create" element={<Usuario />} />
      <Route path="/:id" element={<Usuario />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}