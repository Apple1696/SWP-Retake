import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const OrderReport = () => {
  const [data, setData] = useState([]);

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

  return (
    <div>
      <h1>Order Report</h1>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default OrderReport;
