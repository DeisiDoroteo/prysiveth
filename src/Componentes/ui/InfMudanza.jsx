import React from 'react';
import { Link } from 'react-router-dom';

const ViajesEspecialesRamosModule = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Viajes Especiales Ramos</h1>
        <p className="text-xl mt-2">MUDARTE NUNCA FUE TAN FÁCIL</p>
      
        <Link to="/Cotizar">
        <button className="bg-orange-400 text-white py-2 px-4 rounded-full text-xl hover:bg-orange-300 transition duration-300">
            COTIZA GRATIS
          </button>
        </Link>
      </div>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">¿Necesitas cotizar Mudanza?</h2>
        <p className="text-gray-600 mb-4">
        Utiliza el formulario para cotizar el servicio de mudanza.
        Nuestro sistema es muy simple y funciona muy bien, ya que no te cueste ni un peso más, por lo que recibes diferentes cotizaciones de distintas empresas, las cuales compiten en atención, precio y calidad para ofrecerte el mejor de los servicios.
        </p>
      </div>



      <div className="border-t border-gray-200 pt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="w-1/3">
          <img src="/src/img/mudanza.jpeg" alt="Viaje ilustración" className="w-full max-w-xs mx-auto" />
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu Mudanza en 3 pasos:</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li className="flex items-center">
              <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
              <span>Ingresa los datos de tu viaje en sólo <strong>2 minutos</strong>.</span>
            </li>
            <li className="flex items-center">
              <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
              <span>Elige el servicio de <strong>viaje</strong> que necesitas.</span>
            </li>
            <li className="flex items-center">
              <span className="bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
              <span><strong>Relájate</strong>, Reciba su cotización personalizada en 24-48 horas.</span>
            </li>
          </ol>
        </div>
      </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg mb-4">Vamos a conseguir un buen precio para tu viaje 👍</p>
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

export default ViajesEspecialesRamosModule;