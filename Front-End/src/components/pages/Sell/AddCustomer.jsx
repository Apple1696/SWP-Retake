import { Form, Input, Modal } from 'antd';
import React from 'react';

const AddCustomer = ({ isVisible, onClose, onAddCustomer }) => {
  const [form] = Form.useForm();

  const handleAddSubmit = (values) => {
    console.log('Form values:', values);
    // Add the new customer
    onAddCustomer(values);
    // Close the modal
    onClose();
    // Clear the form
    form.resetFields();
  };

  return (
    <Modal
      title="Add New Customer"
      visible={isVisible}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddSubmit}
      >
        <Form.Item
          name="full_name"
          label="Enter full name"
          rules={[{ required: true, message: 'Please input the customer name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Enter phone number"
          rules={[{ required: true, message: 'Please input the contact info!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="location"
          label="Enter location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="point"
          label="Enter point"
          rules={[{ required: true, message: 'Please input the point!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="promotion_id"
          label="Enter promotion ID"
          rules={[{ required: true, message: 'Please input the promotion ID!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomer;
