import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';

const EditPromotion = ({ isVisible, onClose, rowData, updateData }) => {
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
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <div>
        <label>Price: </label>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter new price"
        />
      </div>
      <div>
        <label>Quantity: </label>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter new quantity"
        />
      </div>
    </Modal>
  );
};

export default EditPromotion;
