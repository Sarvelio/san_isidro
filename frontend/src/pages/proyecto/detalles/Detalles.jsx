import DetallesForm from "./DetallesForm";
import LoadMask from "../../../components/LoadMask";
import useCreate from "../../../hooks/useCreate";
import useUpdate from "../../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import { formatNumberMoney } from "../../../utils";
import { useEffect } from "react";

export default function Sector() {
  const { idProyecto } = useParams();
  const urlList = `/proyecto/${idProyecto}/detalles`;
  const { saveData } = useCreate("detalles", urlList);
  const { data, updateData, update } = useUpdate("detalles", urlList);
  const loading = useSelector((state) => state.loading.loading);
  const { data: dataDetalles, getData: getDataDetalles } = useGet();
  useEffect(() => {
    getDataDetalles(`proyecto/${idProyecto}`);
  }, []);

  const onSubmit = async (data) => {
    const body = { ...data };
    body.proyecto = idProyecto;

    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div className="mb-2 sm:mb-0">
        <h1 className="text-title">Detalles</h1>
        <h1 className="text-title text-xl">{`Proyecto: ${dataDetalles?.nombre}`}</h1>
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
