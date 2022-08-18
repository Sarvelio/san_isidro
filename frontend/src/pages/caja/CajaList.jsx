import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../components/Table";
import LoadMask from "../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../hooks/useList";
import useDelete from "../../hooks/useDelete";
import Search from "../../components/Search/Search";
import OpacityIcon from '@mui/icons-material/Opacity';
import PersonIcon from '@mui/icons-material/Person';

export default function () {
  const { data, page, getData } = useList("proyecto");
  const { deleteData } = useDelete("proyecto");
  const [search, setSearch] = useState(null);
  const loading = useSelector((state) => state.loading.loading);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "Herramientas",
        accessor: tableActions({
          edit: (id) => navigate(`/proyecto/${id}`),
          remove: (id) => deleteData(id, () => getData(1, { search: search })),
          detallesProyecto: (id) => navigate(`/proyecto/${id}/detalles`),
        }),
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Tipo",
        accessor: "tipo",
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
                        <div className="font-bold text-xl m-1 text-cyan-600">Saldo Ingresado</div>
                        <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">Q 234</span>
                      </div>
                    </div>
                    
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
                    <div className="px-6 py-2 hover:text--100 ">
                      <div className="grid grid-flow-col">
                        <div className="font-bold text-xl m-1 text-cyan-600">Saldo Egresado</div>
                        <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">Q 400</span>
                      </div>
                    </div>
                    
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
                    <div className="px-6 py-2 hover:text--100 ">
                      <div className="grid grid-flow-col">
                        <div className="font-bold text-xl m-1 text-cyan-600">Saldo Neutro</div>
                        <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">Q 3400</span>
                      </div>
                    </div>
                    
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
                    <div className="px-6 py-2 hover:text--100 ">
                      <div className="grid grid-flow-col">
                        <div className="font-bold text-xl m-1 text-cyan-600">Monto disponible</div>
                        <span className="text-cyan-600 justify-self-end m-1 font-bold text-xl">Q 234</span>
                      </div>
                    </div>
                    
                </div>
                
            </div>
      <div className="flex mb-2 sm:mb-0 mt-12">
        <h1 className="text-title">Caja</h1>
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
