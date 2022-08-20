import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import { setLoading } from "@redux/loadingSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "api";

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
  const dispatch = useDispatch();
  const { idServicio } = useParams();
  const [dataUsuario, setDataUsuario] = useState({});
  const watchMesesPagar = watch("meses_a_pagar");

  const getDataUsuario = async (id) => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`usuario/servicio`, { params: { id } });
      setDataUsuario(data);
    } catch (e) {
      let msj = "No se pudo obtener el registro";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e[0];
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDataUsuario(idServicio);
  }, []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <h1 className="text-title text-xl">{`Nombre: ${dataUsuario?.nombres} ${dataUsuario?.apellidos}, DPI:${dataUsuario?.dpi}`}</h1>
          <h1 className="text-title text-xl">
            {/* Ultimo mes pagado: Enero del 2021 */}
          </h1>
        </div>
        {[
          { type: "title", title: "Detalles del pago" },
          {
            component: (
              <div className="w-full sm:w-1/2 px-2 sm:px-6">
                <div>
                  <label htmlFor="test" className="label">
                    Costo del servicio por mes:
                  </label>
                  <div className="control">
                    <p>Q {dataUsuario?.costo_mensual}</p>
                  </div>
                </div>
              </div>
            ),
          },
          { name: "meses_a_pagar", title: "¿Cuantos meses va a pagar?" },
          {
            component: (
              <div className="w-full sm:w-1/2 px-2 sm:px-6">
                <div>
                  <label htmlFor="test" className="label">
                    Total a pagar:
                  </label>
                  <div className="control">
                    <p>Q {watchMesesPagar * dataUsuario?.costo_mensual}</p>
                  </div>
                </div>
              </div>
            ),
          },
          { name: "descripcion", title: "Descripción" },
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
