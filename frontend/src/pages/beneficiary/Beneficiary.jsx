import BeneficiaryForm from "./BeneficiaryForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Beneficiary() {
  const { saveData } = useCreate("beneficiary");
  const { data, updateData, update } = useUpdate("beneficiary", "/beneficiary");
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    const parent = [];
    for (let [key, value] of Object.entries(body.parent)) {
      parent.push(value.id);
    }
    body.parent = parent;
    body.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
    const attachments = [];
    if (body.photo instanceof File) {
      attachments.push({ name: "photo", file: body.photo });
    }
    delete body.photo;
    if (!update) saveData(body, attachments);
    else updateData(body, attachments);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Beneficiario</h1>
      </div>
      <LoadMask loading={loading}>
        <BeneficiaryForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
