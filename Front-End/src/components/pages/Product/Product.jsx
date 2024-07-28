import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Stack, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Form, Input, Select, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import handleRedirect from './../../HandleFunction/handleRedirect';

const { Option } = Select;

const Product = () => {
  const { addProduct } = handleRedirect();
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    axios.get('https://66a4b40a5dc27a3c19099545.mockapi.io/Item')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (row) => {
    setCurrentRow(row.original);
    editForm.setFieldsValue({
      price: row.original.price,
      quantity: row.original.quantity,
    });
    setIsEditModalVisible(true);
  };

  const handleDelete = (row) => {
    setData((prevData) => prevData.filter((item) => item.id !== row.original.id));
    axios.delete(`https://66a4b40a5dc27a3c19099545.mockapi.io/Item/${row.original.id}`)
      .then(response => {
        console.log('Item deleted:', response.data);
        notification.success({ message: 'Customer deleted successfully' });

      })
      .catch(error => {
        console.error('Error deleting item:', error);
        notification.error({ message: 'Failed to delete customer' });

      });
  };

  const handleAddProduct = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSubmit = (values) => {
    const formData = new FormData();
    formData.append('category', values.category);
    formData.append('name', values.name);
    formData.append('gold_weight', values.gold_weight);
    formData.append('price', values.price);
    formData.append('status', values.status);
    formData.append('image', values.image[0]?.originFileObj);

    axios.post('https://66a4b40a5dc27a3c19099545.mockapi.io/Item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setData((prevData) => [...prevData, response.data]);
        console.log('Item added:', response.data);
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });

    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleEditSubmit = (values) => {
    const updatedRow = { ...currentRow, ...values };
    axios.put(`https://66a4b40a5dc27a3c19099545.mockapi.io/Item/${currentRow.id}`, updatedRow)
      .then(response => {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === updatedRow.id ? { ...item, ...updatedRow } : item
          )
        );
        console.log('Item updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });

    setIsEditModalVisible(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 10,
      },
      {
        accessorKey: 'image',
        header: 'Image',
        size: 10,
        Cell: ({ cell }) => <img src={cell.getValue()} alt="product" style={{ width: '50px', height: '50px' }} />,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 15,
      },
      {
        accessorKey: 'gold_weight',
        header: 'Gold weight',
        size: 15,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 15,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 15,
      },
      {
        accessorKey: 'created_at',
        header: 'Created at',
        size: 15,
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated at',
        size: 15,
      },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 150,
        Cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" onClick={() => handleEdit(row)}>
              <FaEdit />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDelete(row)}>
              <FaTrash />
            </IconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>Product List</h1>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px', backgroundColor: 'black', color: 'white' }}
        onClick={handleAddProduct}
      >
        Add Product
      </Button>
      <div className="table-container" style={{ overflowX: 'auto' }}>
        <MaterialReactTable columns={columns} data={data} />
      </div>

      <Modal
        title="Edit Item"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => editForm.submit()}
        style={{ backgroundColor: '#f0f0f0' }}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={currentRow}
          style={{ backgroundColor: 'white', padding: '20px' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Name required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gold_weight"
            label="Gold weight"
            rules={[{ required: true, message: 'Gold weight required' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Product"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={() => form.submit()}
        style={{ backgroundColor: '#f0f0f0' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddSubmit}
          style={{ backgroundColor: 'white', padding: '20px' }}
        >
          <Form.Item
            name="category"
            label="Select product type"
            rules={[{ required: true, message: 'Please select a product type!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Select placeholder="Select a product type" style={{ width: '100%' }}>
              <Option value="Necklace">Necklace</Option>
              <Option value="Bracelet">Bracelet</Option>
              <Option value="Ring">Ring</Option>
              <Option value="Earrings">Earrings</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Jewelry name"
            rules={[{ required: true, message: 'Please input the product title!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="gold_weight"
            label="Gold Weight"
            rules={[{ required: true, message: 'Please input the gold weight!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Input type="number" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price per item"
            rules={[{ required: true, message: 'Please input the price per item!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Input type="number" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please input the status!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image Upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload an image!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false}
              style={{ width: '100%' }}
            >
              <Button icon={<UploadOutlined />} style={{ width: '100%' }}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
