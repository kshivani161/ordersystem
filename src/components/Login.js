
// import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router";
// import { app ,auth} from "../firebase/firebase";
// import { collection, getDocs, query, where } from "@firebase/firestore";
// import { firestore } from '../firebase/firebase';

// const Login = () => {

//     const [loggedInUser, setLoggedInUser] = useState({});
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [loginMessage, setLoginMessage] = useState('');
//     const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
//     const [messageStyle2, setMessageStyle2] = useState('text-blue');
//     const navigate = useNavigate();

//     const handleLogin = (evt) => {
//         setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
//     };
//     const submitLogin = (evt) => {
//         evt.preventDefault();
//         const auth = getAuth(app);
//         signInWithEmailAndPassword(auth, loginData.email, loginData.password)
//             .then((resp) => {
//                 console.log(resp);
//                 console.log(auth.currentUser.uid);
//                 console.log(auth.currentUser.email);
//                 const userRef = collection(firestore, 'users');
//                 const q = query(userRef, where('uid', '==', auth.currentUser.uid));
//                 getDocs(q)
//                     .then((resp) => {
//                         const userData = resp.docs.map(doc => ({
//                             id: doc.id,
//                             ...doc.data(),
//                         }));
//                         console.log(userData);
//                         setLoggedInUser(userData);
//                         console.log(loggedInUser);
//                         console.log(loggedInUser.username);
//                         navigate(`/home/${auth.email}`);
//                     })
//                     .catch((error) => {
//                         console.error('Error fetching user data:', error);
//                     });
//             })
//     };
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router"; // Import useNavigate from react-router
import { app } from "../firebase/firebase"; // Import initialized Firebase app

const Login = () => {

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loginMessage, setLoginMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
    const [messageStyle2, setMessageStyle2] = useState('text-blue');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = (evt) => {
        setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
    };
const submitLogin = async (evt) => {
        evt.preventDefault();
        try {
            const auth = getAuth(app);
            // Sign in with email and password
            const temp = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            console.log(temp.user.email);
            setLoggedInUser(temp.user);
            // call user data based on username 
            // Redirect to home page after successful login
            // navigate(`/home/${temp.user.email}`);
            navigate(`/productpage`);
        } catch (error) {
            console.error('Error logging in:', error.message);
            setLoginMessage(error.message);
            setMessageStyle('text-red');
        }
    };
    return (
                <div className="d-flex justify-content-center align-items-center" style={{ width:'100%',height: '100vh', backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITSx7lylxpBTbPk-xtNRiCCXc3DfGZA0t3w&s")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="bg-lightyellow border p-4">
                        <h1 className={messageStyle}>Login</h1>
                        <form onSubmit={submitLogin}>
                            <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
                            <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
                            <button className="btn btn-primary" type="submit">Login</button>
                        </form>
                        {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
                    </div>
                </div>
            );
        }
    

export default Login;
// import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router"; // Import useNavigate from react-router
// import { app } from "../firebase/firebase"; // Import initialized Firebase app

// const Login = () => {
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [loginMessage, setLoginMessage] = useState('');
//     const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
//     const [messageStyle2, setMessageStyle2] = useState('text-blue');
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleLogin = (evt) => {
//         setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
//     };

//     const submitLogin = async (evt) => {
//         evt.preventDefault();
//         try {
//             const auth = getAuth(app);
//             // Sign in with email and password
//             await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
//             console.log('User logged in successfully');
//             // Redirect to home page after successful login
//             navigate("/home");
//         } catch (error) {
//             console.error('Error logging in:', error.message);
//             setLoginMessage(error.message);
//             setMessageStyle('text-red');
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh', backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITSx7lylxpBTbPk-xtNRiCCXc3DfGZA0t3w&s")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <div className="bg-lightyellow border p-4">
//                 <h1 className={messageStyle}>Login Component</h1>
//                 <form onSubmit={submitLogin}>
//                     <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
//                     <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
//                     <button className="btn btn-primary" type="submit">Login</button>
//                 </form>
//                 {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
//             </div>
//         </div>
//     );
// }

// export default Login;





// import { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router"; // Import useNavigate from react-router
// import { app } from "../firebase/firebase"; // Import initialized Firebase app

// const Login = () => {

//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const [loggedInUser, setLoggedInUser] = useState({});
//     const [loginMessage, setLoginMessage] = useState('');
//     const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
//     const [messageStyle2, setMessageStyle2] = useState('text-blue');
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleLogin = (evt) => {
//         setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
//     };
// const submitLogin = async (evt) => {
//         evt.preventDefault();
//         try {
//             const auth = getAuth(app);
//             // Sign in with email and password
//             const temp = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
//             console.log(temp);
//             setLoggedInUser(temp);
//             // Redirect to home page after successful login
//             navigate(`/home/${loggedInUser.username}`);
//         } catch (error) {
//             console.error('Error logging in:', error.message);
//             setLoginMessage(error.message);
//             setMessageStyle('text-red');
//         }
//     };
//     return (
//                 <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh', backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITSx7lylxpBTbPk-xtNRiCCXc3DfGZA0t3w&s")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                     <div className="bg-lightyellow border p-4">
//                         <h1 className={messageStyle}>Login Component</h1>
//                         <form onSubmit={submitLogin}>
//                             <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
//                             <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
//                             <button className="btn btn-primary" type="submit">Login</button>
//                         </form>
//                         {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
//                     </div>
//                 </div>
//             );
//         }
    

// export default Login;
// // import { useState } from "react";
// // import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// // import { useNavigate } from "react-router"; // Import useNavigate from react-router
// // import { app } from "../firebase/firebase"; // Import initialized Firebase app

// // const Login = () => {
// //     const [loginData, setLoginData] = useState({ email: '', password: '' });
// //     const [loginMessage, setLoginMessage] = useState('');
// //     const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
// //     const [messageStyle2, setMessageStyle2] = useState('text-blue');
// //     const navigate = useNavigate(); // Initialize useNavigate hook

// //     const handleLogin = (evt) => {
// //         setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
// //     };

// //     const submitLogin = async (evt) => {
// //         evt.preventDefault();
// //         try {
// //             const auth = getAuth(app);
// //             // Sign in with email and password
// //             await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
// //             console.log('User logged in successfully');
// //             // Redirect to home page after successful login
// //             navigate("/home");
// //         } catch (error) {
// //             console.error('Error logging in:', error.message);
// //             setLoginMessage(error.message);
// //             setMessageStyle('text-red');
// //         }
// //     };

// //     return (
// //         <div className="d-flex justify-content-center align-items-center" style={{ height: '85vh', backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQITSx7lylxpBTbPk-xtNRiCCXc3DfGZA0t3w&s")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
// //             <div className="bg-lightyellow border p-4">
// //                 <h1 className={messageStyle}>Login Component</h1>
// //                 <form onSubmit={submitLogin}>
// //                     <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
// //                     <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
// //                     <button className="btn btn-primary" type="submit">Login</button>
// //                 </form>
// //                 {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Login;
