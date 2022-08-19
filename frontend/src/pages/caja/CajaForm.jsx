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
    InputEditor,
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
    // InputEditor
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

    useEffect(() => {
        reset(initialValues);
    }, [initialValues]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-wrap">
          {[
            { type: "title", title: "Detalles del proyecto" },
            {
              component: (
                <div className="w-full sm:w-1/2 px-2 sm:px-6">
                  <div>
                    <label htmlFor="test" className="label">
                      Tipo
                    </label>
                    <div className="control">
                      <InputSelect
                        control={control}
                        name="tipo_movimiento"
                        rules={{ validate: required }}
                        placeholder="Seleccione tipo"
                        options={[
                          { value: 10, label: "Ingreso" },
                          { value: 20, label: "Egreso" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              ),
            },
            { name: "descripcion", title: "Descripcion" },
            { name: "monto", title: "Monto" },
          ].map((props, index) => {
            return (
              <InputMasterField
                key={props.name || index}
                control={control}
                {...props}
              />
            );
          })}
          <div></div>
        </div>
        <FormFooter {...{ loading, isUpdating, urlList }} />
        <br />
      </form>
    );
}
