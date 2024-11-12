import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Combobox from '../../Componentes/ui/combobox';
import { useNavigate } from 'react-router-dom';
import './StylesBoletos.css';

Modal.setAppElement('#root');

const destinos = [
  { id: 1, name: 'Ciudad de México' },
  { id: 2, name: 'Guadalajara' },
  { id: 3, name: 'Monterrey' },
  { id: 4, name: 'Cancún' },
];

const Origen = [
  { id: 1, name: 'Ciudad de México' },
  { id: 2, name: 'Guadalajara' },
  { id: 3, name: 'Monterrey' },
  { id: 4, name: 'Cancún' },
];

const fechas = [
  { id: 1, name: '2024-04-01' },
  { id: 2, name: '2024-04-02' },
  { id: 3, name: '2024-04-03' },
  { id: 4, name: '2024-04-04' },
];

const viajesEncontrados = [
  { origen: 'Ciudad de México', destino: 'Guadalajara', fecha: '2024-04-01', hora: '8:00 AM', precio: '$100' },
  { origen: 'Monterrey', destino: 'Guadalajara', fecha: '2024-04-01', hora: '8:00 AM', precio: '$120' },
];

function Boletos() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viajes, setViajes] = useState([]);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null); // Definir el estado para el viaje seleccionado

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalIsOpen]);

  const handleBuscarViajes = (e) => {
    e.preventDefault();
    const viajesEncontrados = [
      { origen: 'Ciudad de México', destino: 'Guadalajara', fecha: '2024-04-01', hora: '8:00 AM', precio: '$100' },
      { origen: 'Ciudad de México', destino: 'Guadalajara', fecha: '2024-04-01', hora: '12:00 AM', precio: '$100' },
      { origen: 'Ciudad de México', destino: 'Guadalajara', fecha: '2024-04-01', hora: ':00 AM', precio: '$100' },
      { origen: 'Monterrey', destino: 'Guadalajara', fecha: '2024-04-01', hora: '8:00 AM', precio: '$120' },
    ];
    setViajes(viajesEncontrados);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const elegirViaje = () => {
    if (viajes.length > 0) {
      const roleId = localStorage.getItem('roleId');
      const viajeSeleccionado = viajes[0];
      setViajeSeleccionado(viajeSeleccionado); // Establecer el viaje seleccionado en el estado
  
      if (roleId === '3') {
        navigate(`/BoletosBus?origen=${viajeSeleccionado.origen}&destino=${viajeSeleccionado.destino}&fecha=${viajeSeleccionado.fecha}&hora=${viajeSeleccionado.hora}&precio=${viajeSeleccionado.precio}`);
      } else {
        navigate(`/empleado/compraBoletos?origen=${viajeSeleccionado.origen}&destino=${viajeSeleccionado.destino}&fecha=${viajeSeleccionado.fecha}&hora=${viajeSeleccionado.hora}&precio=${viajeSeleccionado.precio}`);
      }
      setModalIsOpen(false);
    }
  };
  

  return (
    <>
      <div className="bg-white shadow-lg rounded-md p-5 md:p-10 w-full h-screen sm:mx-auto background-image-div">
        <div className="bg-white shadow-lg rounded-md p-5 md:p-10 w-11/12 sm:w-full md:max-w-screen-md mx-auto bg-opacity-80 rounded-lg flex justify-center items-center flex-col">
          <form className="space-y-6 text-center" onSubmit={handleBuscarViajes}>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight pb-2.5 text-gray-900">
              Compra de boletos
            </h2>
            <div className="md:flex md:justify-between md:space-x-4">
              <div className="w-full md:w-auto">
                <label htmlFor="Nombre" className="font-bold">
                  Origen
                </label>
                <Combobox label="Salida" options={Origen} value={origen} onChange={(e) => setOrigen(e.target.value)} />
              </div>
              <div className="w-full md:w-auto">
                <label htmlFor="ApellidoPaterno" className="font-bold">
                  Destino
                </label>
                <Combobox label="Destino" options={destinos} value={destino} onChange={(e) => setDestino(e.target.value)} />
              </div>
              <div className="w-full md:w-auto">
                <label htmlFor="ApellidoMaterno" className="font-bold">
                  Fecha
                </label>
                <Combobox label="Fecha" options={fechas} value={fecha} onChange={(e) => setFecha(e.target.value)} />
              </div>
            </div>
            <div className="md:flex md:justify-center md:space-x-4">
              <div className="w-full md:w-1/2">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" style={{ content: { width: '100vw', height: '100vh', top: '0', left: '0' } }}>
        {viajes.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Horario y Fecha de Salida</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {viajes.map((viaje, index) => (
                <li key={index} className="py-4 flex">
                  <div className="ml-4">
                    <p>Origen: {viaje.origen}</p>
                    <p>Destino: {viaje.destino}</p>
                    <p>Fecha: {viaje.fecha}</p>
                    <p>Hora: {viaje.hora}</p>
                    <p>Precio: {viaje.precio}</p>
                  </div>
                  <div className="ml-auto">
                    <button onClick={elegirViaje} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                      Agregar viaje
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
      {viajeSeleccionado && <Autobus viaje={viajeSeleccionado} />}
      {viajeSeleccionado && <AutobusEmpleado viaje={viajeSeleccionado} />}
    </>
  );
}

export default Boletos;
