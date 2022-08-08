import React from "react";
import ButtonUi from "../UI";
const FormFooter = ({
  errorData,
  editar,
  loadingCUD,
  _navigateTo,
  setOpen,
  onlyRead = false,
}) => {
  return (
    <>
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
      <div className=" grid gap-2 sm:block text-center">

      <div className="flex items-center justify-center gap-8">
        <ButtonUi
          type="button"
          disabled={loadingCUD}
          onClick={_navigateTo}
          button="secondary"
        >
          {onlyRead ? "Salir" : "Cancelarrrrrrrr"}
        </ButtonUi>
        {!onlyRead && (
          <ButtonUi
            type="submit"
            disabled={loadingCUD}
          button="primary"
          >
            {editar ? "Editar" : "Guardar"}
            
          </ButtonUi>
        )}
      </div></div>
    </>
  );
};

export default FormFooter;
