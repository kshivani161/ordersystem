import React, { useState } from 'react';

const PaymentPage = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [paymentOption, setPaymentOption] = useState('');
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
 
    const handlePayment = () => {
        if (!name || !phoneNumber || !email || !location || !landmark || !pincode || !paymentOption) {
            setError('Please fill in all address details and select a payment option.');
            return;
        }
    
        if (paymentOption === 'UPI' && !upiId) {
            setError('Please fill in your UPI ID.');
            return;
        }
    
        if (paymentOption === 'Card' && (!cardNumber || !expiryDate || !cvv)) {
            setError('Please fill in your card details.');
            return;
        }
    
        // Simulating payment processing
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
    
            // Clear cart items after successful payment
            localStorage.removeItem('cartItems');
        }, 2000);
    };
    
 
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Payment Page</h1>
            <form style={styles.form}>
                {/* Address Details */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    style={styles.input}
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Landmark"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Pincode"
                    style={styles.input}
                />
 
                {/* Payment Options */}
                <h2 style={styles.paymentHeading}>Payment Options</h2>
                <div style={styles.paymentOptions}>
                    <label>
                        <input
                            type="radio"
                            value="COD"
                            onChange={() => setPaymentOption('COD')}
                            checked={paymentOption === 'COD'}
                        />
                        Cash on Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="UPI"
                            onChange={() => setPaymentOption('UPI')}
                            checked={paymentOption === 'UPI'}
                        />
                        UPI
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Card"
                            onChange={() => setPaymentOption('Card')}
                            checked={paymentOption === 'Card'}
                        />
                        Card
                    </label>
                </div>
 
                {/* UPI ID input */}
                {paymentOption === 'UPI' && (
                    <>
                        <h3 style={styles.upiHeading}>UPI Payment Options</h3>
                        <select
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            style={styles.input}
                        >
                            <option value="">Select UPI Provider</option>
                            <option value="gpay">Google Pay (GPay)</option>
                            <option value="phonepe">PhonePe</option>
                            <option value="paytm">Paytm</option>
                        </select>
                    </>
                )}
 
                {/* Card Details */}
                {paymentOption === 'Card' && (
                    <>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Card Number"
                            style={styles.input}
                        />
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="Expiry Date"
                            style={styles.input}
                        />
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="CVV"
                            style={styles.input}
                        />
                    </>
                )}
 
                {/* Payment Button */}
                <button
                    type="button"
                    onClick={handlePayment}
                    style={{ ...styles.payNowButton, backgroundColor: loading ? '#ccc' : '#007bff' }}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
 
                {/* Error and Success Messages */}
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>Payment successful!</p>}
                
            </form>
        </div>
    );
};
 
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    form: {
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '5px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    paymentHeading: {
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '10px',
    },
    paymentOptions: {
        display: 'flex',
        flexDirection: 'column',
    },
    upiHeading: {
        fontSize: '18px',
        marginTop: '20px',
        marginBottom: '10px',
    },
    payNowButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        marginTop: '20px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
};
 
export default PaymentPage;