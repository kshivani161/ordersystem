import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth,signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from "react-bootstrap";
const MenuBar = () => {
    const [username, setUsername] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [logoutMessage, setLogoutMessage] = useState('');
    const [userId,setuserId]=useState('');
    const navigate=useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            
                setUsername(user.email);
                setuserId(user.email);
            } else {
                setUsername('');
                setuserId('');
            }
        });

        // Load cart items from localStorage
        loadCartItems();

        // Listen for changes in cart items
        window.addEventListener('storage', handleStorageChange);

        return () => {
            unsubscribe();
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    // const filteredProducts = products.filter(product => {
    //     const formattedSearchQuery = searchQuery.toLowerCase().replace(/\s/g, '');
    //     const formattedProductTitle = product.title.toLowerCase().replace(/\s/g, '');
    //     return formattedProductTitle.includes(formattedSearchQuery) && (filterCategory === '' || product.category === filterCategory);
    // });
  
    const loadCartItems = () => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    };

    const handleStorageChange = () => {
        // Update cart items when storage changes
        loadCartItems();
    };

    const handleLogout = async () => {
    try {
        const auth = getAuth(app);
        // Sign out the current user
        await signOut(auth);
        console.log('User logged out successfully');
        
        setUsername('');
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartItemsForCheckout');
        // Redirect to the home page
        navigate('/home');
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
};

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#add8e6' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="">
                    <img height="60px" title="Home"
                        src="https://th.bing.com/th/id/R.b61f35a945c9993808f377694023d1e7?rik=euWEeRBWiDMULw&riu=http%3a%2f%2fwww.freevector.com%2fuploads%2fvector%2fpreview%2f10771%2fFreeVector-Shopping-Icon.jpg&ehk=Pp7jjfaLl5oNSilzGApPsnZhPeUB4DJ%2b4ZJ9vYGmMoA%3d&risl=&pid=ImgRaw&r=0"
                        alt="order logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                        <li className="nav-item">
                            <Link className="nav-link active" to="login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="register">Register</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link active" to="productlist">Product List</Link>
                        </li> */}
                        <li>
                         {username && (
                        <div className="navbar-nav">
                        
                        <span className="nav-item">
                            <Link className="nav-link active" to="productpage">Products</Link>
                        </span>
                        <span className="nav-item">
                            <span className="nav-link active"><b>Hello, {username && username.split('@')[0]}....</b></span>
                        </span>
                    </div>
                    
                        )}
                        </li>
                    </ul>
                      {/* <form className="d-flex" role="search"> 
                    <div className="search-bar-container">
                 <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Search products..."
                     className="search-bar"
                 />
                <button className="search-button">Search</button>
            </div>
                    </form> */}
                    <div>
                        <Link to="cart">
                            <FontAwesomeIcon icon={faShoppingCart} /> 
                            <span>{cartItems.length}</span> 
                        </Link>
                    </div>
                <Dropdown>
                        <Dropdown.Toggle style={{ border: "none", background: "none" }}>
                             <img
                                 height="50px"
                                 title="Home"
                                 src="https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                                alt="person logo"
                                 className="p-1"
                             />
                        </Dropdown.Toggle>

                         <Dropdown.Menu className="ms-auto">
                             <Dropdown.Item href="./profile">Profile</Dropdown.Item>
                           <Dropdown.Item href="./orderlist">My Orders</Dropdown.Item>
                           
                        <Dropdown.Item href="./contact">Contact Support</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                   
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react"; // Import useState and useEffect hooks
// import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication methods
// import { app } from "../firebase/firebase"; // Import initialized Firebase app
//  import { Dropdown } from "react-bootstrap";
// const MenuBar = ({user}) => {
//     // State to store the username
//     const [username, setUsername] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
 
//     // Function to handle logout
   
//     // useEffect to listen for authentication state changes
//     useEffect(() => {
//         const auth = getAuth(app);
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in
//                 setUsername(user.displayName || ''); // Set username to user's display name if available
//             } else {
//                 // User is signed out
//                 setUsername(''); // Reset username
//             }
//         });
 
//         // Clean up function
//         return () => unsubscribe();
//     }, []); // Empty dependency array to run only once on component mount
 
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#add8e6' }}>
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="" >
//                     <img height="60px" title="Home"
//                         src="https://th.bing.com/th/id/R.b61f35a945c9993808f377694023d1e7?rik=euWEeRBWiDMULw&riu=http%3a%2f%2fwww.freevector.com%2fuploads%2fvector%2fpreview%2f10771%2fFreeVector-Shopping-Icon.jpg&ehk=Pp7jjfaLl5oNSilzGApPsnZhPeUB4DJ%2b4ZJ9vYGmMoA%3d&risl=&pid=ImgRaw&r=0"
//                         alt="order logo" />
//                 </Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         {/* Conditionally render username */}
//                         {username && (
//                             <li className="nav-item">
//                                 <span className="nav-link active">Hello, {username}</span>
//                             </li>
//                         )}
//                         <li className="nav-item">
//                             <Link className="nav-link active" to="login">Login</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link active" to="register">Register</Link>
//                         </li>
//                         {/* <li className="nav-item">
//                             <Link className="nav-link active" to="logout" >Logout</Link>
//                         </li> */}
                       
//                         <li className="nav-item">
//                             <Link className="nav-link active" to="productpage">Products</Link>
//                         </li>
//                     </ul>
//                     {/* <form className="d-flex" role="search"> */}
//                     {/* <div className="search-bar-container">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search products..."
//                     className="search-bar"
//                 />
//                 <button className="search-button">Search</button>
//             </div> */}
//                     {/* </form> */}
//                     <Dropdown>
//                         <Dropdown.Toggle style={{ border: "none", background: "none" }}>
//                             <img
//                                 height="50px"
//                                 title="Home"
//                                 src="https://th.bing.com/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
//                                 alt="person logo"
//                                 className="p-1"
//                             />
//                         </Dropdown.Toggle>

//                         <Dropdown.Menu className="ms-auto">
//                             <Dropdown.Item href="#">Profile</Dropdown.Item>
//                             <Dropdown.Item href="#">My Orders</Dropdown.Item>
//                             <Dropdown.Item href="./logout">Logout</Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>

             
//                 </div>
                
//             </div>
//         </nav>
//     );
// };
 
// export default MenuBar;