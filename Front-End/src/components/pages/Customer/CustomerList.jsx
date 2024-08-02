import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import { Form, Input, Modal, notification, Space, Table, Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { addCustomer, deleteCustomer, fetchCustomers, updateCustomer } from '../../../services/CustomerService';
import Sidebar from '../../AllRoutes/Sidebar';

const { Column } = Table;

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
        setRows(data.map(customer => ({ ...customer, key: customer.customerId })));
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
      setRows((prevRows) => [...prevRows, { ...response, key: response.customerId }]);
      setIsAddModalVisible(false);
      notification.success({ message: 'Customer added successfully' });
    } catch (error) {
      console.error('Error adding customer:', error);
      notification.error({ message: 'Failed to add customer' });
    }
  };

  // Delete customer
  const handleDelete = useCallback(async (key) => {
    try {
      await deleteCustomer(key);
      setRows((prevRows) => prevRows.filter((row) => row.key !== key));
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

      await updateCustomer(currentCustomer.key, updatedCustomer);
      setRows((prevRows) =>
        prevRows.map((row) => (row.key === currentCustomer.key ? updatedCustomer : row))
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

  return (
    <Sidebar>
      <div style={{ padding: '24px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom style={{ marginBottom: '16px', color: '#333', fontWeight: 'bold' }}>
          Customer List
        </Typography>

        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: '16px',
            backgroundColor: '#000',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
          onClick={showAddModal}
          startIcon={<PlusOutlined />}
        >
          Add Customer
        </Button>

        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
          <CardContent>
            <Table dataSource={rows} pagination={{ pageSize: 5 }}>
              <Column title="Name" dataIndex="fullName" key="fullName" />
              <Column title="Phone" dataIndex="phoneNumber" key="phoneNumber" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Points" dataIndex="loyaltyPoints" key="loyaltyPoints" />
              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    <IconButton
                      color="primary"
                      onClick={() => showUpdateModal(record)}
                      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <FaEdit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(record.key)}
                      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <FaTrash />
                    </IconButton>
                  </Space>
                )}
              />
            </Table>
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
          title={
            <div style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'underline' }}>
              Add Customer
            </div>
          }
          visible={isAddModalVisible}
          onOk={handleAdd}
          onCancel={() => setIsAddModalVisible(false)}
          okText="Add"
          cancelText="Cancel"
          okButtonProps={{
            style: {
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '5px'
            }
          }}
          cancelButtonProps={{
            style: {
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '5px'
            }
          }}
          bodyStyle={{
            padding: '20px',
            border: '1px solid #333',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
          }}
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
    </Sidebar>
  );
}
