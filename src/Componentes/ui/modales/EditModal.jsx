import React, { useState } from 'react';

const UpdateProductModal = ({ product, closeModal }) => {
    // Define estados locales para los valores del formulario
    const [name, setName] = useState(product.name);
    const [brand, setBrand] = useState(product.brand);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos actualizados al servidor o realizar otras operaciones necesarias
        console.log("Datos actualizados:", { name, brand, price, category, description });
        // Cierra el modal
        closeModal();
    };

    return (
        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden flex justify-center items-center z-50 bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">Update Product</h3>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400" placeholder="Ex. Apple iMac 27&ldquo;"/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                                <input type="text" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400" placeholder="Ex. Apple"/>
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400" placeholder="$299"/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400">
                                    <option value="Electronics">Electronics</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400" placeholder="Write a description..."></textarea>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update product</button>
                            <button type="button" onClick={closeModal} className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;
