import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faAddressCard, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentPage = (props) => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const totalAmount = locationState ? locationState.totalAmount : 0;
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    username: '',
    address: '',
    phoneNumber: '',
    totalAmount: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'cardNumber') {
      // Remove non-digit characters from the input value
      const newValue = value.replace(/\D/g, '');
  
      // Format the value in groups of 4 digits with hyphens
      const formattedValue = newValue
        .replace(/(\d{4})(?=\d)/g, '$1-')
        .substring(0, 19); // Limit to 19 characters including hyphens
  
      setFormData(prevState => ({
        ...prevState,
        [name]: formattedValue
      }));
    } else {
      // For other inputs, update the state normally
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.cardNumber.replace(/\D/g, '').length !== 16) {
      setError('Card number must be 16 digits long.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      setError('Expiry date must be in MM/YY format.');
      return;
    }
    if (formData.cvv.replace(/\D/g, '').length !== 3) {
      setError('CVV must be 3 digits long.');
      return;
    }
    setError('');
    try {
      const paymentRef = collection(firestore, 'payments');
      await addDoc(paymentRef, {
        ...formData,
        totalAmount: { totalAmount },
        timestamp: new Date().toISOString()
      });
      console.log('Payment data saved successfully');
      setSuccessMessage('Payment successful.');
      clearForm();
    } catch (error) {
      console.error('Error saving payment data:', error);
    }
  };

  const clearForm = () => {
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      username: '',
      address: '',
      phoneNumber: '',
      totalAmount: 0,
    });
  };

  const handleBackToShopping = () => {
    localStorage.removeItem('cartItems');
    setRedirectToProducts(true);
  };

  if (redirectToProducts) {
    navigate("/productpage")
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundImage: `url('https://th.bing.com/th/id/R.f4657afbe00df02f1ff2602251312148?rik=go2XJgIAsUHpGA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2foePE9lU.jpg&ehk=C0Gkc0e39yEuSYiHUy%2fiEOonYr8%2bdTbHkJWvCd8y7to%3d&risl=&pid=ImgRaw&r=0')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="container p-4" style={{ maxWidth: '400px' }}>
        <h2 className="text-center text-white mb-4">Payment</h2>
        <form onSubmit={handleSubmit}>
          {successMessage && <p className="text-success">{successMessage}</p>}
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label text-white">
              <FontAwesomeIcon icon={faCreditCard} />
              &nbsp; Card Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={19} // Maximum length for formatted card number
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label text-white">
              <FontAwesomeIcon icon={faAddressCard} />
              &nbsp; Expiry Date (MM/YY):
            </label>
            <input
              type="text"
              className="form-control"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              maxLength={5} // Maximum length for expiry date
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label text-white">
              <FontAwesomeIcon icon={faPhone} />
              &nbsp; CVV:
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              maxLength={3} // Maximum length for CVV
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">
              <FontAwesomeIcon icon={faUser} />
              &nbsp; Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label text-white">
              <FontAwesomeIcon icon={faAddressCard} />
              &nbsp; Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label text-white">
              <FontAwesomeIcon icon={faPhone} />
              &nbsp; Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary">Pay {totalAmount}Rs</button>
          </form>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={handleBackToShopping}
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

