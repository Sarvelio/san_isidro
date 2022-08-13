import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../../components/TitleUnderline";
import useAsyncOptions from "../../../hooks/useAsyncOptions";
import {
  InputDate,
  InputText,
  InputSelect,
  InputAsyncSelect,
} from "../../../components/CustomInputs";
import Button from "@mui/material/Button";
import {
  email,
  composeValidators,
  alphanumeric,
  required,
  date,
  password,
} from "../../../validations";
import ButtonUi from "../../../components/UI";
import {
  InputMasterField,
  InputTextField,
  InputSelectField,
} from "../../../components/Input";
import FormFooter from "../../../components/Form/FormFooter";

export default function PagosForm({
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

  const { asyncOptions } = useAsyncOptions("pagos");



  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

<div className="w-full flex flex-wrap">

                {[
                    { type: "title", title: "Detalles del pago" },
                    {
                      component: (
                        <div className="w-full sm:w-1/2 px-2 sm:px-6">
                          <div>
                            <label htmlFor="test" className="label">
                              Servicio
                            </label>
                            <div className="control">
                              <InputAsyncSelect
                                control={control}
                                loadOptions={asyncOptions}
                                isSearchable={true}
                                valueKey="id"
                                labelKey="anio"
                                name="servicio"
                                // rules={{ validate: required }}
                                placeholder="Seleccione servicio"
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
                          Mes
                        </label>
                        <div className="control">
                          <InputSelect
                            control={control}
                            name="mes"
                            // rules={{ validate: required }}
                            placeholder="Seleccione pago"
                            options={[
                              { value: 1, label: "Enero" },
                              { value: 2, label: "Febrero" },
                              { value: 3, label: "Marzo" },
                              { value: 4, label: "Abril" },
                              { value: 5, label: "Mayo" },
                              { value: 6, label: "Junio" },
                              { value: 7, label: "Julio" },
                              { value: 8, label: "Agosto" },
                              { value: 9, label: "Setiembre" },
                              { value: 10, label: "Octubre" },
                              { value: 11, label: "Noviembre" },
                              { value: 12, label: "Diciembre" },
                            ]}
                          />
                        </div>
                          
                        </div>
                        
                      </div>
                      )
                    },
                    {
                      component: (
                        <div className="w-full sm:w-1/2 px-2 sm:px-6">
                        <div>
                        <label htmlFor="test" className="label">
                          Año
                        </label>
                        <div className="control">
                          <InputSelect
                            control={control}
                            name="anio"
                            // rules={{ validate: required }}
                            placeholder="Seleccione pago"
                            options={[
                              { value: 2020, label: "2020" },
                              { value: 2021, label: "2021" },
                              { value: 2022, label: "2022" },
                              { value: 2023, label: "2023" },
                              { value: 2024, label: "2024" },
                              { value: 2025, label: "2025" },
                            ]}
                          />
                        </div>
                          
                        </div>
                        
                      </div>
                      )
                    },
                    { name: "descripcion", title: "Descripcion" },
                    { name: "pago", title: "Pago por mes" },
                    { name: "total", title: "Total a pagar" },
                ].map((props, index) => {
                    return (
                        <InputMasterField
                            key={props.name || index}
                            control={control}
                            {...props}
                        />
                    );
                })}
                <div>
            </div>
            </div>
      <FormFooter {...{ loading, isUpdating, urlList }} />
      <br />
    </form>
  );
}
