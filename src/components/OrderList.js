import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const OrderList = () => {
  const [cartItemsForCheckout, setCartItemsForCheckout] = useState([]);
  const navigate = useNavigate(); 
 
  useEffect(() => {
    const storedCartItemsForCheckout = JSON.parse(localStorage.getItem('cartItemsForCheckout')) || [];
    setCartItemsForCheckout(storedCartItemsForCheckout);
  }, []);
 
  const handleTrackClick = () => {
    navigate(`/trackdetails`); 
  };
 
  return (
    <div>
      <h1>Order List</h1>
      {cartItemsForCheckout.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          <h2>Order ID: #{Math.floor(Math.random() * 1000000)}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={item.image} alt={item.title} style={{ maxWidth: '50px' }} />
            <div>
              <p>Title: {item.title}</p>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
          <button onClick={() => handleTrackClick()}>Track</button>
        </div>
      ))}
    </div>
  );
};
 
export default OrderList;