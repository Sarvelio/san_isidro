import DetalleForm from "./ProyectoForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Detalles() {
  const urlList = "/proyecto";
  const { saveData } = useCreate("proyecto", urlList);
  const { data, updateData, update } = useUpdate("proyecto", urlList);
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
        <h1 className="text-title mb-4">Proyecto</h1>
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
