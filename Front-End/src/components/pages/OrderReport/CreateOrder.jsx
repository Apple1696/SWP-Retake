import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import handleRedirect from './../../HandleFunction/handleRedirect';

const { Option } = Select;

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [counters, setCounters] = useState([]);
  const [orderItems, setOrderItems] = useState([{ id: '', price: '' }]);

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

  const fetchPromotions = async (query) => {
    // Fetch promotions from the API
  };

  const fetchCounters = async (query) => {
    // Fetch counters from the API
  };

  const handleItemSearch = async (value, index) => {
    if (value) {
      const response = await axios.get(`https://66a4b40a5dc27a3c19099545.mockapi.io/Item?search=${value}`);
      const item = response.data[0];
      if (item) {
        const newOrderItems = [...orderItems];
        newOrderItems[index].id = item.id;
        newOrderItems[index].price = item.price;
        setOrderItems(newOrderItems);
      }
    }
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { id: '', price: '' }]);
  };

  const removeOrderItem = (index) => {
    const newOrderItems = [...orderItems];
    newOrderItems.splice(index, 1);
    setOrderItems(newOrderItems);
  };

  const { cancelOrder } = handleRedirect();

  return (
    <>
      <Form layout="vertical">
        

        <Form.Item label="Customer" name="customer" rules={[{ required: true, message: 'Please select a customer!' }]}>
          <Select
            showSearch
            placeholder="Search customer"
            onSearch={handleCustomerSearch}
            onChange={handleCustomerChange}
            filterOption={false}

          >
            {customers.map(customer => (
              <Option key={customer.id} value={customer.id}>
                {customer.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* <Form.Item label="Promotion" name="promotion">
          <Select
            showSearch
            placeholder="Search promotion"
            onSearch={fetchPromotions}
            filterOption={false}
          >
            {promotions.map(promotion => (
              <Option key={promotion.id} value={promotion.name}>
                {promotion.name}
              </Option>
            ))}
          </Select>
        </Form.Item> */}

        {/* <Form.Item label="Counter" name="counter">
          <Select
            showSearch
            placeholder="Search counter"
            onSearch={fetchCounters}
            filterOption={false}
          >
            {counters.map(counter => (
              <Option key={counter.id} value={counter.name}>
                {counter.name}
              </Option>
            ))}
          </Select>
        </Form.Item> */}
      </Form>

      <Form layout="vertical">
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
        <Form.Item label="Item ID" name={`itemId_${index}`} rules={[{ required: true, message: 'Please enter an item ID!' }]}>
          <Select
            showSearch
            placeholder="Search item ID"
            onSearch={(value) => handleItemSearch(value, index)}
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
            <Option value={item.id}>{item.id}</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Unit Price" name={`unitPrice_${index}`}>
          <Input
            value={item.price}
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
