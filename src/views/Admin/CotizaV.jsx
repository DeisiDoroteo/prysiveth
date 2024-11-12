import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineQuickreply } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { useEmail } from "../../Estado/usecontext";
import ConfirmationModal from "../../Componentes/ui/modales/ConfirmationModal";
import InfoModal from "../../Componentes/ui/modales/InfoModal";
import ReplyModal from "../../Componentes/ui/modales/ReplyModall"; // Corregido el nombre del componente
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
const ProjectTable = () => {
  const { user } = useEmail();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [selectedCotizacionId, setSelectedCotizacionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(5); // Define the number of items per page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const cotizacionesPaginadas = cotizaciones.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowClick = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setSelectedCotizacionId(cotizacion.id);
  };

  const getColorClass = (respuesta) => {
    if (respuesta === "Cotizado") {
      return "bg-green-500";
    } else if (respuesta === "Proceso") {
      return "bg-red-500";
    } else {
      return "bg-gray-500";
    }
  };

  const openReplyModal = () => {
    setReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setReplyModalOpen(false);
  };

  const reloadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://back-end-siveth-g8vc.vercel.app/api/cotizacionesViajes");
      // Formatear las fechas antes de establecerlas en el estado
      const cotizacionesFormateadas = response.data.data.map(cotizacion => ({
        ...cotizacion,
        FechaSolicitud: new Date(cotizacion.FechaSolicitud) // Formatear la fecha como objeto Date
      }));
      setCotizaciones(cotizacionesFormateadas);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchCotizaciones = async () => {
      setLoading(true);
      try {
        let response;
        if (currentPage && itemsPerPage) {
          response = await axios.get("https://back-end-siveth-g8vc.vercel.app/api/cotizacionesViajes", {
            params: {
              page: currentPage,
              limit: itemsPerPage
            }
          });
        } else {
          response = await axios.get("https://back-end-siveth-g8vc.vercel.app/api/cotizacionesViajes");
        }
  
        const cotizacionesFormateadas = response.data.data.map(cotizacion => ({
          ...cotizacion,
          FechaSolicitud: new Date(cotizacion.FechaSolicitud)
        }));
  
        cotizacionesFormateadas.sort((a, b) => b.FechaSolicitud - a.FechaSolicitud);
  
        setCotizaciones(cotizacionesFormateadas);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener cotizaciones:", error);
        setLoading(false);
      }
    };
  
    fetchCotizaciones();
  }, [currentPage, itemsPerPage]);
  

  
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
  };
  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <nav>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center">
              <div className="flex space-x-4 justify-center">
                <Link
                  to="/admin/CotizaM"
                  className="text-black hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Mudanzas
                </Link>
                <Link
                  to="/admin/CotizaP"
                  className="text-black hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Paquetería
                </Link>
                <Link
                  to="/admin/CotizaV"
                  className="text-black hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Viajes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-4 flex justify-center">
        <div className="overflow-x-auto">
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500"
                />
                <button
                  title="Reload"
                  className="text-gray-700  hover:bg-gray-200 transition duration-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                <div className="flex items-center space-x-2">
                  <button
                    title="Reload"
                    onClick={reloadData}
                    className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                  >
                    <TfiReload />
                  </button>
                </div>
                <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                <div className="flex items-center space-x-2">
                  <button
                    title="Archive"
                    className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                      ></path>
                    </svg>
                  </button>

                  <button
                    title="Delete"
                    className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
                <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                <div className="flex items-center space-x-2">
                  <button
                    title="Mark As Read"
                    className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                    onClick={() => setShowModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="mt-4 max-w-4xl w-full table-auto text-left">
            <tbody>
            {cotizacionesPaginadas.map((cotizacion, index) => (
             
                <tr
                  key={index}
                  id={cotizacion.id}
                  onClick={() => handleRowClick(cotizacion)}
                >
                  {/* Contenido de la fila */}
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-500"
                        onClick={handleCheckboxClick}
                      />
                      {/* Icono Quickreply */}
                      <button
                        title="Reply"
                        className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          openReplyModal(selectedCotizacionId);
                        }}
                      >
                        <MdOutlineQuickreply className="h-5 w-5" />
                      </button>
                    </div>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <FaRegCircleUser className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md" />
                      {/* <img
                        src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                        alt="John Michael"
                        className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
                      /> */}
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {cotizacion.fk_usuario}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        Cotizacion Viajes Particulares
                      </p>
                    </div>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {cotizacion.FechaSolicitud.toLocaleDateString('default', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap text-xs leading-none py-2 px-3 rounded-lg text-white ${getColorClass(
                          cotizacion.Respuesta_empleado
                        )}`}
                      >
                        {cotizacion.Respuesta_empleado}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Modal de información y confirmación */}
          {/* Agrega el modal de respuesta */}
          {selectedCotizacion && (
            <InfoModal
              selectedCotizacion={selectedCotizacion}
              onClose={() => setSelectedCotizacion(null)}
            />
          )}
          {showModal && (
            <ConfirmationModal
              onConfirm={() => {
                setShowModal(false);
              }}
              onClose={() => setShowModal(false)}
            />
          )}
          {/* Agrega la verificación para selectedCotizacionId antes de mostrar el modal */}
          {selectedCotizacionId && (
            <ReplyModal
              isOpen={replyModalOpen}
              onClose={closeReplyModal}
              selectedCotizacionId={selectedCotizacionId}
            />
          )}
          
        </div>
      </div>
      <div className="flex justify-center bg-white max-w-96 mx-auto pt-0"> {/* Agrega 'mx-auto' para centrar horizontalmente */}
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, cotizaciones.length)}</span> of{' '}
        <span className="font-medium">{cotizaciones.length}</span> results
      </p>
    </div>
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="#"
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
          onClick={goToPreviousPage}
        >
          <span className="sr-only">Previous</span>
          <GiPreviousButton />
        </a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          {currentPage}
        </span>
        <a
          href="#"
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === Math.ceil(cotizaciones.length / itemsPerPage) ? 'pointer-events-none opacity-50' : ''}`}
          onClick={goToNextPage}
        >
          <span className="sr-only">Next</span>
          <GiNextButton />
        </a>
      </nav>
    </div>
  </div>
</div>

    </div>
  );
};

export default ProjectTable;