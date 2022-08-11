import SectorForm from "./SectorForm";
import LoadMask from "../../../components/LoadMask";
import useCreate from "../../../hooks/useCreate";
import useUpdate from "../../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useParams } from "react-router-dom";

export default function Sector() {
  const { idProyecto } = useParams();
  const urlList = `/proyecto/${idProyecto}/detalles`;
  const { saveData } = useCreate("detalles", urlList);
  const { data, updateData, update } = useUpdate("detalles", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    if (update) {
      body.proyecto = idProyecto;
    }

    // borrar-datos
    body.descripcion = "borrar xd";
    body.monto = "123";
    body.tipo = 10;
    // borrar-datos

    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Sector</h1>
      </div>
      <LoadMask loading={loading}>
        <SectorForm
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
