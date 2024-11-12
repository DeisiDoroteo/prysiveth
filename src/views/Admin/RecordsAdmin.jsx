import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecordForm from '../../Componentes/Admin/RecordForm';
import RecordList from '../../Componentes/Admin/RecordList';

const RecordsAdmin = () => {
  const [records, setRecords] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://back-end-siveth-g8vc.vercel.app/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`https://back-end-siveth-g8vc.vercel.app/api/records/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <RecordList 
        records={records} 
        deleteRecord={deleteRecord} 
        setEditRecord={setEditRecord} 
        fetchRecords={fetchRecords}
      />
    </div>
  );
};

export default RecordsAdmin;
