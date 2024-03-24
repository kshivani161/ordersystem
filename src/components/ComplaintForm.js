import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const ComplaintPage = () => {
    const [complaint, setComplaint] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!complaint) {
            setError('Please enter your complaint.');
            return;
        }

        try {
            setLoading(true);
            // Save complaint to Firebase
            const docRef = await addDoc(collection(firestore, 'complaints'), {
                complaint,
                timestamp: new Date(),
            });
            console.log('Complaint submitted with ID: ', docRef.id);
            setLoading(false);
            setSuccess(true);
            setComplaint('');
            setError('');
        } catch (error) {
            console.error('Error submitting complaint: ', error);
            setLoading(false);
            setError('Error submitting complaint. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Submit a Complaint</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="complaint" className="form-label">Complaint:</label>
                    <textarea
                        id="complaint"
                        className="form-control"
                        rows="5"
                        value={complaint}
                        onChange={(e) => setComplaint(e.target.value)}
                    ></textarea>
                </div>
                {error && <p className="text-danger mb-3">{error}</p>}
                {success && <p className="text-success mb-3">Complaint submitted successfully!</p>}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                </button>
            </form>
        </div>
    );
};

export default ComplaintPage;
