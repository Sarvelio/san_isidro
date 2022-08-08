import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import { InputCheckBox, InputText } from "../../components/CustomInputs";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import { PERMISSIONS } from "./permissions";
import { required } from "../../validations";

export default function RolForm({ onSubmit, initialValues = {}, isUpdating }) {
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TitleUnderline title="Datos Generales" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        <div>
          <label htmlFor="test" className="label">
            Nombre
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
      <TitleUnderline title="Permisos" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
        {PERMISSIONS.map((rol) => {
          return (
            <FormGroup key={rol.view}>
              <>
                <label htmlFor={`rol-${rol.view}`} className="label">
                  {rol.view}
                </label>
                {rol.permissions.map((perm) => {
                  return (
                    <InputCheckBox
                      key={perm.code}
                      name={`permissions.${perm.code}`}
                      label={perm.name}
                      control={control}
                    />
                  );
                })}
              </>
            </FormGroup>
          );
        })}
      </div>

      <br />
      <br />
      <div className="grid grid-cols-2">
        <div>
          <Button
            component={RouterLink}
            variant="contained"
            color="secondary"
            to="/rol"
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
