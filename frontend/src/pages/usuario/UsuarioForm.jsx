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

  const { asyncOptions } = useAsyncOptions("sector");

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-wrap">

        {[
          { type: "title", title: "Datos Personales" },
          { name: "nombres", title: "Nombre", },
          { name: "apellidos", title: "Apellido", },
          // { name: "birthday", title: "Fecha de Nacimiento", type: "date" },

          {
            name: "genero",
            title: "Género",
            options: [
              { value: 1, label: "Hombre" },
              { value: 2, label: "Mujer" },
            ],
          },
          {
            name: "dpi",
            title: "DPI"
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
                      loadOptions={asyncOptions}
                      isSearchable={true}
                      valueKey="id"
                      labelKey="nombre"
                      name="sector"
                      rules={{ validate: required }}
                      placeholder="Seleccione sector"
                    />
                  </div>
                </div>
                <div>
            <label htmlFor="test" className="label">
              Foto
            </label>
            <InputPhoto control={control} name="photo" />
          </div>
              </div>
              
            ),
          },
          {
            name: "telefono",
            title: "Teléfono"
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
