import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import ServicioForm from "./ServicioForm";

export default function Servicio() {
  const urlList = "/servicio";
  const { saveData } = useCreate("servicio", urlList);
  const { data, updateData, update } = useUpdate("servicio", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    delete body.usuario;
    if (_.get(data, "usuario.id", undefined) !== undefined) {
      body.usuario = data.usuario.id;
    }
    delete body.sector;
    if (_.get(data, "sector.id", undefined) !== undefined) {
      body.sector = data.sector.id;
    }
    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Servicio de Agua</h1>
      </div>
      <LoadMask loading={loading}>
        <ServicioForm
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
