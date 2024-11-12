import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SliderList from '../../Componentes/Admin/SliderList';

const SliderAdmin= () => {
  const [records, setSliders] = useState([]);
  const [editSlider, setEditSlider] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://back-end-siveth-g8vc.vercel.app/api/slider');
      setSliders(response.data);
    } catch (error) {
      console.error('Error fetching records', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlider = async (id) => {
    try {
      await axios.delete(`https://back-end-siveth-g8vc.vercel.app/api/slider/${id}`);
      fetchSliders();
    } catch (error) {
      console.error('Error deleting record', error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SliderList 
        records={records} 
        deleteSlider={deleteSlider} 
        setEditSlider={setEditSlider} 
        fetchSliders={fetchSliders}
      />
    </div>
  );
};

export default SliderAdmin
