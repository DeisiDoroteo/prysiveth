import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEmail } from "../../../Estado/usecontext";
import { Link } from "react-router-dom";

const CotizaV = () => {
  const { user } = useEmail();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [nombreTabla, setNombreTabla] = useState("");

  const fetchCotizaciones = async () => {
    if (!user || !user.email) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://back-end-siveth-g8vc.vercel.app/api/cotizacionesV/${user.email}`
      );
      setCotizaciones(response.data.data);
      setNombreTabla(response.data.nombreTabla);
      const cotizacionesFormateadas = response.data.data.map(
        (cotizacion) => ({
          ...cotizacion,
          FechaSolicitud: new Date(cotizacion.FechaSolicitud),
          Fecha: new Date(cotizacion.Fecha),
        })
      );

      cotizacionesFormateadas.sort(
        (a, b) => b.FechaSolicitud - a.FechaSolicitud
      );

      setCotizaciones(cotizacionesFormateadas);

      setLoading(false);
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCotizaciones();
  }, [user]);

  const reloadCotizaciones = async () => {
    setLoading(true);
    await fetchCotizaciones();
    setLoading(false);
  };

  const handleMarkAsRead = () => {
    setShowModal(false);
  };

  const handleRowClick = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setShowInfoModal(true);
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

  
  return (
    <div>
      <nav>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center">
              <div className="flex space-x-4 justify-center">
                <Link

                  to="/MudanzaM"
                  className="text-black hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Mudanzas
                </Link>
                <Link
                  to="/PaqueteriaP"
                  className="text-black hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Paquetería
                </Link>
                <Link
                  to="/ViajesV"
                  className="text-black hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Viajes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-6 flex justify-center">
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
                  title="check"
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
              </div>

              <span className="bg-gray-300 h-6 w-[.5px] mx-3"></span>
              <div className="flex items-center space-x-2">
                <button
                  title="Reload"
                  className="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                onClick={reloadCotizaciones}
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
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
          <table className="mt-4 max-w-4xl w-full table-auto text-left">
          <tbody>
       
    {cotizaciones.length === 0 && (
      <tr>
        <td colSpan="5" className="p-4 text-center text-gray-500">
          No se encontraron cotizaciones para este usuario.
        </td>
      </tr>
    )}
              {cotizaciones.map((cotizacion, index) => (
                <tr key={index} onClick={() => handleRowClick(cotizacion)}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                        alt="John Michael"
                        className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          Para: Viajes Ramos
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
                        {cotizacion.FechaSolicitud.toLocaleDateString(
                          "default",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
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
              {/* Aquí puedes agregar más filas con datos */}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* Icono de confirmación */}
                      <svg
                        className="h-6 w-6 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Confirmación
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          ¿Estás seguro de marcar esto como leído?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleMarkAsRead}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Marcar como leído
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInfoModal && selectedCotizacion && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* Icono de información */}
                      <svg
                        className="h-6 w-6 text-yellow-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4H9m5 0h2.937M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Información Detallada
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <strong>Destino:</strong> {selectedCotizacion.Destino}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Origen:</strong> {selectedCotizacion.Origen}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Calle:</strong> {selectedCotizacion.Calle}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Colonia:</strong> {selectedCotizacion.Colonia}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Codigo Postal:</strong>{" "}
                          {selectedCotizacion.Codigo_postal}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Telefono:</strong>{" "}
                          {selectedCotizacion.Telefono}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Fecha que se requiere:</strong>{" "}
                          {selectedCotizacion.Fecha.toLocaleDateString(
                            "default",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>Total de Pasajeros:</strong>{" "}
                          {selectedCotizacion.Cantidad_Pasajeros}
                        </p>
                      </div>
                      {/* Condición para el mensaje de cotización */}
                      {selectedCotizacion.Respuesta_empleado === "Cotizado" && (
                        <div className="bg-green-200 p-4 mt-4 text-green-700">
                          <p className="mb-4">
                            Estimad@: {selectedCotizacion.fk_usuario}.
                          </p>
                          <p className="mb-4">
                            Es un placer poder atender tu solicitud de
                            cotización. He revisado cuidadosamente los detalles
                            que proporcionaste y en base a eso me permito
                            enviarle su cotización, revísela y no dude en
                            ponerse en contacto si necesita aclaraciones
                            adicionales.
                          </p>
                          <p className="mt-4 text-black">
                            Total de su Cotización:$ {selectedCotizacion.Total}.
                          </p>
                        </div>
                      )}
                      {/* Puedes agregar más detalles aquí */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setShowInfoModal(false)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CotizaV;
