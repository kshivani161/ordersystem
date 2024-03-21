import { Link } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication methods
import { app } from "../firebase/firebase"; // Import initialized Firebase app

const MenuBar = () => {
    // State to store the username
    const [username, setUsername] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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
                        src="https://th.bing.com/th/id/R.b61f35a945c9993808f377694023d1e7?rik=euWEeRBWiDMULw&riu=http%3a%2f%2fwww.freevector.com%2fuploads%2fvector%2fpreview%2f10771%2fFreeVector-Shopping-Icon.jpg&ehk=Pp7jjfaLl5oNSilzGApPsnZhPeUB4DJ%2b4ZJ9vYGmMoA%3d&risl=&pid=ImgRaw&r=0"
                        alt="order logo" />
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
                        
                        <li className="nav-item">
                            <Link className="nav-link active" to="productlist">Product List</Link>
                        </li>
                    </ul>
                    {/* <form className="d-flex" role="search"> */}
                    {/* <div className="search-bar-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="search-bar"
                />
                <button className="search-button">Search</button>
            </div> */}
                    {/* </form> */}
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;
