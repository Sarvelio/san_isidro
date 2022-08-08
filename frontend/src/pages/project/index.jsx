import { Routes, Route } from "react-router-dom";
import Project from "./Project";
import ProjectList from "./ProjectList";
import NotFound from "../404";

export default function ProjectRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path="/create" element={<Project />} />
      <Route path="/:id" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
