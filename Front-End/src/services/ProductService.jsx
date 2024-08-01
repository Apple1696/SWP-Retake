// ProductService.jsx
import axios from 'axios';

const API_URL = 'https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
