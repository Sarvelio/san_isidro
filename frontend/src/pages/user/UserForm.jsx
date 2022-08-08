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
import FormFooter from "../../components/Form/FormFooter";

export default function UserForm({ onSubmit, initialValues = {}, isUpdating }) {
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
      <h2 className="">Datos Personales</h2>
      {/* <TitleUnderline title="Datos Personales " /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre
          </label>
          <InputText
            control={control}
            name="first_name"
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
        {/* <div>
          <label htmlFor="test" className="label">
            Fecha de Nacimiento
          </label>
          <div className="control">
            <InputDate
              control={control}
              name="birthday"
              rules={{ validate: composeValidators(required, date) }}
            />
          </div>
        </div> */}
        {/* <div>
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
        </div> */}
      </div>
      <br />
      {/* <TitleUnderline title="Datos de Sistema" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre de usuario
          </label>
          <div className="control">
            <InputText
              control={control}
              name="username"
              rules={{ validate: composeValidators(required, alphanumeric) }}
              type="text"
              placeholder="Ingrese nombre de usuario"
            />
          </div>
        </div>
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
        <div>
          <label htmlFor="email" className="label">
            Correo
          </label>
          <InputText
            control={control}
            name="email"
            rules={{ validate: composeValidators(required, email) }}
            placeholder={"Ingrese Correo"}
            type="email"
          />
        </div>
        <div>
          <label htmlFor="test" className="label">
            Estado del usuario
          </label>
          <div className="control">
            <InputSelect
              control={control}
              name="status"
              rules={{ validate: required }}
              placeholder="Seleccione estado"
              options={[
                { value: 1, label: "Activo" },
                { value: 3, label: "Inactivo" },
              ]}
            />
          </div>
        </div>
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
      </div> */}

      <br />
      <br />
      <FormFooter />
      {/* <div className="flex items-center justify-center">
        <div className="flex gap-x-4">
          <ButtonUi color="red-600">Red</ButtonUi>
          <ButtonUi color="orange-600">Green</ButtonUi>
          <ButtonUi color="cyan-600">Cyan</ButtonUi>
         
        </div>
      </div> */}

     
      <div className=" grid gap-2 sm:block text-center">
        <div className="mx-2 mt-16 md:px-4 md:inline-block contents">
          <ButtonUi
            component={RouterLink}
            variant="contained"
            type="button"
            to="/user"
          color="orange-600"
          >
            Cancelar
          </ButtonUi>
        </div>
        
        <div className="mx-2 mt-16 md:px-4 md:inline-block contents">
          <ButtonUi variant="contained" type="submit" color="cyan-600">
            {isUpdating ? "Actualizar" : "Guardar"}
          </ButtonUi>
        </div>
      </div>
     
      <br />
    </form>
  );
}
