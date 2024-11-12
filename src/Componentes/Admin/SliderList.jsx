import React, { useState } from 'react';
import Modal from 'react-modal';
import SliderForm from './SliderForm';
import { Link } from "react-router-dom";

const SliderList = ({ records, deleteSlider, fetchRecords }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const recordsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

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
      if (typeof deleteSlider === 'function') {
        await deleteSlider(recordToDelete.id);
        fetchRecords();
        closeDeleteModal();
      } else {
        console.error('deleteRecord is not a function');
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
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mostrar un rango limitado de botones de paginación
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determinar qué botones de página mostrar
  const visiblePageNumbers = pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2));

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
        <h2 className="text-2xl font-semibold">Slider</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={openCreateModal}
        >
          Agregar Nuevo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4">Titulo</th>
              <th className="py-3 px-4">Imagen</th>
              <th className="py-3 px-4">Descripcion</th>
              <th className="py-3 px-4">Fecha</th>
              <th className="py-3 px-4">Activo</th>
              <th className="py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="py-3 px-4 max-w-xs">{record.title}</td>
                <td className="py-3 px-4">
                  <img
                    src={`${imageUrlBase}${record.image}`}
                    alt={record.title}
                    className="h-16 w-16 object-cover rounded-full" 
                  />
                </td>
                <td className="py-3 px-4 max-w-xs">{record.description}</td>
                <td className="py-3 px-4 max-w-xs whitespace-nowrap">{formatDate(record.updated_at)}</td>
                <td className="py-3 px-4 max-w-xs">{record.active ? 'Activo' : 'Inactivo'}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      className="bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500"
                      onClick={() => openEditModal(record)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => openDeleteModal(record)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">

        {visiblePageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-blue-500 rounded`}
          >
            {number}
          </button>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={closeCreateModal}
        contentLabel="Crear Registro"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeCreateModal} className="modal-close-button">×</button>
        <SliderForm fetchRecords={fetchRecords} onClose={closeCreateModal} />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Editar Registro"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeEditModal} className="modal-close-button">×</button>
        {selectedRecord && (
          <SliderForm
            fetchRecords={fetchRecords}
            record={selectedRecord}
            onClose={closeEditModal}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirmar Eliminación"
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

export default SliderList;
