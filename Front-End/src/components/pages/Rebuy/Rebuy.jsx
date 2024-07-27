import React, { useState } from 'react';
import { Typography, Box, Button, TextField, Checkbox } from '@mui/material';

export default function Rebuy() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [jewelryForFemale, setJewelryForFemale] = useState({
    id: '',
    weight: '',
    goldPercentage: '',
  });
  const [gold, setGold] = useState({
    weight: '',
  });
  const [gemstone, setGemstone] = useState({
    id: '',
    name: '',
    checked: false,
  });
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleJewelryForFemaleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'weight' || name === 'goldPercentage') {
      if (!/^\d+$/.test(value)) {
        setError('Wrong input format');
      } else {
        setError(null);
      }
    }
    setJewelryForFemale({...jewelryForFemale, [name]: value });
  };

  const handleGoldChange = (event) => {
    const { name, value } = event.target;
    if (!/^\d+$/.test(value)) {
      setError('Wrong input format');
    } else {
      setError(null);
    }
    setGold({...gold, [name]: value });
  };

  const handleGemstoneChange = (event) => {
    const { name, value } = event.target;
    setGemstone({...gemstone, [name]: value });
  };

  const handleGemstoneCheck = () => {
    if (gemstone.name) {
      // assume gemstone ID is valid and retrieve orders from database
      setOrders([
        { id: 1, name: 'Order 1' },
        { id: 2, name: 'Order 2' },
        { id: 3, name: 'Order 3' },
      ]);
      setShowOrders(true);
    } else {
      setError('Wrong ID, please check again');
    }
  };

  const handleConfirm = () => {
    if (selectedOption === 'Jewelry for Female') {
      const weightOfGold = parseFloat(jewelryForFemale.weight) * (parseFloat(jewelryForFemale.goldPercentage) / 100);
      const price = weightOfGold * 100; // assume price of gold is $100 per gram
      alert(`Price: $${price.toFixed(2)}`);
    } else if (selectedOption === 'Gold') {
      const price = parseFloat(gold.weight) * 100; // assume price of gold is $100 per gram
      alert(`Price: $${price.toFixed(2)}`);
    } else if (selectedOption === 'Gemstone') {
      if (gemstone.checked) {
        // assume gemstone ID is valid and retrieve orders from database
        setOrders([
          { id: 1, name: 'Order 1' },
          { id: 2, name: 'Order 2' },
          { id: 3, name: 'Order 3' },
        ]);
        setShowOrders(true);
      } else {
        alert(`Please enter your name: ${gemstone.name}`);
      }
    }
  };

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
          Rebuy Options
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedOption === 'Jewelry for Female'? '#333' : '#fff',
            color: selectedOption === 'Jewelry for Female'? '#fff' : '#333',
            mr: 2,
          }}
          onClick={() => handleOptionClick('Jewelry for Female')}
        >
          Jewelry for Female
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedOption === 'Gold'? '#333' : '#fff',
            color: selectedOption === 'Gold'? '#fff' : '#333',
            mr: 2,
          }}
          onClick={() => handleOptionClick('Gold')}
        >
          Gold
       </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: selectedOption === 'Gemstone'? '#333' : '#fff',
            color: selectedOption === 'Gemstone'? '#fff' : '#333',
          }}
          onClick={() => handleOptionClick('Gemstone')}
        >
          Gemstone
        </Button>
      </Box>
      {selectedOption === 'Jewelry for Female' && (
        <Box mt={2}>
          <Typography variant="h6">Jewelry for Female</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <TextField
              label="ID"
              name="id"
              value={jewelryForFemale.id}
              onChange={handleJewelryForFemaleChange}
              sx={{ mr: 2 }}
            />
            <TextField
              label="Weight"
              name="weight"
              value={jewelryForFemale.weight}
              onChange={handleJewelryForFemaleChange}
              sx={{ mr: 2 }}
              inputProps={{ pattern: '[0-9]*' }}
            />
            <TextField
              label="Gold Percentage"
              name="goldPercentage"
              value={jewelryForFemale.goldPercentage}
              onChange={handleJewelryForFemaleChange}
              sx={{ mr: 2 }}
              inputProps={{ pattern: '[0-9]*' }}
            />
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      )}
      {selectedOption === 'Gold' && (
        <Box mt={2}>
          <Typography variant="h6">Gold</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <TextField
              label="Weight"
              name="weight"
              value={gold.weight}
              onChange={handleGoldChange}
              sx={{ mr: 2 }}
              inputProps={{ pattern: '[0-9]*' }}
            />
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        </Box>
      )}
      {selectedOption === 'Gemstone' && (
        <Box mt={2}>
          <Typography variant="h6">Gemstone</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <TextField
              label="ID"
              name="id"
              value={gemstone.id}
              onChange={handleGemstoneChange}
              sx={{ mr: 2 }}
            />
            <TextField
              label="Name"
              name="name"
              value={gemstone.name}
              onChange={handleGemstoneChange}
              sx={{ mr: 2 }}
            />
            <Checkbox
              checked={gemstone.checked}
              onChange={handleGemstoneCheck}
              sx={{ mr: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            {showOrders && (
              <Box>
                <Typography variant="h6">Orders:</Typography>
                <ul>
                  {orders.map((order) => (
                    <li key={order.id}>{order.name}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Box display="flex" alignItems="center" mt={2}>
        <Button variant="contained" sx={{ backgroundColor: '#333', color: '#fff' }} onClick={handleConfirm}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
}