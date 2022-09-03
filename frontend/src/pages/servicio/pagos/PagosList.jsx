import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../../components/Table";
import LoadMask from "../../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../../hooks/useList";
import useDelete from "../../../hooks/useDelete";
import Search from "../../../components/Search/Search";
import { setLoading } from "@redux/loadingSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "api";

export default function () {
  const { idServicio } = useParams();
  const { data, page, getData } = useList("pagos", { servicio: idServicio });
  const { deleteData } = useDelete("pagos");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataServicio, setDataServicio] = useState({});

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/servicio/${idServicio}/pagos/${id}`),
          remove: (id) => deleteData(id, () => getData(1, { search: search })),
        }),
      },
      {
        Header: "mes",
        accessor: "mes",
      },
      {
        Header: "año",
        accessor: "anio",
      },
      // {
      //   Header: "descripcion",
      //   accessor: "descripcion",
      // },
      {
        Header: "monto",
        accessor: "monto",
      },
    ],
    []
  );

  const getDataServicio = async (id) => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`servicio/${id}`);
      setDataServicio(data);
    } catch (e) {
      let msj = "No se pudo obtener el registro";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e[0];
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDataServicio(idServicio);
  }, []);

  return (
    <>
      <div className="mb-2 sm:mb-0">
        <h1 className="text-title">Detalles del pago</h1>
        <h1 className="text-title text-xl">{`Nombre: ${dataServicio?.usuario?.nombres} ${dataServicio?.usuario?.apellidos}, DPI:${dataServicio?.usuario?.dpi}`}</h1>
        <h1 className="text-title text-xl">{`Fecha Solvente, ${dataServicio.fecha_solvente}`}</h1>
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
