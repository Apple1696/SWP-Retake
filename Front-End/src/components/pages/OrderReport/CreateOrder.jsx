import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import handleRedirect from './../../HandleFunction/handleRedirect';

const { Option } = Select;

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([{ productCode: '', unitPrice: '' }]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCustomer) {
      fetchCustomerById(selectedCustomer);
    }
  }, [selectedCustomer]);

  const fetchCustomersByFullName = async (fullName) => {
    try {
      const response = await axios.get(`https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Customers`);
      const filteredCustomers = response.data.filter(customer =>
        customer.fullName.toLowerCase().includes(fullName.toLowerCase())
      );
      setCustomers(filteredCustomers);
    } catch (error) {
      console.error('Error fetching customers by full name:', error);
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
    setSelectedCustomer(value);
  };

  const handleProductSearch = async (value, index) => {
    if (value) {
      try {
        const response = await axios.get(`https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Products?search=${value}`);
        const product = response.data[0];
        if (product) {
          const newOrderItems = [...orderItems];
          newOrderItems[index].productCode = product.productCode;
          newOrderItems[index].unitPrice = product.unitPrice;
          setOrderItems(newOrderItems);
        }
      } catch (error) {
        console.error('Error fetching product by code:', error);
      }
    }
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { productCode: '', unitPrice: '' }]);
  };

  const removeOrderItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const handleSubmit = async (values) => {
    const newOrder = {
      customerId: selectedCustomer,
      orderItems: orderItems.map(item => ({
        productCode: item.productCode,
        unitPrice: item.unitPrice,
      })),
      // Add any other necessary fields here
    };
    try {
      await axios.post('https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Orders', newOrder);
      // Handle successful order creation, e.g., show a notification, reset form, etc.
      form.resetFields();
      setOrderItems([{ productCode: '', unitPrice: '' }]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const { cancelOrder } = handleRedirect();

  return (
    <>
      <h3>Create Order</h3>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Customer Full Name" name="fullName" >
          <Select
            showSearch
            placeholder="Search customer full name"
            onSearch={handleCustomerSearch}
            onChange={handleCustomerChange}
            filterOption={false}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              borderColor: '#ccc',
              height: '40px',
              fontSize: '16px'
            }}
          >
            {customers.map(customer => (
              <Option key={customer.id} value={customer.id}>{customer.fullName}</Option>
            ))}
          </Select>
        </Form.Item>

        <div>
          <h3>Order Items</h3>
          {orderItems.map((item, index) => (
            <div key={index} style={{
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px'
            }}>
              <h4 style={{
                marginBottom: '10px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>Item {index + 1}</h4>
              <Form.Item label="Product Code" name={`productCode_${index}`} rules={[{ required: true, message: 'Please enter a product code!' }]}>
                <Select
                  showSearch
                  placeholder="Search product code"
                  onSearch={(value) => handleProductSearch(value, index)}
                  filterOption={false}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    borderColor: '#ccc',
                    height: '40px',
                    fontSize: '16px'
                  }}
                >
                  <Option value={item.productCode}>{item.productCode}</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Unit Price" name={`unitPrice_${index}`}>
                <Input
                  value={item.unitPrice}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    borderColor: '#ccc',
                    height: '40px',
                    fontSize: '16px'
                  }}
                />
              </Form.Item>
              <Button type="danger" onClick={() => removeOrderItem(index)} style={{
                width: '100%',
                backgroundColor: '#f5222d',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}>
                Remove
              </Button>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={addOrderItem} style={{
              width: '30%',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              Add another
            </Button>
            <Button type="primary" htmlType="submit" style={{
              width: '30%',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              Create Order
            </Button>
            <Button type="primary" onClick={cancelOrder} style={{
              width: '30%',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
