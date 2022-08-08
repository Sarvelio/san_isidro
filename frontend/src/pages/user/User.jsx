import UserForm from "./UserForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function User() {
  const { saveData } = useCreate("user", "/user");
  const { data, updateData, update } = useUpdate("user", "/user");
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    body.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
    delete body.rol;
    delete body.password;
    if (_.get(data, "rol.id", undefined) !== undefined) {
      body.rol = data.rol.id;
    }
    if (_.isString(data.password) && data.password != "") {
      body.password = data.password;
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
        <UserForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
