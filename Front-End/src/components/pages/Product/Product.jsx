import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Stack, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import Axios

import handleRedirect from './../../HandleFunction/handleRedirect';
import EditProduct from './EditProduct';

const { Option } = Select;

const Product = () => {
  const { addProduct } = handleRedirect();
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://666aa8737013419182d04e24.mockapi.io/api/Products')
      .then(response => {
        setData(response.data); // Assume the response contains an array of products
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const handleEdit = (row) => {
    setCurrentRow(row);
    setIsEditModalVisible(true);
  };

  const handleDelete = (row) => {
    setData((prevData) => prevData.filter((item) => item.id !== row.original.id));
    console.log("Delete", row.original.id);
    // API call to delete the item
    axios.delete(`https://666aa8737013419182d04e24.mockapi.io/api/Products${row.original.id}`)
      .then(response => {
        console.log('Item deleted:', response.data);
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const handleAddProduct = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSubmit = (values) => {
    console.log('Form values:', values);
    // Add the new product to the state
    setData((prevData) => [...prevData, values]);
    // Close the modal
    setIsAddModalVisible(false);
    // Clear the form
    form.resetFields();
    // API call to add the item
    axios.post('https://666aa8737013419182d04e24.mockapi.io/api/Products', values)
      .then(response => {
        console.log('Item added:', response.data);
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', // Adjusted to match actual API response
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'category', // Adjusted to match actual API response
        header: 'Category',
        size: 150,
      },
      {
        accessorKey: 'price', // Adjusted to match actual API response
        header: 'Price',
        size: 150,
      },
      {
        accessorKey: 'quantity', // Adjusted to match actual API response
        header: 'Quantity',
        size: 150,
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

      <EditProduct
isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        rowData={currentRow ? currentRow.original : null}
        updateData={(updatedRow) => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === updatedRow.id ? { ...item, ...updatedRow } : item
            )
          );
        }}
      />

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
            name="id"
            label="Product ID"
            rules={[{ required: true, message: 'Please input the product ID!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Product Title"
            rules={[{ required: true, message: 'Please input the product title!' }]}
            style={{ marginBottom: '10px' }}
          >
            <Input style={{ width: '100%' }} />
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
              beforeUpload={() => false} // Prevent automatic upload
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