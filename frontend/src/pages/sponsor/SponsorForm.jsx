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

export default function SponsorForm({
  onSubmit,
  initialValues = {},
  isUpdating,
}) {
  const {
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
      <TitleUnderline title="Datos generales" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Tipo de patrocinador
          </label>
          <div className="control">
            <InputSelect
              control={control}
              name="type"
              rules={{ validate: required }}
              placeholder="Seleccione un tipo"
              options={[
                { value: 1, label: "Persona" },
                { value: 2, label: "Iglesia" },
                { value: 3, label: "Pareja" },
                { value: 4, label: "Organización" },
                { value: 5, label: "Otro" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre
          </label>
          <InputText
            control={control}
            name="name"
            rules={{ validate: required }}
            placeholder={"Ingrese nombre"}
          />
        </div>
        <div>
          <label htmlFor="test" className="label">
            Apellido
          </label>
          <div className="control">
            <InputText
              control={control}
              name="last_name"
              rules={{ validate: required }}
              placeholder={"Ingrese apellido"}
            />
          </div>
        </div>
        <div>
          <label htmlFor="test" className="label">
            Dirección
          </label>
          <InputText
            control={control}
            name="address"
            rules={{ validate: required }}
            placeholder={"Ingrese dirección"}
          />
        </div>
        <div>
          <label htmlFor="test" className="label">
            Genero
          </label>
          <div className="control">
            <InputSelect
              control={control}
              name="gender"
              rules={{ validate: required }}
              placeholder="Seleccione genero"
              options={[
                { value: 1, label: "Hombre" },
                { value: 2, label: "Mujer" },
              ]}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <InputText
            control={control}
            name="email"
            rules={{ validate: composeValidators(required, email) }}
            placeholder={"Ingrese correo electrónico"}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="test" className="label">
            Teléfono
          </label>
          <InputText
            control={control}
            name="cellphone"
            rules={{ validate: required }}
            placeholder={"Ingrese teléfono"}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="grid grid-cols-2">
        <div>
          <Button
            component={RouterLink}
            variant="contained"
            color="secondary"
            to="/sponsor"
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
