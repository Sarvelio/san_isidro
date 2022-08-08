import SponsorForm from "./SponsorForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Sponsor() {
  const { saveData } = useCreate("sponsor", "/sponsor");
  const { data, updateData, update } = useUpdate("sponsor", "/sponsor");
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    body.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Patrocinador</h1>
      </div>
      <LoadMask loading={loading}>
        <SponsorForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
