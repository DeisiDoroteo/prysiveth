import React from 'react';
import { Link } from 'react-router-dom';

const ViajesParticulares = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Viajes Especiales Ramos</h1>
        <p className="text-xl mt-2">VIAJAR NUNCA FUE TAN FÁCIL</p>
      
        <Link to="/Cotizar">
          <button className="bg-orange-400 text-white py-2 px-4 rounded-full text-xl hover:bg-orange-300 transition duration-300">
            COTIZA GRATIS
          </button>
        </Link>
      </div>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">¿Necesitas cotizar un viaje de negocio o familiar?</h2>
        <p className="text-gray-600 mb-4">
          Utiliza el formulario para cotizar el servicio de viaje particular.
          Nuestro sistema es muy simple y funciona muy bien, ya que no te cueste ni un peso más, por lo que recibes diferentes cotizaciones de distintas empresas, las cuales compiten en atención, precio y calidad para ofrecerte el mejor de los servicios.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Datos Necesarios:</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li className="flex items-center">
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                <span>Fechas tentativas del viaje</span>
              </li>
              <li className="flex items-center">
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                <span>Número de personas en el grupo</span>
              </li>
              <li className="flex items-center">
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                <span>Lugares de interés a visitar</span>
              </li>
            </ol>
          </div>

          <div className="flex justify-center items-center">
            <img src="/src/img/urban.png" alt="Descripción de la imagen" className="w-64 h-auto"/>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Requisitos:</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li className="flex items-center">
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                <span>Identificación oficial de todos los viajeros</span>
              </li>
              <li className="flex items-center">
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                <span>Depósito del 30% para confirmar la reserva</span>
              </li>
              <li className="flex items-center">
                <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                <span>Información sobre necesidades especiales</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg mb-4">Vamos a conseguir un buen precio para ti 👍</p>
        <Link to="/Cotizar">
          <button className="bg-orange-400 text-white py-3 px-6 rounded-full text-xl font-bold hover:bg-orange-300 transition duration-300">
            COTIZA GRATIS
          </button>
        </Link>
      </div>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Beneficios de viajar con nosotros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalización</h3>
            <p className="text-gray-600">Diseñamos cada viaje según tus preferencias, asegurando una experiencia única y a tu medida.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Atención 24/7</h3>
            <p className="text-gray-600">Nuestro equipo está disponible en todo momento para asistirte durante tu viaje.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Experiencias exclusivas</h3>
            <p className="text-gray-600">Acceso a actividades y lugares fuera de lo común, creando recuerdos inolvidables.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexibilidad</h3>
            <p className="text-gray-600">Opciones de cambios y cancelaciones para tu tranquilidad en tiempos inciertos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViajesParticulares;
