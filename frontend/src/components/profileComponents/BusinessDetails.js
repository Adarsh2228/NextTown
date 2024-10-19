import React from 'react';

const BusinessDetails = ({ business }) => {
  return (
    <div>
      <h2>{business.businessName}</h2>
      <p>Category: {business.category}</p>
      <p>Username: {business.username}</p>
      <p>Phone Number: {business.phoneNumber}</p>
      <p>Email: {business.email}</p>
      <p>Address: {business.shopAddress}</p>
    </div>
  );
};

export default BusinessDetails;