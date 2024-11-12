import React, { useState } from 'react';
import Modal from 'react-modal';
import RecordForm from './RecordForm';
import { Link } from "react-router-dom";
import './style.css';

const RecordList = ({ records, deleteRecord, setEditRecord, fetchRecords }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' }); // New alert state
 
  const openCreateModal = () => {
    setSelectedRecord(null);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRecord(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setRecordToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (recordToDelete) {
      try {
        await deleteRecord(recordToDelete.id);
        setAlert({ message: 'Record deleted successfully!', type: 'success' });
        fetchRecords();
      } catch (error) {
        setAlert({ message: 'Failed to delete record. Please try again.', type: 'error' });
      } finally {
        closeDeleteModal();
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', options); // 'en-CA' gives the format YYYY-MM-DD
  };

  const imageUrlBase = `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`;

  // Paginación
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSuccess = (message) => {
    console.log('Alert Success:', message); // Verifica que el mensaje de éxito se está enviando
    setAlert({ message, type: 'success' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000); // Oculta la alerta después de 3 segundos
  };
  
  const handleError = (message) => {
    console.log('Alert Error:', message); // Verifica que el mensaje de error se está enviando
    setAlert({ message, type: 'error' });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000); // Oculta la alerta después de 3 segundos
  };
  
  // En el renderizado:
  console.log('Current Alert:', alert); // Verifica el estado actual de la alerta
  
  
  

  return (
    <div className="container mx-auto px-4 py-8">
  {alert.message && (
  <div className={`alert mb-4 ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
    {alert.message}
  </div>
)}


      <div className="flex space-x-4 justify-center mb-4">
        <Link to="/admin/records" className="text-black hover:bg-blue-700 px-3 py-2 rounded">
          Destinos
        </Link>
        <Link to="/admin/Slider" className="text-black hover:bg-blue-700 px-3 py-2 rounded">
          Slider
        </Link>
        <Link to="/admin/Destinos" className="text-black hover:bg-blue-700 px-3 py-2 rounded"> 
          Salidas
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold ">Destinos</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={openCreateModal}
        >
          Agregar Nuevo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-center">Titulo</th>
              <th className="py-2 px-4 text-center">Imagen</th>
              <th className="py-2 px-4 text-center">Descripción</th>
              <th className="py-2 px-4 text-center">Fecha</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="border-t align-top">
                <td className="py-2 px-4 max-w-xs">{record.title}</td>
                <td className="py-2 px-4">
                  <img src={`${imageUrlBase}${record.image}`} alt={record.title} className="h-16 w-16 object-cover rounded-full" />
                </td>
                <td className="py-2 px-4 max-w-xs whitespace-normal">
                  {expandedDescriptions[record.id] ? record.description : `${record.description.slice(0, 50)}...`}
                  <button
                    onClick={() => toggleDescription(record.id)}
                    className="text-blue-500 ml-2"
                  >
                    {expandedDescriptions[record.id] ? 'Ver menos' : 'Ver más'}
                  </button>
                </td>
                <td className="py-2 px-4 max-w-xs whitespace-nowrap align-middle">{formatDate(record.date)}</td>
                <td className="py-2 px-4 flex space-x-2 align-middle">
                  <button
                    className="bg-orange-400 text-white px-4 py-2 rounded"
                    onClick={() => openEditModal(record)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => openDeleteModal(record)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(records.length / recordsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-blue-500 rounded`}
          >
            {number + 1}
          </button>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateModal}
        contentLabel="Create Record"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeCreateModal} className="modal-close-button">×</button>
        <RecordForm fetchRecords={fetchRecords} onClose={closeCreateModal} onSuccess={handleSuccess} onError={handleError} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Record"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeEditModal} className="modal-close-button">×</button>
        {selectedRecord && (
          <RecordForm
            fetchRecords={fetchRecords}
            record={selectedRecord}
            onClose={closeEditModal}
            currentImageUrl={`${imageUrlBase}${selectedRecord.image}`}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirm Delete"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeDeleteModal} className="modal-close-button">×</button>
<p className="text-center my-4">¿Está seguro de que desea eliminar este registro?</p>
<div className="flex justify-center space-x-4">
  <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600">
    Sí, Eliminar
  </button>
  <button onClick={closeDeleteModal} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600">
    No, Cancelar
  </button>
</div>

      </Modal>
    </div>
  );
};

export default RecordList;
