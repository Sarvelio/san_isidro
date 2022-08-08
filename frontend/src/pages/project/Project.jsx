import { useMemo } from "react";
import ProjectForm from "./ProjectForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import _ from "lodash";

export default function Project() {
  const { saveData } = useCreate("project", "/project");
  const { data, updateData, update } = useUpdate("project", "/project");
  const onSubmit = async (data) => {
    const body = { ...data };
    if (!update) saveData(body);
    else updateData(body);
  };

  const initialValues = useMemo(() => {
    return { ...data };
  }, [data]);

  return (
    <>
      <div>
        <h1 className="text-title mb-4">Proyecto</h1>
      </div>
      <LoadMask>
        <ProjectForm
          onSubmit={onSubmit}
          initialValues={{ ...initialValues }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
