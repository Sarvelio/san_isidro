import { useMemo } from "react";
import ProjectTypesForm from "./ProjectTypesForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import _ from "lodash";

export default function ProjectTypes() {
  const { saveData } = useCreate("project_types", "/types");
  const { data, updateData, update } = useUpdate(
    "project_types",
    "/types"
  );
  const onSubmit = async (data) => {
    const body = { ...data };
    if (!update) saveData(body);
    else updateData(body);
  };

  return (
    <>
      <div>
        <h1 className="text-title mb-4">Tipo de proyecto</h1>
      </div>
      <LoadMask>
        <ProjectTypesForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
