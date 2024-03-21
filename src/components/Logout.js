import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase"; // Import initialized Firebase app

const Logout = () => {
    const [logoutMessage, setLogoutMessage] = useState('');
    

    const handleLogout = async () => {
        try {
            const auth = getAuth(app);
            // Sign out the current user
            await signOut(auth);
            console.log('User logged out successfully');
            // Display logout message
            setLogoutMessage('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error.message);
            // Display error message
            setLogoutMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>Logout</button>
            {logoutMessage && <p>{logoutMessage}</p>}
        </div>
    );
};

export default Logout;
