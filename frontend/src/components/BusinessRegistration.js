import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BusinessRegistration = () => {
  const [business, setBusiness] = useState({
    category: '',
    businessName: '',
    username: '',
    phoneNumber: '',
    email: '',
    shopAddress: '',
    shopWebsite: '',
    shopDescription: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness({ ...business, [name]: value });
  };

  const registerBusiness = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/businesses/register', business);
      console.log(response.data);
      alert('Business registered successfully');

      // Redirect to business profile page using the ObjectId returned from the server
      navigate(`/business/${response.data._id}`);
    } catch (error) {
      console.error(error);
      alert('Error registering business: ' + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div>
      <h2>Business Registration</h2>
      <form onSubmit={registerBusiness}>
        {/* Category Selection */}
        <div>
          <label>Category:</label>
          <select name="category" value={business.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {/* Add all business categories */}
            <option value="Cyber Cafe">Cyber Cafe</option>
            <option value="Tech Shop">Tech Shop</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Other input fields */}
        <div>
          <label>Business Name:</label>
          <input type="text" name="businessName" value={business.businessName} onChange={handleChange} required />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={business.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={business.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={business.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Shop Address:</label>
          <input type="text" name="shopAddress" value={business.shopAddress} onChange={handleChange} required />
        </div>
        <div>
          <label>Shop Website:</label>
          <input type="url" name="shopWebsite" value={business.shopWebsite} onChange={handleChange} />
        </div>
        <div>
          <label>Shop Description:</label>
          <textarea name="shopDescription" value={business.shopDescription} onChange={handleChange} required></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit">Register Business</button>
      </form>
    </div>
  );
};

export default BusinessRegistration;