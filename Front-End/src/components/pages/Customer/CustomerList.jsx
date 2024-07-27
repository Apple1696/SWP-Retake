import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

export default function CustomerList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://66a4b40a5dc27a3c19099545.mockapi.io/Customer')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(`https://66a4b40a5dc27a3c19099545.mockapi.io/Customer/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      alert('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer');
    }
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', type: 'number', width: 200 },
    { field: 'point', headerName: 'Point', type: 'number', width: 50 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'birthday', headerName: 'Birthday', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.id)}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <AiFillDelete style={{ color: 'red', fontSize: '20px' }} />
        </button>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
}
