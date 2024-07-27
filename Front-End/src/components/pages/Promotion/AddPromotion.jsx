import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddPromotion = ({ addPromotion }) => {
  // State to hold the input values
  const [promotionId, setPromotionId] = useState('');
  const [promotionName, setPromotionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handler for adding a promotion
  const handleAddPromotion = () => {
    if (!promotionId || !promotionName || !startDate || !endDate) {
      alert('All fields are required');
      return;
    }
    const newPromotion = {
      id: promotionId,
      name: promotionName,
      description: 'New Promotion Description', // Description is fixed for this example
      startDate: startDate,
      endDate: endDate,
      status: 'Upcoming', // Status is fixed for this example
    };
    addPromotion(newPromotion);
    // Clear the input fields
    setPromotionId('');
    setPromotionName('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Box mb={2}>
      <TextField
        label="Promotion ID"
        value={promotionId}
        onChange={(e) => setPromotionId(e.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Promotion Name"
        value={promotionName}
        onChange={(e) => setPromotionName(e.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        margin="normal"
        variant="outlined"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPromotion}
        style={{ marginTop: '16px' }}
      >
        Add Promotion
      </Button>
    </Box>
  );
};

export default AddPromotion;
