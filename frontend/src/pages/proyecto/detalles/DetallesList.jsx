import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../../components/Table";
import LoadMask from "../../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../../hooks/useList";
import useDelete from "../../../hooks/useDelete";
import Search from "../../../components/Search/Search";
import dayjs from "dayjs";
import useGet from "../../../hooks/useGet";
import { formatNumberMoney } from "../../../utils";

export default function () {
  const { idProyecto } = useParams();
  const { data, page, getData } = useList("detalles", { proyecto: idProyecto });
  const { deleteData } = useDelete("detalles");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();
  const { data: dataDetalles, getData: getDataDetalles } = useGet();

  useEffect(() => {
    getDataDetalles(`proyecto/${idProyecto}`);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/proyecto/${idProyecto}/detalles/${id}`),
          remove: (id) => deleteData(id, () => getData(1, { search: search })),
        }),
      },
      {
        Header: "Descripcion",
        accessor: "descripcion",
      },
      {
        Header: "Fecha y Hora de registro",
        accessor: (row) => dayjs(row.created).format("DD/MM/YYYY hh:mm a"),
      },
      {
        Header: "Tipo",
        accessor: "tipo_movimiento_text",
      },
      {
        Header: "Monto",
        accessor: (a) => formatNumberMoney(a.monto),
      },
    ],
    []
  );

  return (
    <>
      <div className="mb-2 sm:mb-0">
        <h1 className="text-title">Detalles</h1>
        <h1 className="text-title text-xl">{`Proyecto: ${dataDetalles?.nombre}`}</h1>
        <h1 className="text-title text-xl">{`
        Ingreso: ${formatNumberMoney(dataDetalles?.montos?.ingreso)}
        Neutro: ${formatNumberMoney(dataDetalles?.montos?.neutro)}
        Egreso: ${formatNumberMoney(dataDetalles?.montos?.egreso)} `}</h1>
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
            to={`/proyecto/${idProyecto}/detalles/create`}
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
