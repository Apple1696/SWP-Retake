import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import './OrderReport.css';
import handleRedirect from './../../HandleFunction/handleRedirect';

const OrderReport = () => {

  const [data, setData] = useState([]);
  const { createOrder } = handleRedirect();


  useEffect(() => {
    axios.get('https://6678e6e40bd452505620352b.mockapi.io/Order')
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
        accessorKey: 'customer',
        header: 'Customer',
        size: 100,
      },
      {
        accessorKey: 'staff',
        header: 'Staff',
        size: 100,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
      },
      {
        accessorKey: 'counter',
        header: 'Counter',
        size: 100,
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

  return (
    <div>
      <h1>Order Report</h1>
     
        <button className="create-order-button" onClick={createOrder}>
          Create New Order
        </button>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default OrderReport;