// import SectorForm from "./SectorForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import ConfiguracionForm from "./ConfiguracionForm";

export default function Configuracion() {
  const urlList = "/configuracion";
  const { saveData } = useCreate("configuracion", urlList);
  const { data, updateData, update } = useUpdate("configuracion", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Configuracion</h1>
      </div>
      <LoadMask loading={loading}>
        <ConfiguracionForm
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
