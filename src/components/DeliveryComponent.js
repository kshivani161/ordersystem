import React, { useState,useEffect } from 'react';
import {firestore,auth} from '../firebase/firebase';
import 'firebase/firestore';
import { getAuth,signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";

const DeliveryComponent = () => {
  const [username ,setUsername]=useState('');
useEffect(() => {
  const auth = getAuth(app);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      
          setUsername(user.email);
          
      } else {
          setUsername('');
         
      }
  });
},[]);
  const markDeliveryCompleted = async () => {
    const db = firestore.firestore();
    try {
      // Update delivery status in Firestore
      await db.collection('deliveries').doc(username).update({ status: 'Completed' });
    } catch (error) {
      console.error('Error marking delivery as completed:', error);
    }
  };

  return (
    <div>
      <button onClick={markDeliveryCompleted}>Mark as Completed</button>
    </div>
  );
};

export default DeliveryComponent;