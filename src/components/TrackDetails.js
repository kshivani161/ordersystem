import React, { useState, useEffect } from 'react';
 
const TrackDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const stepLabels = ['Order Placed', 'Order Packed', 'Order Shipped', 'Order Delivered'];
 
  const startProgress = () => {
    // Update progress for the current step
    const updatedProgress = [...progress];
    updatedProgress[currentStep] = 100;
    setProgress(updatedProgress);
 
    // Move to the next step after a delay
    setTimeout(() => {
      if (currentStep < stepLabels.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }, 60000); // 1 minute delay
  };
 
  useEffect(() => {
    // Start progress when component mounts
    startProgress();
  }, [currentStep]); // Re-run effect when currentStep changes
 
  return (
 
 
 
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {stepLabels.map((label, index) => (
          <div key={index} style={{ marginBottom: '20px', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '15px', backgroundColor: currentStep >= index ? 'green' : '#f2f2f2', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>{index + 1}</div>
            <div style={{ marginTop: '10px', color: currentStep >= index ? 'green' : '#000', marginLeft: '10px' }}>{label}</div>
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
  );
};
 
export default TrackDetails;