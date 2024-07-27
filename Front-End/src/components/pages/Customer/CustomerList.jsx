import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack, IconButton } from '@mui/material';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Modal, Form, Input, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { PlusOutlined } from '@ant-design/icons';
import 'dayjs/locale/en';
dayjs.locale('en');

export default function CustomerList() {
  const [rows, setRows] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    // Fetch data from the API
    fetch('https://66a4b40a5dc27a3c19099545.mockapi.io/Customer')
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Delete Function
  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(`https://66a4b40a5dc27a3c19099545.mockapi.io/Customer/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      notification.success({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      notification.error({ message: 'Failed to delete customer' });
    }
  }, []);

  // Update Function
  const showUpdateModal = (customer) => {
    setCurrentCustomer(customer);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      birthday: dayjs(customer.birthday),
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      const updatedCustomer = {
        ...currentCustomer,
        ...values,
        birthday: values.birthday.format('YYYY-MM-DD'),
        updated_at: dayjs().format('DD/MM/YYYY'),
      };

      await axios.put(`https://66a4b40a5dc27a3c19099545.mockapi.io/Customer/${currentCustomer.id}`, updatedCustomer);
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

  // Add Function
  const showAddModal = () => {
    setIsAddModalVisible(true);
    addForm.resetFields();
  };

  const handleAdd = async () => {
    try {
      const values = await addForm.validateFields();
      const newCustomer = {
        ...values,
        birthday: values.birthday.format('YYYY-MM-DD'),
        created_at: dayjs().format('DD/MM/YYYY'),
        updated_at: dayjs().format('DD/MM/YYYY'),
      };

      const response = await axios.post('https://66a4b40a5dc27a3c19099545.mockapi.io/Customer', newCustomer);
      setRows((prevRows) => [...prevRows, response.data]);
      setIsAddModalVisible(false);
      notification.success({ message: 'Customer added successfully' });
    } catch (error) {
      console.error('Error adding customer:', error);
      notification.error({ message: 'Failed to add customer' });
    }
  };

  // Data Table
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'point', headerName: 'Point', width: 50 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'birthday', headerName: 'Birthday', width: 200 },
    // {
    //   field: 'created_at',
    //   headerName: 'Created at',
    //   width: 200,
    //   valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    // },
    // {
    //   field: 'updated_at',
    //   headerName: 'Updated at',
    //   width: 200,
    //   valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    // },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <>
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
              onClick={() => handleDelete(params.id)}
              style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <FaTrash />
            </IconButton>
          </Stack>

        </>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>

      {/* Add button */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px', backgroundColor: 'black', color: 'white' }}
        onClick={showAddModal}
      >
        Add Customer
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      {/* Update Modal */}
      <Modal
        title="Update Customer"
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalVisible(false)}
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
            name="birthday"
            label="Birthday"
            rules={[{ required: true, message: 'Please select the birthday' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal
        title="Add Customer"
        visible={isAddModalVisible}
        onOk={handleAdd}
        onCancel={() => setIsAddModalVisible(false)}
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
            name="birthday"
            label="Birthday"
            rules={[{ required: true, message: 'Please select the birthday' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
