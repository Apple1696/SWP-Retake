import axios from 'axios';

// Create an instance of axios with default configurations
const apiClient = axios.create({
  baseURL: 'https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all customers
export const fetchCustomers = async () => {
  try {
    const response = await apiClient.get('/Customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Add a new customer
export const addCustomer = async (customer) => {
  try {
    const response = await apiClient.post('/Customers', customer);
    return response.data;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  }
};

// Update an existing customer
export const updateCustomer = async (customerId, customer) => {
  try {
    const response = await apiClient.put(`/Customers/${customerId}`, customer);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// Delete a customer
export const deleteCustomer = async (customerId) => {
  try {
    await apiClient.delete(`/Customers/${customerId}`);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
