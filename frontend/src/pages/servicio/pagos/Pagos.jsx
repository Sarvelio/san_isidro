import PagosForm from "./PagosForm";
import LoadMask from "../../../components/LoadMask";
import useCreate from "../../../hooks/useCreate";
import useUpdate from "../../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useParams } from "react-router-dom";

export default function Sector() {
  const { idServicio } = useParams();
  const urlList = `/servicio/${idServicio}/detalles`;
  const { saveData } = useCreate("pagos", urlList);
  const { data, updateData, update } = useUpdate("pagos", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    body.servicio = idServicio;
    // borrar-datos
    // body.descripcion = "borrar xd";
    // body.monto = "123";
    // body.tipo = 10;
    // borrar-datos


    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Detalles</h1>
      </div>
      <LoadMask loading={loading}>
        <PagosForm
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
