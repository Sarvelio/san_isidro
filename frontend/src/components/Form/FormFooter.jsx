import React from "react";
import ButtonUi from "../UI";
import { useNavigate } from "react-router-dom";

const FormFooter = ({
  errorData,
  isUpdating,
  loading,
  urlList,
  setOpen,
  onlyRead = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="my-4 sm:mt-10">
      {errorData && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {errorData}
        </div>
      )}
      {!onlyRead && isUpdating && (
        <button
          className="btn btn-outline-danger mx-0 my-2 px-4"
          type="button"
          disabled={loading}
          onClick={() => {
            setOpen(true);
          }}
        >
          Eliminar registro
        </button>
      )}
      <div className="grid gap-2 sm:block text-center">
        <div className="mx-2 sm:px-4 sm:inline-block contents">
          <ButtonUi
            type="button"
            disabled={loading}
            onClick={() => {
              navigate(urlList);
            }}
            button="secondary"
          >
            Salir
          </ButtonUi>
        </div>
        <div className="mx-2 sm:px-4 sm:inline-block contents">
          {!onlyRead && (
            <ButtonUi type="submit" disabled={loading} button="primary">
              {isUpdating ? "Editar" : "Registrar"}
            </ButtonUi>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormFooter;
