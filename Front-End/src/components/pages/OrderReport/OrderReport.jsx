import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import './OrderReport.css';

const OrderReport = () => {
  
  const [data, setData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newOrder, setNewOrder] = useState({
    order_id: '',
    full_name: '',
    phone_number: '',
    total: '',
    date: '',
    status: '',
  });

  useEffect(() => {
    axios.get('https://666efd61f1e1da2be521af94.mockapi.io/Order')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'order_id',
        header: 'Order ID',
        size: 100,
      },
      {
        accessorKey: 'full_name',
        header: 'Customer Name',
        size: 200,
      },
      {
        accessorKey: 'phone_number',
        header: 'Contact',
        size: 150,
      },
      {
        accessorKey: 'total',
        header: 'Total',
        size: 100,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  const handleCreateOrder = () => {
    setIsCreating(true);
  };

  const handleCancelCreateOrder = () => {
    setIsCreating(false);
    setNewOrder({
      order_id: '',
      full_name: '',
      phone_number: '',
      total: '',
      date: '',
      status: '',
    });
  };

  const handleSaveNewOrder = () => {
    axios.post('https://666efd61f1e1da2be521af94.mockapi.io/Order', newOrder)
      .then((response) => {
        setData([...data, response.data]);
        setIsCreating(false);
        setNewOrder({
          order_id: '',
          full_name: '',
          phone_number: '',
          total: '',
          date: '',
          status: '',
        });
      })
      .catch((error) => {
        console.error('Error creating new order: ', error);
      });
  };

  const handleInputChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Order Report</h1>
      {isCreating ? (
        <div className="create-order-modal">
          <h2>Create New Order</h2>
          <form>
            <label>Order ID:</label>
            <input
              type="text"
              name="order_id"
              value={newOrder.order_id}
              onChange={handleInputChange}
            />
            <br />
            <label>Customer Name:</label>
            <input
              type="text"
              name="full_name"
              value={newOrder.full_name}
              onChange={handleInputChange}
            />
            <br />
            <label>Contact:</label>
            <input
              type="text"
              name="phone_number"
              value={newOrder.phone_number}
              onChange={handleInputChange}
            />
            <br />
            <label>Total:</label>
            <input
              type="text"
              name="total"
              value={newOrder.total}
              onChange={handleInputChange}
            />
            <br />
            <label>Date:</label>
            <input
              type="text"
              name="date"
              value={newOrder.date}
              onChange={handleInputChange}
            />
            <br />
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={newOrder.status}
              onChange={handleInputChange}
            />
            <br />
            <button className="save-button" onClick={handleSaveNewOrder}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelCreateOrder}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button className="create-order-button" onClick={handleCreateOrder}>
          Create New Order
        </button>
      )}
      <MaterialReactTable table={table} />
    </div>
  );
};

export default OrderReport;