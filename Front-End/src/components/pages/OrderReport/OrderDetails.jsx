import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Typography, List } from 'antd';

const { Title, Text } = Typography;

const OrderDetails = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Orders?orderNumber=${orderNumber}`)
      .then((response) => {
        if (response.data.length > 0) {
          setOrder(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching order details: ', error);
      });
  }, [orderNumber]);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Card title={`Order Details: ${order.orderNumber}`} bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={4}>Order Information</Title>
            <Text strong>Order Number:</Text> {order.orderNumber}<br />
            <Text strong>Customer ID:</Text> {order.customerId}<br />
            <Text strong>Total Amount:</Text> ${order.totalAmount}<br />
            <Text strong>Final Amount:</Text> ${order.finalAmount}<br />
            <Text strong>Payment Method:</Text> {order.paymentMethod}<br />
            <Text strong>Status:</Text> {order.status}<br />
          </Col>
          <Col span={12}>
            <Title level={4}>Order Items</Title>
            <List
              bordered
              dataSource={order.orderItems}
              renderItem={item => (
                <List.Item>
                  <Text strong>Product ID:</Text> {item.productId} <br />
                  <Text strong>Quantity:</Text> {item.quantity} <br />
                  <Text strong>Unit Price:</Text> ${item.unitPrice} <br />
                  <Text strong>Final Price:</Text> ${item.finalPrice}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OrderDetails;
