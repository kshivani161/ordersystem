import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, firestore } from "../firebase/firebase";
import { Dropdown } from "react-bootstrap";
import { collection, query, where, getDocs } from "firebase/firestore";

const MenuBar = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const q = query(collection(firestore, 'users'), where('uid', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setUsername(doc.data().username);
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            } else {
                setUsername('');
            }
        });

        return () => unsubscribe();
    }, []);

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
                            <Link className="nav-link active" to="productlist">Product List</Link>
                        </li>
                    </ul>
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
                            <Dropdown.Item href="#">Profile</Dropdown.Item>
                            <Dropdown.Item href="#">My Orders</Dropdown.Item>
                            <Dropdown.Item href="./logout">Logout</Dropdown.Item>
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
// import { app, firestore } from "../firebase/firebase"; // Import initialized Firebase app and firestore
// import { Dropdown } from "react-bootstrap";
// import { collection ,doc} from "@firebase/firestore";

// const MenuBar = () => {
//     // State to store the username
//     const [username, setUsername] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');

//     // Function to handle logout

//     // useEffect to listen for authentication state changes
//     useEffect(() => {
//         const auth = getAuth(app);
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 // User is signed in
//                 try {
//                     const userDocRef = collection(firestore,'users');
//                     const userDoc = await userDocRef.get(user.uid);
//                     if (userDoc.exists) {
//                         const userData = userDoc.data();
//                         console.log('User data:', userData);
//                         setUsername(userData.username || ''); // Set username to user's display name if available
//                     } else {
//                         console.log("No such document!");
//                     }
//                 } catch (error) {
//                     console.error('Error fetching user data:', error.message);
//                 }
//             } else {
//                 // User is signed out
//                 setUsername(''); // Reset username
//             }
//         });

//         // Clean up function
//         return () => unsubscribe();
//     }, []);

     

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


//                         <li className="nav-item">
//                             <Link className="nav-link active" to="productlist">Product List</Link>
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
