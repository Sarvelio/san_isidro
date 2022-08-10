import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../../components/Table";
import LoadMask from "../../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../../hooks/useList";
import useDelete from "../../../hooks/useDelete";
import Search from "../../../components/Search/Search";

export default function () {
  const { data, page, getData } = useList("sector");
  const { deleteData } = useDelete("sector");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();
  const { id } = useParams();
  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/sector/${id}`),
          remove: (id) => deleteData(id, () => getData(1, { search: search })),
        }),
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
    ],
    []
  );

  return (
    <>
      <div className="flex mb-2 sm:mb-0">
        <h1 className="text-title">Sectores</h1>
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
            to={`/proyecto/${id}/detalles/create`}
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
