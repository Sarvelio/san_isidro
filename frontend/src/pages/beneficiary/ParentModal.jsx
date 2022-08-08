import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import TitleUnderline from "../../components/TitleUnderline";
import useAsyncOptions from "../../hooks/useAsyncOptions";
import {
  InputDate,
  InputText,
  InputSelect,
  InputAsyncSelect,
  InputPhoto,
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

import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import Modal from "../../components/Modal";

export default function ParentModal({ onClose }) {
  const { saveData } = useCreate("parent");

  const onSubmit = async (data) => {
    const body = { ...data };
    body.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
    saveData(body).then(() => {
      onClose();
    });
  };
  return (
    <Modal title="Encargado" open={true} onClose={onClose}>
      <ParentForm onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
}

function ParentForm({ onSubmit, onClose }) {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="test" className="label">
            Relación
          </label>
          <div className="control">
            <InputSelect
              control={control}
              name="relation"
              rules={{ validate: required }}
              placeholder="Seleccione una opción"
              options={[
                { value: 1, label: "Madre" },
                { value: 2, label: "Padre" },
                { value: 3, label: "Abuela" },
                { value: 5, label: "Abuelo" },
                { value: 6, label: "Tia" },
                { value: 7, label: "Tio" },
                { value: 8, label: "Encargado" },
              ]}
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
        <div>
          <label htmlFor="test" className="label">
            DPI
          </label>
          <InputText
            control={control}
            name="dpi"
            placeholder={"Ingrese numero de identificación"}
          />
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
      <div className="grid grid-cols-2">
        <div>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Regresar
          </Button>
        </div>
        <div className="flex justify-end">
          <Button variant="contained" type="submit">
            Registrar
          </Button>
        </div>
      </div>
      <br />
    </form>
  );
}
