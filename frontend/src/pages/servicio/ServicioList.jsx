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
  const { data, page, getData } = useList("servicio");
  const { deleteData } = useDelete("servicio");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/servicio/${id}`),
          remove: (id) => deleteData(id, () => getData(1, { search: search })),
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
        Header: "Año",
        accessor: "anio",
      },
      {
        Header: "Mes",
        accessor: "mes",
      },
    ],
    []
  );

  return (
    <>
      <div className="flex mb-2 sm:mb-0">
        <h1 className="text-title">Servicios de agua</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-20 mt-4">
        <Search
          className="w-full"
          onSearch={(value) => {
            getData(1, {
              search: value,
            }).then();
            setSearch(value);
          }}
        />
        <div className="flex justify-start sm:justify-end">
          <Button
            component={RouterLink}
            disableElevation
            variant="contained"
            to="/servicio/create"
          >
            Agregar
          </Button>
        </div>
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
    </>
  );
}
