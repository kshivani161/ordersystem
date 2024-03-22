import React from 'react'
import {Link} from 'react-router-dom'

import {auth} from '../firebase/firebase'
import {useNavigate} from 'react-router-dom'

const MenuBar = ({user}) => {

    const history = useNavigate();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/login');
        })
    }

    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <img height="80px" src="https://th.bing.com/th/id/R.b61f35a945c9993808f377694023d1e7?rik=euWEeRBWiDMULw&riu=http%3a%2f%2fwww.freevector.com%2fuploads%2fvector%2fpreview%2f10771%2fFreeVector-Shopping-Icon.jpg&ehk=Pp7jjfaLl5oNSilzGApPsnZhPeUB4DJ%2b4ZJ9vYGmMoA%3d&risl=&pid=ImgRaw&r=0%22" alt="logo"/>
                </div>
            </div>
            <div className='rightside'>

                {!user&&<>
                    <div><Link className='navlink' to="register">SIGN UP</Link></div>
                    <div><Link className='navlink' to="login">LOGIN</Link></div>
                </>} 

                {user&&<>
                    <div><Link className='navlink' to="home">{user}</Link></div>
                    <li className="nav-item">
                            <Link className="nav-link active" to="productpage">Products</Link>
                        </li>
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}                     
                                
            </div>
        </div>

    )
}
export default MenuBar;