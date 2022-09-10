import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../../components/Table";
import LoadMask from "../../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../../hooks/useList";
import Search from "../../../components/Search/Search";
import useGet from "../../../hooks/useGet";
import { formatNumberMoney } from "../../../utils";

export default function () {
  const { idServicio } = useParams();
  const { data, page, getData } = useList("pagos", { servicio: idServicio });
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const { data: dataServicio, getData: getDataServicio } = useGet();

  const columns = useMemo(
    () => [
      {
        Header: "Mes",
        accessor: "mes_text",
      },
      {
        Header: "Año",
        accessor: "anio",
      },
      {
        Header: "Descripcion",
        accessor: "descripcion",
      },
      {
        Header: "Monto",
        accessor: (a) => formatNumberMoney(a.monto),
      },
    ],
    []
  );

  useEffect(() => {
    getDataServicio(`servicio/${idServicio}`);
  }, []);

  return (
    <>
      <div className="mb-2 sm:mb-0">
        <h1 className="text-title">Detalles del pago</h1>
        <h1 className="text-title text-xl">{`Nombre: ${dataServicio?.usuario?.nombres} ${dataServicio?.usuario?.apellidos}, DPI:${dataServicio?.usuario?.dpi}`}</h1>
        <h1
          className={`text-title text-xl ${
            dataServicio.moroso ? "text-red-500" : ""
          }`}
        >{`Fecha Solvente, ${dataServicio.fecha_solvente}`}</h1>
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
            to={`/servicio/${idServicio}/pagos/create`}
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
