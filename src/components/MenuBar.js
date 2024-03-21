import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication methods
import { app } from "../firebase/firebase"; // Import initialized Firebase app

const MenuBar = () => {
    // State to store the username
    const [username, setUsername] = useState('');

    // Function to handle logout
   
    // useEffect to listen for authentication state changes
    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUsername(user.displayName || ''); // Set username to user's display name if available
            } else {
                // User is signed out
                setUsername(''); // Reset username
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []); // Empty dependency array to run only once on component mount

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#add8e6' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="" >
                    <img height="60px" title="Home"
                        src="https://assets.materialup.com/uploads/61d86780-be13-47fa-81a6-226aac22db27/preview.jpg"
                        alt="deloitte logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Conditionally render username */}
                        {username && (
                            <li className="nav-item">
                                <span className="nav-link active">Hello, {username}</span>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link active" to="login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="logout" >Logout</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link active" to="productpage">Product Pages</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link active" to="productlist">Product List</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search a product..." />
                        <button className="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;
