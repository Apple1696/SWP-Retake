import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';

const EditProduct = ({ isVisible, onClose, rowData, updateData }) => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (rowData) {
      setPrice(rowData.city); // Assuming 'city' is used as 'Price'
      setQuantity(rowData.state); // Assuming 'state' is used as 'Quantity'
    }
  }, [rowData]);

  const handleSave = () => {
    updateData({
      ...rowData,
      city: price,
      state: quantity,
    });
    onClose();
  };

  return (
    <Modal
      title="Edit Item"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} style={{ backgroundColor: 'black', color: 'white' }}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} style={{ backgroundColor: 'black', color: 'white' }}>
          Save
        </Button>,
      ]}
      style={{ backgroundColor: '#f0f0f0' }}
    >
      <div style={{ marginBottom: '10px' }}>
        <label style={{ color: 'black' }}>Price: </label>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter new price"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ color: 'black' }}>Quantity: </label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter new quantity"
          style={{ width: '100%' }}
        />
      </div>
    </Modal>
  );
};

export default EditProduct;