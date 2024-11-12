import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Lateral from "./Lateral";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Permiso de notificaciones concedido.');

  } else { console.log('Permiso de notificaciones denegado.'); }
}


const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [totalCotizacionesEnProceso, setTotalCotizacionesEnProceso] =
    useState(0);
  const [userName, setUserName] = useState(""); // Nuevo estado para el nombre del usuario
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    localStorage.removeItem("userName"); // También elimina el nombre del usuario si es necesario
    navigate("/Login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".navbar")
      ) {
        setDropdownVisible(false);
        setSidebarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const fetchTotalCotizacionesEnProceso = async () => {
      try {
        const response = await axios.get("https://back-end-siveth-g8vc.vercel.app/api/NotificacionesM"); setTotalCotizacionesEnProceso(response.data.total);
        // Enviar notificación si hay cotizaciones pendientes
        if (response.data.total > 0) {
          new Notification("Tienes cotizaciones pendientes por revisar");
        }
      } catch (error) { console.error("Error al obtener el total de cotizaciones en proceso:", error); }
    }; fetchTotalCotizacionesEnProceso();
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // Obtén el nombre del usuario de localStorage
    if (storedUserName) {
      setUserName(storedUserName); // Actualiza el estado con el nombre del usuario
    }
  }, []);

  return (
    <>
      <div className="w-full transition-all">
        <div className={`sidebar ${sidebarVisible ? "block" : "hidden"}`}>
          <Lateral visible={sidebarVisible} />
        </div>

        <div className="py-2 px-6 bg-blue-700 flex items-center sticky top-0 left-0 z-30 navbar">
          <div className="py-2 px-6 flex items-center shadow-black/5 sticky top-0 left-0 z-30">
            <Bars3Icon
              className="h-6 w-6 text-lg text-gray-900 font-semibold"
              aria-hidden="true"
              onClick={toggleSidebar}
            />
          </div>

          <ul ref={dropdownRef} className="ml-auto flex items-center relative">
            <li className="flex items-center relative">
              <IoNotifications className="h-8 w-8 text-white-600" />
              {totalCotizacionesEnProceso > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white text-xs px-2 py-1">
                  {totalCotizacionesEnProceso}
                </span>
              )}
            </li>
            <li className="dropdown ml-3">
              <button
                type="button"
                className="dropdown-toggle flex items-center"
                onClick={toggleDropdown}
              >
                <div className="flex-shrink-0 w-10 h-10 relative">
                  <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://viajesramos.s3.us-east-2.amazonaws.com/perfil.jpg"
                      alt=""
                    />
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping" />
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full" />
                  </div>
                </div>
                <div className="p-2 md:block text-left">
                  <h2 className="text-base font-semibold leading-6 text-white">
                    <p className="text-white">Administrador</p>
                    {/* {userName || "User Name"} */}
                  </h2>
                  {/* <p className="text-xs text-white">Administrador</p> */}
                </div>
              </button>

              {dropdownVisible && (
                <ul className="dropdown-menu shadow-md z-30 py-1.5 rounded-md bg-white border border-gray-100 absolute right-0 mt-2 w-48">
                  <li>
                    <Link
                      to="/admin/perfil"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                    >
                      Configuración
                    </a>
                  </li>
                  <li>
                    <form method="POST" action="">
                      <a
                        role="menuitem"
                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        Cerrar sesión
                      </a>
                    </form>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
