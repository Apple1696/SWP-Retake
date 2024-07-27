import React, { useState, useMemo, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import CustomTable from './../../Designs/CustomTable';
import axios from 'axios';

export default function PickPromotion() {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    axios.get('https://666aa8737013419182d04e24.mockapi.io/api/Promotion')
      .then(response => {
        setPromotions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the promotions!', error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'PromotionName',
        header: 'Promotion Name',
        size: 150,
      },
      {
        accessorKey: 'Description',
        header: 'Description',
        size: 150,
      },
      {
        accessorKey: 'StartDate',
        header: 'Start Date',
        size: 150,
      },
      {
        accessorKey: 'EndDate',
        header: 'End Date',
        size: 150,
      },
      {
        accessorKey: 'Status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'pick',
        header: 'Pick',
        size: 150,
        Cell: ({ row }) => (
          <Button
            variant="contained"
            sx={{
              backgroundColor: selectedPromotion === row.id ? '#333' : '#fff',
              color: selectedPromotion === row.id ? '#fff' : '#333',
              cursor: row.Status === 'Expired' ? 'not-allowed' : 'pointer',
              opacity: row.Status === 'Expired' ? 0.5 : 1,
              pointerEvents: row.Status === 'Expired' ? 'none' : 'auto',
            }}
            onClick={() => {
              if (row.Status !== 'Expired') {
                setSelectedPromotion(selectedPromotion === row.id ? null : row.id);
              }
            }}
            disabled={row.Status === 'Expired'}
          >
            {selectedPromotion === row.id ? 'Unpick' : 'Pick'}
          </Button>
        ),
      },
    ],
    [selectedPromotion],
  );

  const handleConfirm = () => {
    // Navigate back to sell page
    console.log('Confirm button clicked');
  };

  const isConfirmButtonDisabled = selectedPromotion === null;

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        padding: 2,
        borderRadius: 1,
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" sx={{ color: '#333', flexGrow: 1 }}>
          Choose promotion for Order ID: 1234
        </Typography>
      </Box>
      <Box height={400} sx={{ overflowY: 'auto' }}>
        <CustomTable columns={columns} data={promotions} />
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Button variant="contained" sx={{ backgroundColor: '#333', color: '#fff', mr: 2 }} disabled={isConfirmButtonDisabled} onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="contained" sx={{ backgroundColor: '#333', color: '#fff' }} href="/sell">
          Back
        </Button>
      </Box>
    </Box>
  );
}
