import { useState } from "react";
import { auth, firestore } from "../firebase/firebase"; // Import initialized Firebase auth and firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "@firebase/firestore";

const Register = () => {
    const [formData, setFormData] = useState({ 
        username: '',
        email: '', 
        password: '', 
        phoneNumber: '', 
        address: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
        if (name === "password") {
            setPasswordStrengthMessage(checkPasswordStrength(value));
        }
    };

    const checkPasswordStrength = (password) => {
        // Add your password strength validation logic here
        // For example, you can check the length, presence of uppercase, lowercase, special characters, etc.
        // Return a message indicating the password strength
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        } else {
            return ""; // Password is strong
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (passwordStrengthMessage) {
            setErrorMessage(passwordStrengthMessage);
            return; // Prevent registration if password is weak
        }
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log('User registered successfully');

            // Add user data to Firestore
            await addDoc(collection(firestore, "users"), {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                address: formData.address
            });

            // Display alert message
            alert('Registered successfully!');
            // Redirect to login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Error registering user:', error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="bg-light" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjrN5LeLqngQIyoArjh_623MbQhp80wwyUWQ&s")`, backgroundSize: 'cover' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="text-center mb-4">Registration Form</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                        {passwordStrengthMessage && <p className="text-danger mt-1">{passwordStrengthMessage}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <input type="tel" className="form-control" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Register</button>
                                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
