import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './OrderReport.css';
import handleRedirect from './../../HandleFunction/handleRedirect';
import Sidebar from '../../AllRoutes/Sidebar';

const OrderReport = () => {
  const [data, setData] = useState([]);
  const { createOrder } = handleRedirect();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios.get('https://jewquelry-group4-ewb0dqgndchcc0cm.eastus-01.azurewebsites.net/api/Orders')
      .then((response) => {
        const flattenedData = response.data.map(order => ({
          ...order,
          orderItems: order.orderItems.map(item => ({
            ...item,
            orderId: order.orderId,
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            totalAmount: order.totalAmount,
            finalAmount: order.finalAmount,
            paymentMethod: order.paymentMethod,
            status: order.status
          }))
        }));

        const flatRows = flattenedData.flatMap(order => 
          order.orderItems.map(item => ({
            orderId: order.orderId,
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            totalAmount: order.totalAmount,
            finalAmount: order.finalAmount,
            paymentMethod: order.paymentMethod,
            status: order.status,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            finalPrice: item.finalPrice
          }))
        );

        setData(flatRows);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleOrderNumberClick = (orderNumber) => {
    navigate(`/order-details/${orderNumber}`); // Redirect to OrderDetails page
  };

  const handlePaymentClick = (orderId) => {
    navigate(`/payment/${orderId}`);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'Order Number',
        size: 100,
        Cell: ({ cell }) => (
          <Button
            variant="text"
            onClick={() => handleOrderNumberClick(cell.getValue())}
          >
            {cell.getValue()}
          </Button>
        ),
      },
      {
        accessorKey: 'customerName',
        header: 'Customer Name',
        size: 150, // Adjust size as needed
      },
      {
        accessorKey: 'totalAmount',
        header: 'Total Price',
        size: 150,
      },
      {
        accessorKey: 'finalAmount',
        header: 'Final Price',
        size: 100,
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment Method',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
      },
      {
        id: 'actions',
        header: 'Action',
        size: 150,
        Cell: ({ row }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePaymentClick(row.original.orderId)}
          >
            Payment
          </Button>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <Sidebar>
      <h1>Order Report</h1>
      <button className="create-order-button" onClick={createOrder}>
        Create New Order
      </button>
      <MaterialReactTable table={table} />
    </Sidebar>
  );
};

export default OrderReport;
