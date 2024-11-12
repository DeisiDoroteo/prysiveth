import React, { useState } from 'react';
import { MdOutlineChair } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

const Autobus = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const origen = params.get('origen');
  const destino = params.get('destino');
  const fecha = params.get('fecha');
  const hora = params.get('hora');
  const precio = params.get('precio');

  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientosNumeroSeleccionados, setAsientosNumeroSeleccionados] = useState([]);
  const [totalBoletos, setTotalBoletos] = useState(0);

  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const alternarSeleccion = (asiento) => {
    let nuevosAsientosSeleccionados;
    let nuevosAsientosNumeroSeleccionados;

    if (asientosSeleccionados.includes(asiento)) {
      nuevosAsientosSeleccionados = asientosSeleccionados.filter((a) => a !== asiento);
      nuevosAsientosNumeroSeleccionados = asientosNumeroSeleccionados.filter((num) => num !== asiento);
    } else {
      nuevosAsientosSeleccionados = [...asientosSeleccionados, asiento];
      nuevosAsientosNumeroSeleccionados = [...asientosNumeroSeleccionados, asiento];
    }

    setAsientosSeleccionados(nuevosAsientosSeleccionados);
    setAsientosNumeroSeleccionados(nuevosAsientosNumeroSeleccionados);
    setTotalBoletos(nuevosAsientosSeleccionados.length);
  };

  const asientosOcupados = [2, 5, 8, 12, 16, 20, 22, 26, 28, 32, 34];
  const filas = [
    [4, 8, 12, 16, 20, 24, 28, 32, 36],
    [3, 7, 11, 15, 19, 23, 27, 31, 35],
    [2, 6, 10, 14, 18, 22, 26, 30, 34],
    [1, 5, 9, 13, 17, 21, 25, 29, 33]
  ];

  //Función para el link de pago
  const handleCreatePaymentLink = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://back-end-siveth-g8vc.vercel.app/api/create-payment-link', {
        name: 'Cliente de ejemplo',
        email: 'cliente@example.com',
        phone: '5555555555',
        line_items: [
          {
            name: 'Boleto de autobús',
            unit_price: 35000, // En centavos (350.00 MXN)
            quantity: 1
          }
        ],
        expires_at: Math.floor(Date.now() / 1000) + (24 * 3600) // 24 horas desde ahora
      });

      console.log('Payment Link Response:', response.data); // Verifica la respuesta del backend en la consola

      if (response.data.payment_link) {
        setPaymentLink(response.data.payment_link);
        setModalIsOpen(true); // Abre el modal cuando se crea el enlace de pago
      } else {
        console.error('Payment link not found in response:', response.data);
      }
    } catch (error) {
      console.error('Error creating payment link:', error.response ? error.response.data : error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
     {/* Contenedor del autobús */}
     <div className="w-full md:w-2/3 bg-white p-4 rounded-lg mb-4 md:mb-0"> {/* Ajustar el ancho a 2/3 en dispositivos medianos y grandes */}
           <div class="flex justify-center my-4">
                <div class="flex items-center mr-4">
                <MdOutlineChair class="w-6 h-6  text-blue-500 "/>
                    <span class="text-sm">Seleccionado</span>
                </div>
                <div class="flex items-center mr-4">
                <MdOutlineChair class="w-6 h-6 text-orange-500 "/>
                    <span class="text-sm">Ocupado</span>
                </div>
                <div class="flex items-center">
                <MdOutlineChair class="w-6 h-6 text-black-500 "/>
                    <span class="text-sm">Disponible</span>
                </div>
            </div>
        <div className="grid grid-cols-9 gap-4">
          {filas.map((fila, rowIndex) => (
            fila.map((asiento, columnIndex) => {
              let estadoAsiento;
              if (asientosSeleccionados.includes(asiento)) {
                estadoAsiento = 'text-blue-500';
              } else if (asientosOcupados.includes(asiento)) {
                estadoAsiento = 'text-orange-500';
              } else {
                estadoAsiento = 'bg-white';
              }
              return (
                <button
                  key={asiento}
                  className={`p-0 rounded-md flex items-center justify-center relative ${estadoAsiento}`}
                  onClick={() => alternarSeleccion(asiento)}
                >
                  <MdOutlineChair style={{ width: '80px', height: '80px', transform: 'rotate(90deg)' }} />
                  <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" style={{ right: '-0.7rem' }}>{asiento}</span>
                </button>
              );
            })
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <div className="bg-white shadow-lg rounded-md p-5 md:p-10 flex-col w-11/12 mt-10 mb-10 sm:mx-auto max-w-80rem">
          <p className="font-bold text-lg text-center">Viaje de ida</p>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Origen: {origen}</p>
              <p className="text-sm text-gray-500">Destino: {destino}</p>
              <p className="text-sm text-gray-500">{fecha} {hora}</p>
            </div>
            <div>
              <img className="h-25 w-auto h-12 text-gray-500" src="/src/img/logo.png" alt="" />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <p>01 Adulto(s)</p>
              <p className="font-bold">{precio}</p>
            </div>
            <div className="flex justify-between mb-4">
            <p>Total de Boletos</p>
            <p>{totalBoletos}</p>
          </div>

          <div className="flex justify-between mb-4">
            <p>Número de los asientos</p>
            <p>#{asientosNumeroSeleccionados.join(', #')}</p>
          </div>
            <div className="flex justify-between mb-4">
              <p>Viaje de ida</p>
              <p>$200</p>
            </div>
            
            <div className="flex justify-between mb-4">
              <p>IVA</p>
              <p>$120</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold">$320.00 MXN</p>
          </div> 

              
          
             <button onClick={handleCreatePaymentLink} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" >
        {loading ? 'Creando enlace...' : 'Crear enlace de pago'}
      </button>
      
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Enlace de Pago"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '10px',
          width: '600px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative' // Ajuste para posicionar el botón
        }
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Enlace de Pago</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Tu enlace de pago ha sido creado exitosamente:</p>
      {paymentLink ? (
        <a href={paymentLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'blue', textAlign: 'center', marginBottom: '60px', wordBreak: 'break-word' }}>
          {paymentLink}
        </a>
      ) : (
        <p>No se pudo obtener el enlace de pago.</p>
      )}
      <button
        onClick={() => setModalIsOpen(false)}
        style={{
          backgroundColor: '#1E90FF',
          color: 'white',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          border: 'none',
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)' // Centra el botón horizontalmente
        }}
      >
        Cerrar
      </button>
    </Modal>
        </div>
      </div>
    </div>
  );
};

export default Autobus;
