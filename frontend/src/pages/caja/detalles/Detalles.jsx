import DetallesForm from "./DetallesForm";
import LoadMask from "../../../components/LoadMask";
import useCreate from "../../../hooks/useCreate";
import useUpdate from "../../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useParams } from "react-router-dom";

export default function Sector() {
  const { idCaja } = useParams();
  const urlList = `/caja/${idCaja}/detalles`;
  const { saveData } = useCreate("detalles", urlList);
  const { data, updateData, update } = useUpdate("detalles", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    body.caja = idCaja;

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
        <DetallesForm
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
