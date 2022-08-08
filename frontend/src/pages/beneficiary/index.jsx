import { Routes, Route } from "react-router-dom";
import Beneficiary from "./Beneficiary";
import BeneficiaryList from "./BeneficiaryList";
import NotFound from "../404";
import ExampleModal from "./ModalExample";

export default function BeneficiaryRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BeneficiaryList />} />
      <Route path="/create" element={<Beneficiary />} />
      <Route path="/:id" element={<Beneficiary />} />
      <Route path="/modal" element={<ExampleModal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
