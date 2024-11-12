import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = ({ searchTerm, selectedOptions }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-end-siveth-g8vc.vercel.app/api/compras');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedOptions.length > 0) {
      // Filtrar según opciones seleccionadas
      filtered = filtered.filter(product => selectedOptions.includes(product)); // Cambio aquí
    }

    if (searchTerm.trim() !== '') {
      // Filtrar por término de búsqueda
      filtered = filtered.filter(product => {
        const searchString = `${product.tipo_servicio} ${product.correo_usuario} ${product.total} ${product.fecha}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedOptions]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-black-500 dark:text-black-400">
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-blue-700 dark:text-white-400">
          <tr>
            <th scope="col" className="px-4 py-4 text-center">ID</th>
            <th scope="col" className="px-4 py-3 text-center">Tipo de servicio</th>
            <th scope="col" className="px-4 py-3 text-center">Correo usuario</th>
            <th scope="col" className="px-4 py-3 text-center">Total</th>
            <th scope="col" className="px-4 py-3 text-center">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index} className="border-b ">
              <th scope="row" className="px-4 py-3 font-medium text-black-900 whitespace-nowrap dark:text-black">{index + 1}</th>
              <td className="px-4 py-3 text-center text-black">{product.tipo_servicio}</td>
              <td className="px-4 py-3 text-center text-black">{product.correo_usuario}</td>
              <td className="px-4 py-3 text-center text-black">{product.total}</td>
              <td className="px-4 py-3 text-center max-w-[12rem] truncate text-black">{product.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
