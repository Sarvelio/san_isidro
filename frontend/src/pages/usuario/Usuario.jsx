import UsuarioForm from "./UsuarioForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Usuario() {
  const urlList = "/usuario";
  const { saveData } = useCreate("usuario", urlList);
  const { data, updateData, update } = useUpdate("usuario", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
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
        <h1 className="text-title mb-4">Usuario</h1>
      </div>
      <LoadMask loading={loading}>
        <UsuarioForm
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