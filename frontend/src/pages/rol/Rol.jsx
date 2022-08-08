import { useMemo } from "react";
import RolForm from "./RolForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import _ from "lodash";

export default function Rol() {
  const { saveData } = useCreate("rol", "/rol");
  const { data, updateData, update } = useUpdate("rol", "/rol");
  const onSubmit = async (data) => {
    const body = { ...data };
    const permissions = [];
    for (let [key, value] of Object.entries(body.permissions)) {
      if (value === true) {
        permissions.push(key);
      }
    }
    body.permissions = permissions;
    if (!update) saveData(body);
    else updateData(body);
  };

  const initialValues = useMemo(() => {
    const _permissions = {};
    for (const p of _.get(data, "permissions", [])) {
      _permissions[p] = true;
    }
    return { ...data, permissions: _permissions };
  }, [data]);

  return (
    <>
      <div>
        <h1 className="text-title mb-4">Rol</h1>
      </div>
      <LoadMask>
        <RolForm
          onSubmit={onSubmit}
          initialValues={{ ...initialValues }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
