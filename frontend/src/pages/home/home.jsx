import "./home.css";
import api from "api";
import OpacityIcon from '@mui/icons-material/Opacity';
import PersonIcon from '@mui/icons-material/Person';
import UserList from "./UserList";

export default function Home() {
    return (
        <>
            <div className="grid gap-4 lg:grid-cols-2 ">
                <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
                    <div className="px-6 py-4 hover:text--100 ">
                      <div className="grid grid-flow-col">
                        <div className="font-bold text-xl mb-2 text-cyan-600">Agua</div>
                        <OpacityIcon className="text-cyan-600 justify-self-end"/>
                      </div>
                        <hr />
                        
                        <p className="text-gray-700 text-base">
                            Usuarios insolventes: <span className="font-bold">3</span>
                        </p>
                        <p className="text-gray-700 text-base">
                            Usuarios solventes: <span className="font-bold">0</span>
                        </p>
                        <p className="text-gray-700 text-base">
                            Total usuarios: <span className="font-bold">2</span>
                        </p>
                        <p className="text-gray-700 text-base">
                            Ingresos Totales: <span className="font-bold">Q 305.0</span>
                        </p>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-2xl border hover:-translate-y-1 hover:scale-1 duration-1000">
                    <div className="px-6 py-4 hover:text--100 ">
                      <div className="grid grid-flow-col">
                        <div className="font-bold text-xl mb-2 text-cyan-600">Usuario</div>
                        <PersonIcon className="text-cyan-600 justify-self-end"/>
                      </div>
                        <hr />
                        
                        <p className="text-gray-700 text-base">
                            Usuarios insolventes: <span className="font-bold">3</span>
                        </p>
                        <p className="text-gray-700 text-base">
                            Usuarios solventes: <span className="font-bold">0</span>
                        </p>
                        <p className="text-gray-700 text-base">
                            Total usuarios: <span className="font-bold">2</span>
                        </p>
                        <p className="text-gray-700 text-base">
                            Ingresos Totales: <span className="font-bold">Q 305.0</span>
                        </p>
                    </div>
                </div>

                
            </div>
            <div className="mt-14">
            <UserList/>
            </div>
            
        </>
    );
}
