import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Stack, IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Form, Input, Select, notification } from 'antd';
import axios from 'axios';
import { Row, Col } from 'antd'; // Import Row and Col from Ant Design

const { Option } = Select;

const Product = () => {
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    axios.get('https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (row) => {
    setCurrentRow(row.original);
    editForm.setFieldsValue(row.original);
    setIsEditModalVisible(true);
  };

  const handleDelete = (row) => {
    setData((prevData) => prevData.filter((item) => item.productId !== row.original.productId));
    axios.delete(`https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products/${row.original.productId}`)
      .then(response => {
        console.log('Product deleted:', response.data);
        notification.success({ message: 'Product deleted successfully' });
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        notification.error({ message: 'Failed to delete product' });
      });
  };
  
  const handleAddProduct = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSubmit = (values) => {
    axios.post('https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products', values)
      .then(response => {
        setData((prevData) => [...prevData, values]);
        notification.success({ message: 'Product added successfully' });
      })
      .catch(error => {
        console.error('Error adding product:', error);
        notification.error({ message: 'Failed to add product' });
      });
    console.log(values);
  
    setIsAddModalVisible(false);
    form.resetFields();
  };
  

  const handleEditSubmit = (values) => {
    const updatedRow = { ...currentRow, ...values };
    axios.put(`https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products/${currentRow.productId}`, updatedRow)
      .then(response => {
        setData((prevData) =>
          prevData.map((item) =>
            item.productId === updatedRow.productId ? { ...item, ...updatedRow } : item
          )
        );
        notification.success({ message: 'Product updated successfully' });
      })
      .catch(error => {
        console.error('Error updating product:', error);
        notification.error({ message: 'Failed to update product' });
      });
  
    setIsEditModalVisible(false);
  };
  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'productCode',
        header: 'Code',
        size: 10,
      },
      {
        accessorKey: 'productName',
        header: 'Name',
        size: 15,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 15,
      },
      {
        accessorKey: 'weight',
        header: 'Gold weight',
        size: 15,
      },
      {
        accessorKey: 'unitPrice',
        header: 'Unit price',
        size: 15,
      },
      {
        accessorKey: 'costPrice',
        header: 'Cost price',
        size: 15,
      },
      {
        accessorKey: 'isJewelry',
        header: 'Jewelry',
        size: 15,
        Cell: ({ row }) => (row.original.isJewelry ? 'True' : 'False'),
      },
      {
        accessorKey: 'isGold',
        header: 'Gold',
        size: 15,
        Cell: ({ row }) => (row.original.isGold ? 'True' : 'False'),
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
  title="Edit Product"
  visible={isEditModalVisible}
  onCancel={() => setIsEditModalVisible(false)}
  onOk={() => editForm.submit()}
  style={{ backgroundColor: '#f0f0f0' }}
  width={800}
>
  <Form
    form={editForm}
    layout="vertical"
    onFinish={handleEditSubmit}
    initialValues={currentRow}
    style={{ backgroundColor: 'white', padding: '20px' }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="productCode"
          label="Product Code"
          rules={[{ required: true, message: 'Product Code required' }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Product Name required' }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Category required' }]}
        >
          <Select placeholder="Select a category">
            <Select.Option value="Rings">Rings</Select.Option>
            <Select.Option value="Earrings">Earrings</Select.Option>
            <Select.Option value="Necklaces">Necklaces</Select.Option>
            <Select.Option value="Bracelets">Bracelets</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="unitPrice"
          rules={[{ required: true, message: 'Unit Price required' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="costPrice"
          label="Cost Price"
          rules={[{ required: true, message: 'Cost Price required' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="weight"
          label="Gold Weight"
          rules={[{ required: true, message: 'Gold Weight required' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="isJewelry"
          label="Is Jewelry"
          rules={[{ required: true, message: 'Is Jewelry required' }]}
        >
          <Select>
            <Select.Option value={true}>True</Select.Option>
            <Select.Option value={false}>False</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="isGold"
          label="Is Gold"
          rules={[{ required: true, message: 'Is Gold required' }]}
        >
          <Select>
            <Select.Option value={true}>True</Select.Option>
            <Select.Option value={false}>False</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Description required' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>



<Modal
  title="Add Product"
  visible={isAddModalVisible}
  onCancel={() => setIsAddModalVisible(false)}
  onOk={() => form.submit()}
  style={{ backgroundColor: '#f0f0f0' }}
  width={800}
>
  <Form
    form={form}
    layout="vertical"
    onFinish={handleAddSubmit}
    style={{ backgroundColor: 'white', padding: '20px' }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="productCode"
          label="Product Code"
          rules={[{ required: true, message: 'Product Code required' }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[{ required: true, message: 'Product Name required' }]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Category required' }]}
        >
          <Select placeholder="Select a category">
            <Select.Option value="Rings">Rings</Select.Option>
            <Select.Option value="Earrings">Earrings</Select.Option>
            <Select.Option value="Necklaces">Necklaces</Select.Option>
            <Select.Option value="Bracelets">Bracelets</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="unitPrice"
          label="Unit Price"
          rules={[{ required: true, message: 'Unit Price required' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="costPrice"
          label="Cost Price"
          rules={[{ required: true, message: 'Cost Price required' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="weight"
          label="Gold Weight"
          rules={[{ required: true, message: 'Gold Weight required' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="isJewelry"
          label="Is Jewelry"
          rules={[{ required: true, message: 'Is Jewelry required' }]}
        >
          <Select>
            <Select.Option value={true}>True</Select.Option>
            <Select.Option value={false}>False</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="isGold"
          label="Is Gold"
          rules={[{ required: true, message: 'Is Gold required' }]}
        >
          <Select>
            <Select.Option value={true}>True</Select.Option>
            <Select.Option value={false}>False</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Description required' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>


    </div>
  );
};

export default Product;
