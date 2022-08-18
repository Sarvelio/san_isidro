import DetalleForm from "./CajaForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Detalles() {
  const urlList = "/caja";
  const { saveData } = useCreate("caja", urlList);
  const { data, updateData, update } = useUpdate("caja", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    body.fecha_inicio = dayjs(data.fecha_inicio).format("YYYY-MM-DD");
    body.fecha_fin = dayjs(data.fecha_fin).format("YYYY-MM-DD");
    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Caja</h1>
      </div>
      <LoadMask loading={loading}>
        <DetalleForm
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
