import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import useAsyncOptions from "../../hooks/useAsyncOptions";
import {
  InputDate,
  InputText,
  InputSelect,
  InputPhoto,
  InputAsyncSelect,
  InputEditor,
} from "../../components/CustomInputs";
import Button from "@mui/material/Button";
import {
  email,
  composeValidators,
  alphanumeric,
  required,
  date,
  password,
} from "../../validations";
import ButtonUi from "../../components/UI";
import {
  InputMasterField,
  InputTextField,
  InputSelectField,
  // InputEditor
} from "../../components/Input";
import FormFooter from "../../components/Form/FormFooter";

export default function UsuarioForm({
  onSubmit,
  initialValues = {},
  isUpdating,
  urlList,
  loading,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-wrap">
        {[
          { type: "title", title: "Datos del proyecto" },
          {
            name: "nombre",
            title: "Nombre",
            validations: ["required", "maxLength-250"],
          },
          {
            name: "descripcion",
            title: "Descripcion",
            validations: ["required", "maxLength-250"],
          },
          {
            name: "fecha_inicio",
            title: "Fecha inicio",
            type: "date",
          },
          {
            name: "fecha_fin",
            title: "Fecha fin",
            type: "date",
          },
        ].map((props, index) => {
          return (
            <InputMasterField
              key={props.name || index}
              control={control}
              {...props}
            />
          );
        })}
      </div>

      <FormFooter {...{ loading, isUpdating, urlList }} />
      <br />
    </form>
  );
}
