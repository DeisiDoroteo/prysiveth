import React, { useState } from 'react';

const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export default function Example() {
  // Datos estáticos con los nuevos lugares
  const records = [
    {
      id: 1,
      date: '2024-07-23',
      image: 'Monterrey.jpeg',
      title: 'Monterrey',
      description: 'Monterrey está rodeada de montañas y tiene un clima semiárido, con temperaturas cálidas durante todo el año. Además, la ciudad ofrece una vibrante vida cultural, con museos, teatros y una rica oferta gastronómica.'
    },
    {
      id: 2,
      date: '2024-07-23',
      image: 'Guadalajara.jpeg',
      title: 'Guadalajara',
      description: 'Segunda ciudad más grande de México, capital del estado de Jalisco. Conocida por su cultura, mariachi, tequila y arquitectura colonial. Centro económico importante del oeste de México.'
    },
    {
      id: 3,
      date: '2024-07-23',
      image: 'Tampico.jpeg',
      title: 'Tampico',
      description: 'Capital del estado homónimo, en el centro de México. Ciudad con rico patrimonio histórico y arquitectónico colonial. Centro industrial y tecnológico en crecimiento, con buena calidad de vida.'
    },
    {
      id: 4,
      date: '2024-07-23',
      image: 'Queretaro.jpeg',
      title: 'Queretaro',
      description: 'Capital del estado homónimo, en el centro de México. Ciudad con rico patrimonio histórico y arquitectónico colonial. Centro industrial y tecnológico en crecimiento, con buena calidad de vida.'
    },
    {
      id: 5,
      date: '2024-07-23',
      image: 'Valles.jpeg',
      title: 'Ciudad Valles',
      description: 'Ubicada en el estado de San Luis Potosí, en la región Huasteca. Conocida como "La Puerta Grande de la Huasteca". Popular destino turístico por sus atractivos naturales como cascadas y ríos para practicar deportes acuáticos.'
    },
    {
      id: 6,
      date: '2024-07-23',
      image: 'Monterrey.jpeg',
      title: 'Tamazunchale',
      description: 'Es una ciudad muy bella y montañosa.'
    }
  ];

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-white py-20 pt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Lugares más visitados</h2>
          <p className="text-gray-600">¡Anímate a viajar con nosotros!</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {records.map((record) => (
            <article key={record.id} className="flex flex-col items-start justify-between">
              <div className="text-xs text-gray-500 mb-2">
                <time dateTime={record.date}>
                  {formatDate(record.date)}
                </time>
              </div>
              <div className="relative">
                <img
                  src={`/public/src/img/${record.image}`} 
                  alt={record.title}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {record.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  {expandedDescriptions[record.id]
                    ? record.description
                    : `${record.description.slice(0, 100)}...`}
                  <button
                    onClick={() => toggleDescription(record.id)}
                    className="text-blue-500 ml-2"
                  >
                    {expandedDescriptions[record.id] ? 'Ver menos' : 'Ver más'}
                  </button>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
