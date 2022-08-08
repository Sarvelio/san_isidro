import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import { InputEditor, InputText } from "../../components/CustomInputs";
import Button from "@mui/material/Button";

import { required } from "../../validations";

export default function ProjectTypesForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const { handleSubmit, control, reset, watch } = useForm();

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos Generales" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre del tipo
          </label>
          <InputText
            className="input"
            control={control}
            name="name"
            rules={{ validate: required }}
            placeholder={"Ingrese nombre"}
          />
        </div>
      </div>
      <br />
      <label htmlFor="description" className="label">
        Descripción
      </label>
      <InputEditor
        name="description"
        control={control}
        rules={{ validate: required }}
      />

      <br />
      <br />
      <div className="grid grid-cols-2">
        <div>
          <Button
            component={RouterLink}
            variant="contained"
            color="secondary"
            to="/types/"
          >
            Regresar
          </Button>
        </div>
        <div className="flex justify-end">
          <Button variant="contained" type="submit">
            {isUpdating ? "Actualizar" : "Registrar"}
          </Button>
        </div>
      </div>
      <br />
    </form>
  );
}
