import React, { useState, useEffect } from "react";
import Axios from "axios";

const ReplyModal = ({ isOpen, onClose, selectedCotizacionId }) => {
  const [respuesta, setRespuesta] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setRespuesta("");
    setError(null);
  }, [isOpen]);

  const handleSendClick = async () => {
    try {
      if (!respuesta.trim()) {
        setError("La respuesta no puede estar vacía");
        return;
      }

      await Axios.patch(
        `https://back-end-siveth-g8vc.vercel.app/api/updatecotizaP/${selectedCotizacionId}`,
        {
          nuevaRespuesta: respuesta,
        }
      );

      onClose();
    } catch (error) {
      setError("Error al enviar la solicitud: " + error.message);
    }
  };

  const handleChange = (event) => {
    setRespuesta(event.target.value);
    setError(null);
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="transition-opacity bg-gray-500 bg-opacity-75 fixed inset-0"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            ​
          </span>
          <div className="inline-block p-5 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl lg:p-16 sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div>
              <div className="mt-3 text-left sm:mt-5">
                <h1 className="mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                  Responder
                </h1>
                <p className="mb-8 text-2xl font-semibold ">
                  Asunto: Solicitud de Cotización
                </p>

                <p>Estimado: Viajes Ramos</p>

                <p>
                  Me pongo en contacto con ustedes porque estoy interesado/a en
                  obtener una cotización para un Servicio de Paqueteria.
                </p>

                <p>
                  ¿podría proporcionarme una cotización que incluya los precios,
                  términos de pago y cualquier otra información relevante?
                </p>

                <p className="mb-8  ">
                  Agradecería mucho y quedo a la espera de su pronta respuesta.
                </p>

                <input
                  type="text"
                  value={respuesta}
                  onChange={handleChange}
                  placeholder="Escribe tu respuesta aquí..."
                  className="block w-full px-4 py-3 mb-4 text-base text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            <div className="mt-6 sm:flex">
              <div className="mt-3 rounded-lg sm:mt-0">
                <button
                  className="items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
              <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                <button
                  className="items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSendClick}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ReplyModal;
