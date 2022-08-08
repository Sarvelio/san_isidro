import React from "react";
import ButtonUi from "../UI";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function FormFooter({
  errorData,
  editar,
  loadingCUD,
  _navigateTo,
  setOpen,
  onlyRead = false,


  onSubmit, initialValues = {}, isUpdating
}) {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {errorData && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {errorData}
        </div>
      )}
      {!onlyRead && editar && (
        <button
          className="btn btn-outline-danger mx-0 my-2 px-4"
          type="button"
          disabled={loadingCUD}
          onClick={() => {
            setOpen(true);
          }}
        >
          Eliminar registro
        </button>
      )}
      <div className="flex items-center justify-center gap-10">
        <ButtonUi
            component={RouterLink}
            variant="contained"
            to="/user"

          // className="btn btn-secondary mx-sm-2 mt-2 px-4 "
          // type="button"
          // disabled={loadingCUD}
          // style={{ minWidth: 150 }}
          // onClick={_navigateTo}
          color="orange-600"
        >
          {onlyRead ? "Salir" : "Cancelar"}
        </ButtonUi>
        {!onlyRead && (
          <ButtonUi
            className="btn btn-warning mx-sm-2 mt-2 px-4 "
            type="submit"
            disabled={loadingCUD}
            style={{ minWidth: 150 }}
            color="cyan-600"
          >
            {editar ? "Editar" : "Guardar"}
          </ButtonUi>
        )}
      </div>
      </form>
  );
};