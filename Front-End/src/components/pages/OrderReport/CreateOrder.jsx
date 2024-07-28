import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [counters, setCounters] = useState([]);
  
  const fetchCustomers = async (query) => {
    const response = await axios.get(`https://66a4b40a5dc27a3c19099545.mockapi.io/Customer?search=${query}`);
    setCustomers(response.data);
  };

  const handleCustomerSearch = (value) => {
    if (value) {
      fetchCustomers(value);
    } else {
      setCustomers([]);
    }
  };

  // Assume fetchPromotions and fetchCounters will be similar to fetchCustomers
  const fetchPromotions = async (query) => {
    // Fetch promotions from the API
  };

  const fetchCounters = async (query) => {
    // Fetch counters from the API
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Order Type" name="orderType" rules={[{ required: true, message: 'Please select an order type!' }]}>
        <Select placeholder="Select order type">
          <Option value="rebuy">Rebuy</Option>
          <Option value="sell">Sell</Option>
        </Select>
      </Form.Item>
      
      <Form.Item label="Customer" name="customer" rules={[{ required: true, message: 'Please select a customer!' }]}>
        <Select
          showSearch
          placeholder="Search customer"
          onSearch={handleCustomerSearch}
          filterOption={false}
        >
          {customers.map(customer => (
            <Option key={customer.id} value={customer.name}>
              {customer.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      
      <Form.Item label="Promotion" name="promotion">
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
      </Form.Item>
      
      <Form.Item label="Counter" name="counter">
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
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Order
        </Button>
      </Form.Item>
    </Form>
  );
}
