import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordForm = ({ fetchRecords, record, onClose, currentImageUrl, onSuccess, onError }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (record) {
      setTitle(record.title || '');
      setDescription(record.description || '');
      // No se actualiza la imagen porque se maneja por separado
    }
  }, [record]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const url = record 
        ? `https://back-end-siveth-g8vc.vercel.app/api/records/${record.id}` 
        : 'https://back-end-siveth-g8vc.vercel.app/api/records';
      const method = record ? 'PUT' : 'POST';
  
      await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      fetchRecords();
      console.log('Success Message:', record ? 'Record updated successfully!' : 'Record created successfully!');
      onSuccess(record ? 'Record updated successfully!' : 'Record created successfully!');
      onClose();
    } catch (err) {
      console.error('Error saving record:', err);
      onError('Error saving record. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Titulo</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Imagen</label>
        {currentImageUrl && !image && (
          <img src={currentImageUrl} alt="Current" className="mb-2 w-32 h-32 object-cover" />
        )}
        
        <input
          type="file"
          accept="image/jpeg, image/png, image/gif" 
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default RecordForm;
