import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';
import handleRedirect from './../../HandleFunction/handleRedirect';

const { Option } = Select;

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [counters, setCounters] = useState([]);
  const [orderItems, setOrderItems] = useState([{ id: '', price: '' }]);

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

  const {cancelOrder}= handleRedirect();
  return (
    <>
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
      </Form>

      <Form layout="vertical">
        <div>
          <h3>Order Items</h3>
          {orderItems.map((item, index) => (
            <div key={index}>
              <Form.Item label="Item ID" name={`itemId_${index}`} rules={[{ required: true, message: 'Please enter an item ID!' }]}>
                <Select
                  showSearch
                  placeholder="Search item ID"
                  onSearch={(value) => handleItemSearch(value, index)}
                  filterOption={false}
                >
                  <Option value={item.id}>{item.id}</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Unit Price" name={`unitPrice_${index}`}>
                <Input value={item.price} readOnly />
              </Form.Item>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={addOrderItem} style={{ width: '50%' }}>
              Add another
            </Button>
            <Button type="primary" htmlType="submit" style={{ width: '50%', marginLeft: '10px' }}>
              Create Order
            </Button>
          </div>
        </div>
      </Form>
      <br/>
      <Button type="primary" onClick={cancelOrder} style={{ width: '50%' }}>
              Cancel
            </Button>
    </>
  );
}
