import { Routes, Route } from "react-router-dom";
import ProjectTypes from "./ProjectTypes";
import ProjectTypesList from "./ProjectTypesList";
import NotFound from "../404";

export default function ProjectTypesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProjectTypesList />} />
      <Route path="/create" element={<ProjectTypes />} />
      <Route path="/:id" element={<ProjectTypes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
