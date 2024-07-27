import React from 'react';
import { MaterialReactTable } from 'material-react-table';

const CustomTable = ({ columns, data }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      zIndex={0} // add this prop to set the z-index of the table
    />
  );
};

export default CustomTable;
