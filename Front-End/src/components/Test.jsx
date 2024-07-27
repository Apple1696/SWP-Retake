import React, { useState } from 'react';

const Test = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddNewCustomer = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit the form data here
    console.log('Form submitted:', { fullName, location, phoneNumber });
    handleModalClose();
  };

  return (
    <div>
      <button onClick={handleAddNewCustomer}>Add new customer</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="submit">Add Customer</button>
            </form>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;