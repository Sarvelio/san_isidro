import { Routes, Route } from "react-router-dom";
import Rol from "./Rol";
import RolList from "./RolList";
import NotFound from "../404";

export default function RolRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RolList />} />
      <Route path="/create" element={<Rol />} />
      <Route path="/:id" element={<Rol />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
