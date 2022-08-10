// import SectorForm from "./SectorForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import ConfiguracionForm from "./ConfiguracionForm";
import { useEffect, useState } from "react";

export default function Configuracion() {
  const urlList = "/configuracion/1";
  const { data, updateData, update } = useUpdate("configuracion", urlList);
  const loading = useSelector((state) => state.loading.loading);
  const [dataConfig, setdataConfig] = useState({});

  const onSubmit = async (data) => {
    const body = { ...data };
    updateData(body).then(() => {
      setdataConfig({ ...body });
    });
  };

  useEffect(() => {
    if (data) {
      setdataConfig({ ...data });
    }
  }, [data]);

  return (
    <>
      <div>
        <h1 className="text-title mb-4">Configuracion</h1>
      </div>
      <LoadMask loading={loading}>
        <ConfiguracionForm
          onSubmit={onSubmit}
          initialValues={dataConfig}
          isUpdating={update}
          urlList="/"
          loading={loading}
        />
      </LoadMask>
    </>
  );
}
