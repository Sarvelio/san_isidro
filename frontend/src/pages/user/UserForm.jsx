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

export default function UserForm({ onSubmit, initialValues = {}, isUpdating }) {
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
          { name: "first_name", label: "Nombre", validations: ["required"] },
          { name: "last_name", label: "Apellido", validations: ["required"] },
          {
            name: "gender",
            label: "Género",
            validations: ["required"],
            options: [
              { value: 1, label: "Hombre" },
              { value: 2, label: "Mujer" },
            ],
          },
        ].map(({ name, label, validations }) => {
          return (
            <InputMasterField
              name={name}
              title={label}
              key={name}
              control={control}
              validations={validations}
            />
          );
        })}

        {[
          { name: "first_name", label: "Nombre", validations: ["required"] },
          { name: "last_name", label: "Apellido", validations: ["required"] },
        ].map(({ name, label, validations }) => {
          return (
            <InputTextField
              name={name}
              title={label}
              key={name}
              control={control}
              validations={validations}
            />
          );
        })}

        <InputSelectField
          name="gender"
          title="Género"
          control={control}
          validations={["required"]}
          options={[
            { value: 1, label: "Hombre" },
            { value: 2, label: "Mujer" },
          ]}
        />

        <InputTextField
          name="email"
          title="Correo"
          type="text"
          control={control}
          validations={["required", "email"]}
        />
      </div>
      <br />

      <br />
      <br />
      {/* <div className="flex items-center justify-center">
        <div className="flex gap-x-4">
          <ButtonUi button="primary">Red</ButtonUi>
          <ButtonUi button="secondary">Green</ButtonUi>
          <ButtonUi button="danger">Cyan</ButtonUi> */}

      <div className=" grid gap-2 sm:block text-center">
        <div className="mx-2 mt-16 md:px-4 md:inline-block contents">
          <button
            class="relative inline-block px-4 py-2 font-medium group"
            onClick={() => {
              console.log("enviando datos");
            }}
          >
            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span class="absolute inset-0 w-full h-full bg-white border-2 border-cyan-600 group-hover:bg-cyan-600"></span>
            <span
              class="relative text-cyan-600 group-hover:text-white"
              style={{ minWidth: 150 }}
            >
              Salir
            </span>
          </button>
        </div>
        <div className="mx-2 mt-16 md:px-4 md:inline-block contents">
          <Button variant="contained" type="submit">
            {isUpdating ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </div>

      <FormFooter />
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
