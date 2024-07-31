import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, IconButton, Typography, Card, CardContent } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Form, Input, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchCustomers, addCustomer, deleteCustomer, updateCustomer } from '../../../services/CustomerService';

export default function CustomerList() {
  const [rows, setRows] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  // Fetch customers
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setRows(data.map(customer => ({ ...customer, id: customer.customerId })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getCustomers();
  }, []);

  // Add customer
  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields();
      const newCustomer = {
        fullName: values.name,
        phoneNumber: values.phone,
        email: values.email,
        loyaltyPoints: values.loyaltyPoints,
      };

      const response = await addCustomer(newCustomer);
      setRows((prevRows) => [...prevRows, { ...response, id: response.customerId }]);
      setIsAddModalVisible(false);
      notification.success({ message: 'Customer added successfully' });
    } catch (error) {
      console.error('Error adding customer:', error);
      notification.error({ message: 'Failed to add customer' });
    }
  };

  // Delete customer
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteCustomer(id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      notification.success({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      notification.error({ message: 'Failed to delete customer' });
    }
  }, []);

  // Update customer
  const showUpdateModal = (customer) => {
    setCurrentCustomer(customer);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      name: customer.fullName,
      phone: customer.phoneNumber,
      email: customer.email,
      loyaltyPoints: customer.loyaltyPoints,
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      const updatedCustomer = {
        ...currentCustomer,
        fullName: values.name,
        phoneNumber: values.phone,
        email: values.email,
        loyaltyPoints: values.loyaltyPoints,
        updated_at: new Date().toISOString(), // Updated to current date and time
      };

      await updateCustomer(currentCustomer.id, updatedCustomer);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === currentCustomer.id ? updatedCustomer : row))
      );
      setIsEditModalVisible(false);
      notification.success({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error('Error updating customer:', error);
      notification.error({ message: 'Failed to update customer' });
    }
  };

  // Show add modal
  const showAddModal = () => {
    setIsAddModalVisible(true);
    addForm.resetFields();
  };

  // Columns for DataGrid
  const columns = [
    { field: 'fullName', headerName: 'Name', width: 200 },
    { field: 'phoneNumber', headerName: 'Phone', width: 200 },
    { field: 'loyaltyPoints', headerName: 'Points', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => showUpdateModal(params.row)}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '10px' }}
          >
            <FaEdit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <FaTrash />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '16px', color: '#333' }}>
        Customer List
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px', backgroundColor: '#007bff', color: 'white' }}
        onClick={showAddModal}
        startIcon={<PlusOutlined />}
      >
        Add Customer
      </Button>
      
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            getRowId={(row) => row.id} // Specify which property to use as the unique id
          />
        </CardContent>
      </Card>

      {/* Update Modal */}
      <Modal
        title="Update Customer"
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="loyaltyPoints"
            label="Loyalty Points"
            rules={[{ required: true, message: 'Please enter the loyalty points' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add Customer"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsAddModalVisible(false)}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="loyaltyPoints"
            label="Loyalty Points"
            rules={[{ required: true, message: 'Please enter the loyalty points' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
