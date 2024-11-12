import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReporteVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [tipoServicioFilter, setTipoServicioFilter] = useState('');
  const [correoUsuarioFilter, setCorreoUsuarioFilter] = useState('');
  const [fechaFilter, setFechaFilter] = useState('');
  const [visibleElements, setVisibleElements] = useState(3); // Número de elementos visibles en la tabla
  const [loading, setLoading] = useState(false); // Estado para controlar la carga de más elementos

  const handleTipoServicioChange = (e) => {
    setTipoServicioFilter(e.target.value);
  };

  const handleCorreoUsuarioChange = (e) => {
    setCorreoUsuarioFilter(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFechaFilter(e.target.value);
  };

  const handleApplyFilters = () => {
    const filters = {
      tipoServicio: tipoServicioFilter,
      correoUsuario: correoUsuarioFilter,
      fecha: fechaFilter,
    };

    axios.post('https://back-end-siveth-g8vc.vercel.app/api/compras/filtrar', filters)
      .then(response => {
        console.log('Respuesta del servidor (con filtros):', response.data);
        setVentas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener el reporte de ventas con filtros:', error);
      });
  };

  const handleGetAllData = () => {
    axios.get('http://localhost:3001/api/compras')
      .then(response => {
        console.log('Respuesta del servidor (todos los datos):', response.data);
        setVentas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener todos los datos del reporte de ventas:', error);
      });
  };

  useEffect(() => {
    handleGetAllData();
    
    const intervalId = setInterval(() => {
      handleGetAllData();
    }, 60000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    if (!loading) {
      setLoading(true);

      setTimeout(() => {
        setVisibleElements((prevVisibleElements) => prevVisibleElements + 3);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto my-10 p-8 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Reporte de Ventas</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Tipo de Servicio"
          value={tipoServicioFilter}
          onChange={handleTipoServicioChange}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Correo del Usuario"
          value={correoUsuarioFilter}
          onChange={handleCorreoUsuarioChange}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Fecha"
          value={fechaFilter}
          onChange={handleFechaChange}
          className="border p-2"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={handleGetAllData}
        >
          Obtener Todos los Datos
        </button>
      </div>
      <div className="overflow-x-auto" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Tipo de Servicio</th>
              <th className="py-2 px-4 border-b">Correo del Usuario</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventas.slice(0, visibleElements).map((venta, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border-b">{venta.tipo_servicio}</td>
                <td className="py-2 px-4 border-b">{venta.correo_usuario}</td>
                <td className="py-2 px-4 border-b">{venta.total}</td>
                <td className="py-2 px-4 border-b">{venta.fecha}</td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan="4" className="text-center py-4">Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReporteVentas;
