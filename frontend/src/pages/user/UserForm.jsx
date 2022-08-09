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
      <div className="w-full flex flex-wrap">
        {[
          { type: "title", title: "Datos Personales" },
          { name: "first_name", title: "Nombre" },
          { name: "last_name", title: "Apellido" },
          { name: "birthday", title: "Fecha de Nacimiento", type: "date" },
          {
            name: "gender",
            title: "Género",
            options: [
              { value: 1, label: "Hombre" },
              { value: 2, label: "Mujer" },
            ],
          },
          {
            component: (
              <div className="w-full sm:w-1/2 px-2 sm:px-6">
                <div>
                  <label htmlFor="test" className="label">
                    Rol de usuario
                  </label>
                  <div className="control">
                    <InputAsyncSelect
                      control={control}
                      loadOptions={asyncOptions}
                      isSearchable={true}
                      valueKey="id"
                      labelKey="name"
                      name="rol"
                      rules={{ validate: required }}
                      placeholder="Seleccione rol"
                    />
                  </div>
                </div>
              </div>
            ),
          },
          {
            name: "username",
            title: "Nombre de usuario",
            validations: ["required", "alphanumeric"],
          },
          {
            name: "email",
            title: "Correo",
            type: "email",
          },
          {
            name: "status",
            title: "Estado del usuario",
            options: [
              { value: 1, label: "Activo" },
              { value: 3, label: "Inactivo" },
            ],
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
        <div className="w-full sm:w-1/2 px-2 sm:px-6 py-1 ">
          {isUpdating ? (
            <div>
              <label htmlFor="test" className="label">
                Contraseña
              </label>
              <InputText
                control={control}
                name="password"
                rules={{ validate: password }}
                placeholder="Ingrese contraseña"
                type="password"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="test" className="label">
                Contraseña
              </label>
              <InputText
                control={control}
                name="password"
                rules={{ validate: composeValidators(required, password) }}
                placeholder="Ingrese contraseña"
                type="password"
              />
            </div>
          )}
        </div>
      </div>
      <FormFooter {...{ loading, isUpdating, urlList }} />
      <br />
    </form>
  );
}
