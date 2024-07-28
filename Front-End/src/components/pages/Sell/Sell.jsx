import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import CustomTable from '../../Designs/CustomTable';
import handleRedirect from './../../HandleFunction/handleRedirect';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
  },
});

const Sell = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false); // State for customer modal

  const { pickPromotion, payment } = handleRedirect();

  useEffect(() => {
    axios.get('https://666efd61f1e1da2be521af94.mockapi.io/Cart')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  }, []);

  const handleSave = () => {
    setShowCart(true);
  };

  const handleAddItem = () => {
    if (!productId || !productName || !pricePerUnit) {
      alert('All fields are required');
      return;
    }

    const newItem = {
      productId,
      productName,
      pricePerUnit,
      totalCost: pricePerUnit, // Assuming quantity is 1 for simplicity
    };

    axios.post('https://666aa8737013419182d04e24.mockapi.io/api/Products', newItem)
      .then(response => {
        const updatedItems = [...cartItems, response.data];
        setCartItems(updatedItems);
        setProductName('');
        setProductId('');
        setPricePerUnit(0);
      })
      .catch(error => {
        console.error('Error adding the product:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`https://666aa8737013419182d04e24.mockapi.io/api/Products/${id}`)
      .then(() => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
      })
      .catch(error => {
        console.error('Error deleting the product:', error);
      });
  };



  const columns = useMemo(
    () => [
      {
        accessorKey: 'productName',
        header: 'Product Name',
        size: 150,
      },
      {
        accessorKey: 'id',
        header: 'Product ID',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price Per Unit',
        size: 150,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 150,
      },
      {
        accessorKey: 'total',
        header: 'Total Cost',
        size: 150,
      },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 150,
        Cell: ({ cell }) => (
          <IconButton onClick={() => handleDelete(cell.row.original.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    ],
    [cartItems]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box p={2} sx={{ maxWidth: 1050, mx: 'auto', py: 4 }}>
        <Typography variant="h1" gutterBottom>
          Customer and Cart details
        </Typography>
        <Box mb={2}>
          <TextField
            label="Enter Customer Name or Contact Info"
            margin="normal"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mr: 2 }}
          >
            Inspect
          </Button>
         
        </Box>
        {showCart && (
          <Box mb={2}>
            <Typography variant="h2" gutterBottom>
              Add items into cart
            </Typography>
            <TextField
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price Per Unit"
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
              margin="normal"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              sx={{ mr: 2 }}
            >
              Add item
            </Button>
          </Box>
        )}
        {showCart && (
          <Box>
            <Typography variant="h3" gutterBottom>
              Cart Details
            </Typography>
            <br />
            <CustomTable columns={columns} data={cartItems} />
            <br />
            <Typography variant="h4" gutterBottom>
              {/* Total Amount: {totalAmount.toFixed(2)} */}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={pickPromotion}
              sx={{ mr: 2 }}
            >
              Promotion
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={payment}
            >
              Next
            </Button>
          </Box>
        )}

    
      </Box>
    </ThemeProvider>
  );
};

export default Sell;