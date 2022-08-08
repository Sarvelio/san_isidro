import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import useAsyncOptions from "../../hooks/useAsyncOptions";
import {
  InputDate,
  InputText,
  InputSelect,
  InputUpload,
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
import ParentModal from "./ParentModal";
import AddCircle from "@mui/icons-material/AddCircle";

export default function BeneficiaryForm({
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
  const [open, setOpen] = useState(false);

  const { asyncOptions } = useAsyncOptions("parent");
  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const typeWatch = watch("type");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleUnderline title="Datos del Solicitante " />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
          <div>
            <label htmlFor="test" className="label">
              Foto
            </label>
            <InputPhoto control={control} name="photo" />
          </div>
          <div>
            <label htmlFor="test" className="label">
              Tipo Beneficiario
            </label>
            <div className="control">
              <InputSelect
                control={control}
                name="type"
                rules={{ validate: required }}
                placeholder="Seleccione tipo"
                options={[
                  { value: 1, label: "Niños" },
                  { value: 2, label: "Joven" },
                  { value: 3, label: "Adulto" },
                  { value: 4, label: "Entidad" },
                ]}
              />
            </div>
          </div>
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
          {typeWatch === 4 && (
            <>
              <div>
                <label htmlFor="test" className="label">
                  Nombre encargado
                </label>
                <div className="control">
                  <InputText
                    control={control}
                    name="person_in_charge"
                    rules={{ validate: required }}
                    placeholder={"Ingrese teléfono"}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="test" className="label">
                  Teléfono (No. Celular)
                </label>
                <InputText
                  control={control}
                  name="cellphone"
                  rules={{ validate: required }}
                  placeholder={"Ingrese teléfono"}
                />
              </div>
            </>
          )}
          {typeWatch !== 4 && (
            <>
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
                  Fecha de Nacimiento
                </label>
                <div className="control">
                  <InputDate
                    control={control}
                    name="birthday"
                    placeholder="Ingrese fecha nacimiento"
                    rules={{ validate: composeValidators(required, date) }}
                  />
                </div>
              </div>
            </>
          )}
          {typeWatch === 3 && (
            <>
              <div>
                <label htmlFor="test" className="label">
                  DPI
                </label>
                <InputText
                  control={control}
                  name="dpi"
                  rules={{ validate: required }}
                  placeholder={"Ingrese numero de identificación"}
                />
              </div>
              <div>
                <label htmlFor="test" className="label">
                  Celular
                </label>
                <InputText
                  control={control}
                  name="cellphone"
                  rules={{ validate: required }}
                  placeholder={"Ingrese Celular"}
                />
              </div>
            </>
          )}
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
          {typeWatch !== 4 && (
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
          )}

          {[1, 2].includes(typeWatch) && (
            <>
              {/* {open && (
                <ParentModal open={open} onClose={() => setOpen(false)} />
              )} */}
              <div>
                <label htmlFor="test" className="label">
                  Padres de familia o Encargados
                </label>
                <div className="flex">
                  <InputAsyncSelect
                    className="w-full"
                    control={control}
                    loadOptions={asyncOptions}
                    isSearchable={true}
                    valueKey="id"
                    labelKey="name"
                    name="parent"
                    isMulti
                    rules={{ validate: required }}
                    placeholder="Seleccione familiares o encargados"
                  />
                  <div className="flex" width="30px">
                    <button type="button" onClick={() => setOpen(true)}>
                      <img src={AddCircle} width="20px" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="test" className="label">
                  Grado Anterior
                </label>
                <InputText
                  control={control}
                  name="last_grade"
                  rules={{ validate: required }}
                  placeholder={"Ingrese grado"}
                />
              </div>
              <div>
                <label htmlFor="test" className="label">
                  Promedio Actual
                </label>
                <InputText
                  control={control}
                  name="current_average"
                  rules={{ validate: required }}
                  placeholder={"Ingrese promedio"}
                />
              </div>
              <div>
                <label htmlFor="test" className="label">
                  Grado Actual
                </label>
                <InputText
                  control={control}
                  name="current_grade"
                  rules={{ validate: required }}
                  placeholder={"Ingrese grado"}
                />
              </div>
            </>
          )}

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
        </div>
        <br />
        <TitleUnderline title="Documentos" />
        <br />
        <InputUpload control={control} name="files" placeholder="Click aquí para subir documento" />
        <br />
        <br />
        <br />
        <div className="grid grid-cols-2">
          <div>
            <Button
              component={RouterLink}
              variant="contained"
              color="secondary"
              to="/beneficiary"
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
      {open && <ParentModal onClose={() => setOpen(false)} />}
    </>
  );
}
