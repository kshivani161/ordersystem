import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const updateQuantity = (index, newQuantity) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = newQuantity;
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const incrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const decrementQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
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
        // Redirect to the payment page
        navigate('/payment');
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

// import React, { useState, useEffect } from 'react';

// const Cart = () => {
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//         setCartItems(storedCartItems);
//     }, []);

//     const removeFromCart = (index) => {
//         const updatedCartItems = [...cartItems];
//         updatedCartItems.splice(index, 1);
//         setCartItems(updatedCartItems);
//         localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//     };

//     const updateQuantity = (index, newQuantity) => {
//         const updatedCartItems = [...cartItems];
//         updatedCartItems[index].quantity = newQuantity;
//         setCartItems(updatedCartItems);
//         localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//     };

//     const incrementQuantity = (index) => {
//         const updatedCartItems = [...cartItems];
//         updatedCartItems[index].quantity += 1;
//         setCartItems(updatedCartItems);
//         localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//     };

//     const decrementQuantity = (index) => {
//         const updatedCartItems = [...cartItems];
//         if (updatedCartItems[index].quantity > 1) {
//             updatedCartItems[index].quantity -= 1;
//             setCartItems(updatedCartItems);
//             localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
//         }
//     };

//     const calculateTotal = () => {
//         if (cartItems.length === 0) {
//             return 0; 
//         }

//         return cartItems.reduce((total, item) => {
//             const itemPrice = parseFloat(item.price);
//             const itemQuantity = parseInt(item.quantity); 
//             return total + (itemPrice * itemQuantity);
//         }, 0);
//     };

//     return (
//         <div>
//             <h1>Cart</h1>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                         {cartItems.map((item, index) => (
//                             <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                                 <img src={item.image} alt={item.title} style={{ maxWidth: '50px' }} />
//                                 <div>
//                                     <p>{item.title}</p>
//                                     <p>Price: ₹{item.price}/-</p>
//                                     <p>Quantity: 
//                                         <button onClick={() => decrementQuantity(index)}>-</button>
//                                         {item.quantity}
//                                         <button onClick={() => incrementQuantity(index)}>+</button>
//                                     </p>
//                                     <button onClick={() => removeFromCart(index)}>Remove</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <p>Total: ₹{calculateTotal()}/-</p>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Cart;
