import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = ({ totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMethod === 'E-Bank' || paymentMethod === 'Momo') {
      // Call API to get QR code
      axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${paymentMethod}`)
        .then(response => {
          setQrCodeUrl(response.config.url); // URL for the generated QR code
        })
        .catch(error => {
          console.error('Error generating QR code:', error);
        });
    } else {
      setQrCodeUrl('');
    }
  }, [paymentMethod]);

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log('Payment confirmed with method:', paymentMethod);
    navigate('/confirmation'); // Redirect to a confirmation page
  };

  return (
    <Box p={4} sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
      <Typography variant="h1" gutterBottom>
        Payment
      </Typography>
      <FormControl component="fieldset">
        <Typography variant="h6" gutterBottom>
          Choose a payment method
        </Typography>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="E-Bank" control={<Radio />} label="E-Bank" />
          <FormControlLabel value="Momo" control={<Radio />} label="Momo" />
        </RadioGroup>
      </FormControl>
      {paymentMethod === 'Cash' && (
        <Box mt={4}>
          <Typography variant="h6">
            Amount: ${totalAmount.toFixed(2)}
          </Typography>
        </Box>
      )}
      {(paymentMethod === 'E-Bank' || paymentMethod === 'Momo') && qrCodeUrl && (
        <Box mt={4} textAlign="center">
          <img src={qrCodeUrl} alt={`${paymentMethod} QR Code`} />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        sx={{ mt: 4 }}
        disabled={!paymentMethod}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default Payment;
