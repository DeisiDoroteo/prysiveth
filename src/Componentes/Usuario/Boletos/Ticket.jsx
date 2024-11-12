import React, { useState } from 'react';

const Autobus = () => {
  // Estado para almacenar los asientos seleccionados
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

  // Función para alternar la selección de un asiento
  const alternarSeleccion = (asiento) => {
    if (asientosSeleccionados.includes(asiento)) {
      // Si el asiento ya está seleccionado, lo deseleccionamos
      setAsientosSeleccionados(asientosSeleccionados.filter((a) => a !== asiento));
    } else {
      // Si el asiento no está seleccionado, lo agregamos a la lista
      setAsientosSeleccionados([...asientosSeleccionados, asiento]);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-96 bg-gray-200 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Autobús</h2>
        <div className="grid grid-cols-9 gap-4">
          {/* Generar los asientos */}
          {Array.from({ length: 36 }, (_, index) => (
            <button
              key={index}
              className={`p-2 rounded-md ${
                asientosSeleccionados.includes(index + 1) ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => alternarSeleccion(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Autobus;
