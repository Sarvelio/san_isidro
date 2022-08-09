import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import useAsyncOptions from "../../hooks/useAsyncOptions";
import {
  InputDate,
  InputText,
  InputSelect,
  InputAsyncSelect,
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
} from "../../components/Input";
import FormFooter from "../../components/Form/FormFooter";

export default function UserForm({
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

  const { asyncOptions } = useAsyncOptions("rol");

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="">Datos Personales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        {[
          { name: "first_name", title: "Nombre" },
          { name: "last_name", title: "Apellido" },
          {
            name: "gender",
            title: "Género",
            options: [
              { value: 1, label: "Hombre" },
              { value: 2, label: "Mujer" },
            ],
          },
          {
            name: "email",
            title: "Correo",
            type: "email",
            validations: ["required", "email"],
          },
        ].map((props) => {
          return (
            <InputMasterField key={props.name} control={control} {...props} />
          );
        })}
      </div>

      <FormFooter {...{ loading, isUpdating, urlList }} />

      <div className=" grid gap-2 sm:block text-center">
        <div className="mx-2 mt-16 md:px-4 md:inline-block contents">
          <Button
            component={RouterLink}
            variant="contained"
            color="secondary"
            to="/user"
          >
            Cancelar
          </Button>
        </div>

        <div className="mx-2 mt-16 md:px-4 md:inline-block contents">
          <Button variant="contained" type="submit">
            {isUpdating ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </div>

      <br />
    </form>
  );
}
