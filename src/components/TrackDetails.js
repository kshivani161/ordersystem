import React, { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router';
const TrackDetails = () => {
  const navigate=useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const stepLabels = ['Order Placed', 'Order Packed', 'Order Shipped', 'Order Delivered'];
  const [orderDetails, setOrderDetails] = useState({
    orderDate: new Date().toLocaleString(),
    deliveryDate: '', // Actual delivery date
    expectedDeliveryDate: '', // Expected delivery date after 3 days
    orderPackedDate: '', // Date order packed
    orderShippedDate: '', // Date order shipped
    orderDeliveredDate: '', // Date order delivered
  });
 
  const startProgress = () => {
    // Update progress for the current step
    const updatedProgress = [...progress];
    updatedProgress[currentStep] = 100;
    setProgress(updatedProgress);
 
    // Move to the next step after a delay
    setTimeout(() => {
      if (currentStep < stepLabels.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Set delivery date when order delivered
        const deliveryDate = new Date().toLocaleString();
        setOrderDetails(prevState => ({
          ...prevState,
          deliveryDate: deliveryDate,
        }));
      }
    }, 600); // 1 minute delay
  };
 
  useEffect(() => {
    // Start progress when component mounts
    startProgress();
  }, [currentStep]); // Re-run effect when currentStep changes
 
  useEffect(() => {
    // Calculate expected delivery date after 3 days
    const orderDate = new Date(orderDetails.orderDate);
    const expectedDeliveryDate = new Date(orderDate);
    expectedDeliveryDate.setDate(orderDate.getDate() + 3); // Adding 3 days
 
    // Update state with the expected delivery date
    setOrderDetails(prevState => ({
      ...prevState,
      expectedDeliveryDate: expectedDeliveryDate.toLocaleString(),
    }));
  }, [orderDetails.orderDate]); // Re-run effect when orderDate changes
 
  // Function to update step dates
  const updateStepDates = () => {
    const orderDate = new Date(orderDetails.orderDate);
    const orderPackedDate = new Date(orderDate);
    const orderShippedDate = new Date(orderDate);
    const orderDeliveredDate = new Date(orderDetails.deliveryDate);
 
    orderPackedDate.setDate(orderPackedDate.getDate() + 1);
    orderShippedDate.setDate(orderShippedDate.getDate() + 2);
    orderDeliveredDate.setDate(orderDate.getDate() +3);
 
    setOrderDetails(prevState => ({
      ...prevState,
      orderPackedDate: orderPackedDate.toLocaleDateString(),
      orderShippedDate: orderShippedDate.toLocaleDateString(),
      orderDeliveredDate: orderDeliveredDate.toLocaleDateString(),
    }));
  };
  const handleComplaintClick = () => {
    // Redirect to the complaint page
    navigate('/complaintform');
  };
  // Call updateStepDates when currentStep changes
  useEffect(() => {
    updateStepDates();
  }, [currentStep, orderDetails.deliveryDate]);
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Order Details</h2>
      <div>
        <p>Order Date: {orderDetails.orderDate}</p>
        {orderDetails.expectedDeliveryDate && <p> Expected Delivery Date: {orderDetails.expectedDeliveryDate}</p>}
      </div>
      <h2>Order Status</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {stepLabels.map((label, index) => (
            <div key={index} style={{ marginBottom: '20px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '15px', backgroundColor: currentStep >= index ? 'green' : '#f2f2f2', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>{index + 1}</div>
              <div style={{ marginTop: '10px', color: currentStep >= index ? 'green' : '#000', marginLeft: '10px' }}>{label}</div>
              {currentStep >= index && (
                <div style={{ marginLeft: '10px' }}>
                  {index === 0 && orderDetails.orderDate && (
                    <p style={{ fontSize: '12px' }}>Date: {orderDetails.orderDate}</p>
                  )}
                  {index === 1 && orderDetails.orderPackedDate && (
                    <p style={{ fontSize: '12px' }}>Date: {orderDetails.orderPackedDate}</p>
                  )}
                  {index === 2 && orderDetails.orderShippedDate && (
                    <p style={{ fontSize: '12px' }}>Date: {orderDetails.orderShippedDate}</p>
                  )}
                  {index === 3 && orderDetails.orderDeliveredDate && (
                    <p style={{ fontSize: '12px' }}>Date: {orderDetails.orderDeliveredDate}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ width: '2px', height: 'calc(100% - 40px)', backgroundColor: 'gray', marginLeft: '15px', marginRight: '15px' }}></div> {/* Line joining all steps */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {progress.map((percentage, index) => (
            <div key={index} style={{ width: '6px', height: `${percentage}%`, backgroundColor: currentStep >= index ? 'green' : '#f2f2f2', marginRight: '10px' }}></div>
          ))}
        </div>

      </div>
      <div>
      <h2>Have any complaints?</h2>
      <p>If you have any complaints or feedback, please feel free to post them here:</p>
      <button onClick={handleComplaintClick}>Post Complaint</button>
      </div>
    </div>
  );
};
 
export default TrackDetails