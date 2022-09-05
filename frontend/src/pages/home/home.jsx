import "./home.css";
import api from "api";
import OpacityIcon from "@mui/icons-material/Opacity";
import PersonIcon from "@mui/icons-material/Person";
import UserList from "./UserList";
import useGet from "../../hooks/useGet";
import { useEffect } from "react";
import { formatNumberMoney } from "../../utils";

export default function Home() {
  const { data: dataServicio, getData: getDataServicio } = useGet();
  useEffect(() => {
    getDataServicio("servicio/infomacion");
  }, []);
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2 ">
        <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
          <div className="px-6 py-4 hover:text--100 ">
            <div className="grid grid-flow-col">
              <div className="font-bold text-xl mb-2 text-cyan-600">
                Servicio Agua - Total {dataServicio?.servicios_totales}
              </div>
              <OpacityIcon className="text-cyan-600 justify-self-end" />
            </div>
            <hr />

            <p className="text-gray-700 text-base">
              - Insolventes:{" "}
              <span className="font-bold">
                {dataServicio?.servicios_insolventes}
              </span>
            </p>
            <p className="text-gray-700 text-base">
              - Solventes:{" "}
              <span className="font-bold">
                {dataServicio?.servicios_solventes}
              </span>
            </p>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
          <div className="px-6 py-4 hover:text--100 ">
            <div className="grid grid-flow-col">
              <div className="font-bold text-xl mb-2 text-cyan-600">
                Proyectos - Total {dataServicio?.total_proyectos}
              </div>
              <PersonIcon className="text-cyan-600 justify-self-end" />
            </div>
            <hr />
            <p className="text-gray-700 text-base">
              - Ingreso:{" "}
              <span className="font-bold">
                {formatNumberMoney(dataServicio?.proyecto_monto_ingreso)}
              </span>
            </p>
            <p className="text-gray-700 text-base">
              - Egreso:{" "}
              <span className="font-bold">
                {formatNumberMoney(dataServicio?.proyecto_monto_egreso)}
              </span>
            </p>
            <p className="text-gray-700 text-base">
              - Neutro:{" "}
              <span className="font-bold">
                {formatNumberMoney(dataServicio?.proyecto_monto_neutro)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <UserList />
      </div>
    </>
  );
}
