import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../components/Table";
import LoadMask from "../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../hooks/useList";
import useDelete from "../../hooks/useDelete";
import Search from "../../components/Search/Search";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";

export default function () {
  // const { data, page, getData } = useList("user");
  // const { deleteData } = useDelete("user");
  // const [search, setSearch] = useState(null);
  // const loading = useSelector((state) => state.loading.loading);
  // const navigate = useNavigate();

  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/user/${id}`),
          remove: (id) => deleteData(id, () => getData(1, { search: search })),
        }),
      },
      {
        Header: "Nombres",
        accessor: "first_name",
      },
      {
        Header: "Apellidos",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
    []
  );

  return (
    <>
      <div className="flex mb-2 sm:mb-0">
        <h1 className="text-title">Usuarios</h1>
      </div>
      <div className="flex justify-end">
        <Button
          component={RouterLink}
          disableElevation
          variant="contained"
          to="/user/create"
        >
          Agregar
        </Button>
      </div>
      <br />
      <div style={{ height: "750px" }}>
        <DataGrid
          {...data}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      {/* <LoadMask>
        <Table
          columns={columns}
          data={data.results}
          pageCount={data.count}
          loading={loading}
          currentPage={page}
          onPageChange={(page) => getData(page, { search: search })}
        />
      </LoadMask> */}
    </>
  );
}
