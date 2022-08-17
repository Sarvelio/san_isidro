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

export default function ServicioForm({
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

  const { asyncOptions: asyncOptionsSector } = useAsyncOptions("sector");

  const { asyncOptions: asyncOptionsUsuario } = useAsyncOptions("usuario");

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-wrap">
        {[
          {
            component: (
              <div className="w-full sm:w-1/2 px-2 sm:px-6">
                <div>
                  <label htmlFor="test" className="label">
                    Usuario
                  </label>
                  <div className="control">
                    <InputAsyncSelect
                      control={control}
                      loadOptions={asyncOptionsUsuario}
                      isSearchable={true}
                      valueKey="id"
                      labelKey="nombres"
                      name="usuario"
                      rules={{ validate: required }}
                      placeholder="Seleccione usuario"
                    />
                  </div>
                </div>
              </div>
            ),
          },
          {
            component: (
              <div className="w-full sm:w-1/2 px-2 sm:px-6">
                <div>
                  <label htmlFor="test" className="label">
                    Sector
                  </label>
                  <div className="control">
                    <InputAsyncSelect
                      control={control}
                      loadOptions={asyncOptionsSector}
                      isSearchable={true}
                      valueKey="id"
                      labelKey="nombre"
                      name="sector"
                      rules={{ validate: required }}
                      placeholder="Seleccione sector"
                    />
                  </div>
                </div>
              </div>
            ),
          },
          {
            name: "descripcion",
            title: "Descripción",
          },
          {
            type: "title",
            title: "Ingrese la fecha que el usuario esta al dia con sus pagos",
          },
          {
            name: "anio",
            title: "Año",
            options: [
              { value: 2020, label: "2020" },
              { value: 2021, label: "2021" },
              { value: 2022, label: "2022" },
              { value: 2023, label: "2023" },
              { value: 2024, label: "2024" },
              { value: 2025, label: "2025" },
              { value: 2026, label: "2026" },
              { value: 2027, label: "2027" },
            ],
          },
          {
            name: "mes",
            title: "Mes",
            options: [
              { value: 1, label: "Enero" },
              { value: 2, label: "Febrero" },
              { value: 3, label: "Marzo" },
              { value: 4, label: "Abril" },
              { value: 5, label: "Mayo" },
              { value: 6, label: "Junio" },
              { value: 7, label: "Julio" },
              { value: 8, label: "Agosto" },
              { value: 9, label: "Septiembre" },
              { value: 10, label: "Octubre" },
              { value: 11, label: "Noviembre" },
              { value: 12, label: "Diciembre" },
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
      </div>
      <FormFooter {...{ loading, isUpdating, urlList }} />
      <br />
    </form>
  );
}
