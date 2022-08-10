import { Routes, Route } from "react-router-dom";
import Sector from "./Sector";
import SectorList from "./SectorList";
import NotFound from "../../404";

export default function SectorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SectorList />} />
      <Route path="/create" element={<Sector />} />
      <Route path="/:id" element={<Sector />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
