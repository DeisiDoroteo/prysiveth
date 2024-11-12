import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export default function Example() {
  const [records, setRecords] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetchRecords();
  }, []);

  const cacheImages = async (images) => {
    if ('caches' in window) {
      const cache = await caches.open('image-cache');
      images.forEach(image => {
        cache.add(image.url);
      });
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get('https://back-end-siveth-g8vc.vercel.app/api/records');
      if (response.status === 200) {
        const fetchedRecords = response.data.map(record => ({
          ...record,
          image: `${imageUrlBase}${record.image}`,
        }));
        setRecords(fetchedRecords);
        cacheImages(fetchedRecords);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const imageUrlBase = `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/`;
  
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
                  src={record.image}
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
