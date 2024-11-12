import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiHouseLight } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import axios from 'axios'; 

const Lateral = ({ visible }) => {
  const [totalNotificaciones, setTotalNotificaciones] = useState(0);

  useEffect(() => {
    const fetchTotalNotificaciones = async () => {
      try {
        const response = await axios.get("https://back-end-siveth-g8vc.vercel.app/api/NotificacionesM");
        setTotalNotificaciones(response.data.total);
      } catch (error) {
        console.error('Error al obtener el total de notificaciones:', error);
      }
    };

    fetchTotalNotificaciones();
  }, []);

  return (
    <div className={`absolute left-0 top-0 w-64 h-full bg-blue-700 p-4 z-50 sidebar-menu transition-transform ${visible ? '' : 'hidden'}`}>
      <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
        <h2 className="font-bold text-2xl">
          <img src="/src/img/logo.png" alt="" />
        </h2>
      </a>
      <ul className="mt-4 flex flex-col">
        <li>
          <span className="text-base font-semibold leading-6 text-white">ADMIN</span>
          <ul className="mt-2">
            <li className="mb-1 group">
              <Link
                to="#"
                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-orange-400 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              >
                <PiHouseLight className="ri-home-2-line mr-3 text-lg" />
                <span className="text-sm">Dashboard</span>
              </Link>
              <Link
                to="#"
                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-orange-400 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              >
                <LuUsers className="ri-home-2-line mr-3 text-lg" />
                <span className="text-sm">Usuarios</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span className="text-base font-semibold leading-6 text-white">PERSONAL</span>
          <ul className="mt-2">
            <li className="mb-1 group">
              <Link
                to="#"
                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-orange-400 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              >
                <IoMdNotificationsOutline className="ri-home-2-line mr-3 text-lg" />
                <span className="text-sm">Notificaciones</span>
              </Link>
               <Link
                to="/admin/CotizaM"
                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-orange-400 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 relative"
              >
                <MdOutlineEmail className="ri-home-2-line mr-3 text-lg" />
                <div className="flex items-center">
                  <span className="text-sm mr-2">Mensajes</span>
                  {totalNotificaciones > 0 && (
                    <span className="bg-red-500 rounded-full text-white text-xs px-2 py-1">
                      {totalNotificaciones}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span className="text-base font-semibold leading-6 text-white">ARCHIVOS</span>
          <ul className="mt-2">
            <li className="mb-1 group">
              <Link
                to="/admin/records"
                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-orange-400 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              >
                <MdPostAdd className="ri-home-2-line mr-3 text-lg" />
                <span className="text-sm">Post</span>
              </Link>
              <Link
                to="/admin/reportes"
                className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-orange-400 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              >
                <IoDocumentsOutline className="ri-home-2-line mr-3 text-lg" />
                <span className="text-sm">Reportes</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Lateral;
