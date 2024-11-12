import React from 'react';

const InfoModal = ({ selectedCotizacion, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Icono de información */}
                <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4H9m5 0h2.937M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
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
                    <strong>Codigo Postal:</strong> {selectedCotizacion.Codigo_postal}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Telefono:</strong> {selectedCotizacion.Telefono}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Fecha que se requiere:</strong> {selectedCotizacion.Fecha}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Respuesta</strong> {selectedCotizacion.Respuesta_empleado}
                  </p>
                  {/* Más detalles si es necesario */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
