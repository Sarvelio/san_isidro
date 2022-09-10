import React from "react";
import ButtonUi from "../UI";
import { useNavigate } from "react-router-dom";
import { SwalWarning } from "../SwalAlerts";

const FormFooter = ({
  errorData,
  isUpdating,
  loading,
  urlList,
  setOpen,
  onClick,
  validar = false,
  onlyRead = false,
}) => {
  const navigate = useNavigate();

  const validarAccion = () => {
    SwalWarning(
      "¿Estas seguro de realizar el pago?",
      "¡No podrá revertir esta acción!",
      "¡Sí, pagar!",
      "No, cancelar"
    ).then((result) => {
      if (result.value) {
        onClick();
      }
    });
  };

  return (
    <div className="my-4 sm:mt-10">
      {errorData && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {errorData}
        </div>
      )}
      {/* {!onlyRead && isUpdating && (
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
      )} */}
      <div className="grid gap-2 sm:block text-center">
        <div className="mx-2 sm:px-4 sm:inline-block contents">
          <ButtonUi
            type="button"
            disabled={loading}
            onClick={() => {
              console.log("saliendo de la pagina", urlList);
              navigate(urlList);
            }}
            button="secondary"
          >
            Salir
          </ButtonUi>
        </div>
        <div className="mx-2 sm:px-4 sm:inline-block contents">
          {!onlyRead && validar ? (
            <ButtonUi
              type="button"
              disabled={loading}
              onClick={validarAccion}
              button="primary"
            >
              {isUpdating ? "Editar" : "Registrar"}
            </ButtonUi>
          ) : (
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
