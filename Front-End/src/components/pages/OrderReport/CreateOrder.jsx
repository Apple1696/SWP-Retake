import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import handleRedirect from './../../HandleFunction/handleRedirect';

const { Option } = Select;

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCustomer) {
      // Placeholder function to fetch customer details if needed
    }
  }, [selectedCustomer]);

  const fetchCustomersByFullName = async (fullName) => {
    try {
      const response = await axios.get('https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Customers');
      const filteredCustomers = response.data.filter(customer =>
        customer.fullName.toLowerCase().includes(fullName.toLowerCase())
      );
      setCustomers(filteredCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const handleCustomerSearch = (value) => {
    if (value) {
      fetchCustomersByFullName(value);
    } else {
      setCustomers([]);
    }
  };

  const handleCustomerChange = (value) => {
    console.log('Selected Customer ID:', value);  // Log the selected value
    setSelectedCustomer(value);
  };

  const fetchProducts = async (searchTerm) => {
    try {
      const response = await axios.get(`https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products?search=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductSearch = (value) => {
    fetchProducts(value);
  };

  const handleProductChange = (value, field) => {
    form.setFieldsValue({
      orderItems: form.getFieldValue('orderItems').map((item, index) =>
        index === field.name ? { ...item, productId: value } : item
      )
    });
  };

  const handleSubmit = async (values) => {
    const newOrder = {
      orderNumber: values.orderNumber,
      customerId: selectedCustomer,
      paymentMethod: values.paymentMethod,
      updatedAt: new Date().toISOString(),
      orderItems: values.orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        updatedAt: new Date().toISOString(),
      })),
    };
    try {
      const response = await axios.post('https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Orders/vnpay', newOrder);
      const paymentUrl = response.data.url;
      window.open(paymentUrl, '_blank');
      form.resetFields();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const { cancelOrder } = handleRedirect();

  return (
    <>
      <h3>Create Order</h3>
      <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ orderItems: [{ productId: '', quantity: 1 }] }}>
        <Form.Item
          label="Order Number"
          name="orderNumber"
          rules={[{ required: true, message: 'Please enter the order number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: 'Please enter the payment method!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <span style={{ marginRight: 10 }}>Customer Full Name:</span>
          <Select
            showSearch
            placeholder="Search customer full name"
            onSearch={handleCustomerSearch}
            onChange={handleCustomerChange}
            filterOption={false}
            style={{ width: '100%', maxWidth: '400px' }}
            dropdownStyle={{ borderBottom: '1px solid #ccc', padding: '5px' }}
          >
            {customers.map(customer => (
              <Option key={customer.customerId} value={customer.customerId}>{customer.fullName}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.List name="orderItems">
          {(fields, { add, remove }) => (
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ marginRight: '10px' }}>Order Items</h3>
                <Button
                  type="primary"
                  onClick={() => add()}
                  icon={<FaPlus />}
                  style={{ marginBottom: '10px' }}
                >
                  Add Item
                </Button>
              </div>
              {fields.map((field, index) => (
                <div key={field.key} style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>Item {index + 1}</h4>
                    <Button
                      type="danger"
                      onClick={() => remove(field.name)}
                      icon={<FaMinus />}
                      style={{ marginBottom: '10px' }}
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Item
                    {...field}
                    label="Product Code"
                    name={[field.name, 'productId']}
                    fieldKey={[field.fieldKey, 'productId']}
                    rules={[{ required: true, message: 'Please select a product code!' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Search product code"
                      onSearch={handleProductSearch}
                      onChange={(value) => handleProductChange(value, field)}
                      filterOption={false}
                      style={{ width: '100%' }}
                    >
                      {products.map(product => (
                        <Option key={product.productId} value={product.productId}>{product.productCode}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Quantity"
                    name={[field.name, 'quantity']}
                    fieldKey={[field.fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Please enter a quantity!' }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '10px' }}
          >
            Create Order
          </Button>
          <Button
            type="default"
            onClick={cancelOrder}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
}
