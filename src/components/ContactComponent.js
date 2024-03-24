import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const ContactComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const contactFormRef = collection(firestore, 'contactForms');
      await addDoc(contactFormRef, {
        name,
        email,
        message
      });
      console.log('Form data saved successfully');
      // Reset form fields after submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error saving form data:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="container contact-container" style={{ backgroundImage: `url('https://tse4.mm.bing.net/th/id/OIP.ZHd-rlkaiM6jf-_8Uawb6QHaD_?w=2000&h=1078&rs=1&pid=ImgDetMain')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Contact Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message:</label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <br/>
              <div>
                <h4>Any Urgent Queries Contact to:9969798943</h4>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
