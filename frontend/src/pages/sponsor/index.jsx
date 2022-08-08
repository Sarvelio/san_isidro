import { Routes, Route } from "react-router-dom";
import Sponsor from "./Sponsor";
import SponsorList from "./SponsorList";
import NotFound from "../404";

export default function SponsorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SponsorList />} />
      <Route path="/create" element={<Sponsor />} />
      <Route path="/:id" element={<Sponsor />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
