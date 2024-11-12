import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DestinoForm = ({ fetchRecords, record, onClose, currentImageUrl }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (record) {
      setTitle(record.title || '');
      setDescription(record.description || '');
    }
  }, [record]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      let url = 'https://back-end-siveth-g8vc.vercel.app/api/records';
      let method = 'post';

      // Si existe record (es una edición), ajusta la URL y el método HTTP
      if (record) {
        url += `/${record.id}`;
        method = 'put';
      }

      await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (typeof fetchRecords === 'function') {
        fetchRecords();
      }
      setTitle('');
      setDescription('');
      setImage(null);
      setError('');
      onClose(); // Cierra el modal después de enviar el formulario con éxito
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Error al guardar el registro');
    }
  };

  const handleCancel = () => {
    onClose(); // Cierra el modal al hacer clic en Cancelar
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Información del Destino</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Titulo
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="Descripcion"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          {currentImageUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Imagen Actual
              </label>
              <img src={currentImageUrl} alt="Current Image" className="h-16 w-16 object-cover mt-1" />
            </div>
          )}
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            {currentImageUrl ? 'Cambiar Imagen' : 'Imagen'}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinoForm;
