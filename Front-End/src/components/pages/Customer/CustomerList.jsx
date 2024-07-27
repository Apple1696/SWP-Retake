import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import { Modal, Form, Input, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
dayjs.locale('en');

export default function CustomerList() {
  const [rows, setRows] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [form] = Form.useForm();

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
      notification.success({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      notification.error({ message: 'Failed to delete customer' });
    }
  }, []);

  const showUpdateModal = (customer) => {
    setCurrentCustomer(customer);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      birthday: dayjs(customer.birthday),
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
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
      setIsModalVisible(false);
      notification.success({ message: 'Customer updated successfully' });
    } catch (error) {
      console.error('Error updating customer:', error);
      notification.error({ message: 'Failed to update customer' });
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'point', headerName: 'Point', width: 50 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'birthday', headerName: 'Birthday', width: 200 },
    {
      field: 'created_at',
      headerName: 'Created at',
      width: 200,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'updated_at',
      headerName: 'Updated at',
      width: 200,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <>
         
          <button
            onClick={() => showUpdateModal(params.row)}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginRight: '10px' }}
          >
            <AiFillEdit style={{ color: 'blue', fontSize: '20px' }} />
          </button>

          <button
            onClick={() => handleDelete(params.id)}
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer',  }}
          >
            <AiFillDelete style={{ color: 'red', fontSize: '20px' }} />
          </button>
        </>
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
      <Modal
        title="Update Customer"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
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
