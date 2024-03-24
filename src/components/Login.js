import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import { app } from "../firebase/firebase";

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loginMessage, setLoginMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('text-brown bg-lightblue');
    const [messageStyle2, setMessageStyle2] = useState('text-blue');
    const navigate = useNavigate();

    const handleLogin = (evt) => {
        setLoginData({ ...loginData, [evt.target.name]: evt.target.value });
    };

    const submitLogin = async (evt) => {
        evt.preventDefault();
        try {
            const auth = getAuth(app);
            const temp = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            console.log(temp.user.email);
            setLoggedInUser(temp.user);
            navigate(`/productpage`);
        } catch (error) {
            console.error('Error logging in:', error.message);
            setLoginMessage(error.message);
            setMessageStyle('text-red');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width:'100%',height: '95vh', backgroundImage:'url("https://th.bing.com/th?id=OIP.jlZKoxfBr3VdIpCQph9TRwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="bg-lightyellow border p-4">
                <h1 className={messageStyle}>Login</h1>
                <form onSubmit={submitLogin}>
                    <input className="form-control mb-2" type="email" name="email" placeholder="Enter Email" value={loginData.email} onChange={handleLogin} />
                    <input className="form-control mb-2" type="password" name="password" placeholder="Enter Password" value={loginData.password} onChange={handleLogin} />
                    <button className="btn btn-primary" type="submit">Login</button>
                </form>
                {loginMessage && <p className={messageStyle2}>{loginMessage}</p>}
                <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
};

export default Login;
