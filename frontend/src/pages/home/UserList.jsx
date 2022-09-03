import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../components/Table";
import LoadMask from "../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../hooks/useList";
import useDelete from "../../hooks/useDelete";
import Search from "../../components/Search/Search";

export default function () {
  const { data, page, getData } = useList("servicio/morosos");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: tableActions({
          detallesPagos: (id) => navigate(`/servicio/${id}/pagos`),
        }),
      },
      {
        Header: "Nombre",
        accessor: (a) => a.usuario.nombres,
      },
      {
        Header: "DPI",
        accessor: (a) => a.usuario.dpi,
      },
      {
        Header: "Sector",
        accessor: (a) => a.sector.nombre,
      },
      {
        Header: "Descripción",
        accessor: (a) => a.descripcion,
      },
      {
        Header: "Fecha Solvente",
        accessor: (a) => a.mes_text + " de " + a.anio,
      },
    ],
    []
  );

  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-2xl p-5">
        <div className="flex mb-2 sm:mb-0 ">
          <h1 className="text-title">Servicios de agua morosos</h1>
        </div>
        <br />
        <LoadMask>
          <Table
            columns={columns}
            data={data.results}
            pageCount={data.count}
            loading={loading}
            currentPage={page}
            onPageChange={(page) => getData(page, { search: search })}
          />
        </LoadMask>
      </div>
    </>
  );
}
