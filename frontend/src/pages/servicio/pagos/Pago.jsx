import PagoForm from "./PagoForm";
import LoadMask from "../../../components/LoadMask";
import useCreate from "../../../hooks/useCreate";
import useUpdate from "../../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Pago() {
  const urlList = "/pago";
  const { saveData } = useCreate("pago", urlList);
  const { data, updateData, update } = useUpdate("pago", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Pago</h1>
      </div>
      <LoadMask loading={loading}>
        <PagoForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
          urlList={urlList}
          loading={loading}
        />
      </LoadMask>
    </>
  );
}
