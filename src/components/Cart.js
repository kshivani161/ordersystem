import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedCartItems);
    } catch (error) {
      console.error('Error retrieving cart items from localStorage:', error);
      // Optionally display a user-friendly error message
    }
  }, []);
 
  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
 
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      return; // Prevent negative or zero quantities (optional)
    }
    if(newQuantity>cartItems[index].rating.count){
      alert("Product is Out Of Stock Please Try Again Later");
      navigate("/productpage");
    }
 
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };
 
  const incrementQuantity = (index) => {
    updateQuantity(index, cartItems[index].quantity + 1);
  };
 
  const decrementQuantity = (index) => {
    updateQuantity(index, cartItems[index].quantity - 1);
  };
 
  const calculateTotal = () => {
    if (cartItems.length === 0) {
      return 0;
    }
 
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      const itemQuantity = parseInt(item.quantity);
      return total + (itemPrice * itemQuantity);
    }, 0);
  };
 
  const handleCheckout = () => {
    // Save cart items to local storage for retrieval on the payment page
    localStorage.setItem('cartItemsForCheckout', JSON.stringify(cartItems));
   
    // Pass the total amount as a query parameter to the payment page
    navigate('/payment', { state: { totalAmount: calculateTotal() } });
  };
 
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cartItems.map((item, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <p>{item.title}</p>
                <img src={item.image} alt={item.title} style={{ maxWidth: '50px' }} />
                <p>Price: ₹{item.price}/-</p>
                <p>Available Products:{item.rating.count}</p>
                <p>Quantity:
                  <button onClick={() => decrementQuantity(index)}>-</button>
                  {item.quantity}
                  <button onClick={() => incrementQuantity(index)}>+</button>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </p>
              </div>
            ))}
          </div>
          <p>Total: ₹{calculateTotal()}/-</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};
 
export default Cart;