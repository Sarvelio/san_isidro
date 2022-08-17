import { NavLink, useLocation } from "react-router-dom";
import useAccount from "../../hooks/useAccount";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import LockIcon from "@mui/icons-material/Lock";
import ConstructionIcon from "@mui/icons-material/Construction";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import "./sidebar.css";

function MenuItem({ Icon, title, to, user, allowTo = [], location }) {
  const onClickItem = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");
    const burgerMenu = document.getElementById("burger-menu");
    if (burgerMenu) burgerMenu.classList.remove("change");
  };

  // if (!allowTo.includes(user.type)) return <></>;
  const isActive = location.pathname.includes(to) && to != "/";
  return (
    <li className="menu-item my-1" onClick={onClickItem}>
      <NavLink
        to={to || "/"}
        end

        className={`menu-link ${isActive ? "active" : ""} hover:-translate-y-1 hover:scale-1 duration-200`}
      >
        {/* {Icon && <Icon />} */}
        <span className="pl-2">{title}</span>
      </NavLink>
    </li>
  );
}

export default function SideBar({ className }) {
  const location = useLocation();
  const { logOut, user } = useAccount();
  return (
    <>
      <aside
        id="sidebar"
        className={`${className || ""} sidebar-container pt-3`}
      >
        <div className="menu mt-1 w-full">
          <ul className="p-0 pb-16">
            <br />
            <br />
            <MenuItem
              title="Inicio"
              to="/"
              user={user}
              Icon={() => <HomeIcon />}
              location={location}
            />
            <MenuItem
              title="Usuarios"
              to="/user"
              Icon={() => <PeopleIcon />}
              user={user}
              location={location}
            />
            <MenuItem
              title="Sectores"
              to="/sector"
              Icon={() => <ConstructionIcon />}
              user={user}
              location={location}
            />
            <MenuItem
              title="Usuarios"
              to="/usuario"
              Icon={() => <ConstructionIcon />}
              user={user}
              location={location}
            />
            <MenuItem
              title="Servicio agua"
              to="/servicio"
              Icon={() => <ConstructionIcon />}
              user={user}
              location={location}
            />
            <MenuItem
              title="Proyectos"
              to="/proyecto"
              Icon={() => <ConstructionIcon />}
              user={user}
              location={location}
            />
            <MenuItem
              title="Configuración"
              to="/configuracion/1"
              Icon={() => <ConstructionIcon />}
              user={user}
              location={location}
            />
            <li className="menu-item my-2 mt-36" onClick={() => {}}>
              <div className="menu-link  text-red-600" onClick={logOut}>
                <DoorBackIcon />
                <span className="pl-2 ">Cerrar Sesión</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
