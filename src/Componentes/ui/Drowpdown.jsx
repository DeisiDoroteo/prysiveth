import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    // Verificar si la opción ya está seleccionada
    const isSelected = selectedOptions.some((selectedOption) => selectedOption.value === option.value);

    if (isSelected) {
      // Si está seleccionada, quitarla de las opciones seleccionadas
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption.value !== option.value));
    } else {
      // Si no está seleccionada, agregarla a las opciones seleccionadas
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const filterOptions = [
    { label: 'Precio descendente', value: 'price_desc' },
    { label: 'Precio ascendente', value: 'price_asc' },
    { label: 'Orden alfabético', value: 'alpha' },
    { label: 'Precio', value: 'price' },
    { label: 'Categoría de servicio', value: 'category' },
    { label: 'Fecha ascendente', value: 'date_asc' },
    { label: 'Fecha descendente', value: 'date_desc' },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium  rounded-lg border  text-white bg-blue-700 hover:bg-orange-500 focus:outline-none "
        type="button"
      >
        Filtrar por
        <svg
          className={`ml-1.5 w-5 h-5 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute z-10 w-52 bg-white rounded-lg shadow divide-y divide-gray-100   left-[-120%]  p-2 min-w-24"
        >
          {filterOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center hover:text-white hover:bg-blue-50 dark:hover:bg-blue-800"
              onClick={() => handleSelect(option)}
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-500 mr-2"
                checked={selectedOptions.some((selectedOption) => selectedOption.value === option.value)}
                onChange={() => handleSelect(option)}
              />
              <span className="block py-2 px-4 text-sm hover:text-white">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
