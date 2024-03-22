import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import MenuBar from './MenuBar';
import Logout from './Logout';
import ProductList from './ProductList';
import ProductPages from './ProductPages';
import ProductDetails from './ProductDetails';

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <>
                    {/* <MenuBar /> */}
                </>
                <div className='container'>
                    <Routes >
                        <Route exact path='home' element={<Home />} />
                        <Route exact path='home/:username' element={<Home />} />
                        <Route exact path='productlist' element={<ProductList />} />
                        <Route exact path='productdetails/:productId' element={<ProductDetails />} />
                        <Route exact path='login' element={<Login />} />
                        <Route exact path='logout' element={<Logout />} />
                        <Route exact path='register' element={<Register />} />
                        <Route exact path='productpage' element={<ProductPages />} />
                        <Route exact path='' element={<Home />} />

                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;

// const AppRoutes = () => {
//     return (
//         <>
//             <p>App Routes Component</p>
//         </>
//     );
// };

// export default AppRoutes;























