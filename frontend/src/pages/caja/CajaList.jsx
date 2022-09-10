import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../components/Table";
import LoadMask from "../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../hooks/useList";
import useDelete from "../../hooks/useDelete";
import Search from "../../components/Search/Search";
import OpacityIcon from "@mui/icons-material/Opacity";
import PersonIcon from "@mui/icons-material/Person";
import { setLoading } from "@redux/loadingSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";
import api from "api";
import { toast } from "react-toastify";
import { formatNumberMoney } from "../../utils";

const mostrarMonto = (row, tipo_mov) => {
  if (row.tipo_movimiento_text === tipo_mov) {
    return formatNumberMoney(row.monto);
  }
  return "";
};

export default function () {
  const { data, page, getData } = useList("caja");
  const { deleteData } = useDelete("caja");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataCaja, setDataCaja] = useState({});

  const getDataCaja = async () => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`caja/total_actual`);
      setDataCaja(data);
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
    getDataCaja();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: (row) =>
          row.tipo_detalle_text == "Caja"
            ? tableActions({
                edit: (id) => navigate(`/caja/${id}`),
                remove: (id) =>
                  deleteData(id, () => getData(1, { search: search })),
              })(row)
            : null,
      },

      {
        Header: "Tipo detalle",
        accessor: "tipo_detalle_text",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },

      {
        Header: "Neutro",
        accessor: (row) => mostrarMonto(row, "Neutro"),
      },
      {
        Header: "Ingreso",
        accessor: (row) => mostrarMonto(row, "Ingreso"),
      },
      {
        Header: "Egreso",
        accessor: (row) => mostrarMonto(row, "Egreso"),
      },
    ],
    []
  );

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2 ">
        <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
          <div className="px-6 py-2 hover:text--100 ">
            <div className="grid grid-flow-col">
              <div className="font-bold text-xl m-1 text-cyan-600">
                Monto Ingresado
              </div>
              <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">
                {formatNumberMoney(dataCaja?.monto_ingresado)}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
          <div className="px-6 py-2 hover:text--100 ">
            <div className="grid grid-flow-col">
              <div className="font-bold text-xl m-1 text-cyan-600">
                Monto Egresado
              </div>
              <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">
                {formatNumberMoney(dataCaja?.monto_egresado)}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
          <div className="px-6 py-2 hover:text--100 ">
            <div className="grid grid-flow-col">
              <div className="font-bold text-xl m-1 text-cyan-600">
                Monto Neutro
              </div>
              <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">
                {formatNumberMoney(dataCaja?.monto_neutro)}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
          <div className="px-6 py-2 hover:text--100 ">
            <div className="grid grid-flow-col">
              <div className="font-bold text-xl m-1 text-cyan-600">
                Monto disponible
              </div>
              <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">
                {formatNumberMoney(dataCaja?.monto_disponible)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-2 sm:mb-0 mt-12">
        <h1 className="text-title">Caja</h1>
      </div>
      <div className=" h-full sm:gap-20 mt-4">
        <div className="flex justify-end">
          <Button
            component={RouterLink}
            disableElevation
            variant="contained"
            to="/caja/create"
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
