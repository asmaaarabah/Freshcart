
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import { Offline } from 'react-detect-offline';
import Brands from './Components/Brands/Brands';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

function App() {
  const [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }
  }, [])

  let routers = createBrowserRouter ([
    {
      path: '/', element: <Layout setUserData={setUserData} userData={userData} />, children: [
        { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
        { path: 'products/:id', element: <ProtectedRoute> <ProductDetails /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute> <Brands /></ProtectedRoute> },
        { path: 'brandproducts/:id', element: <ProtectedRoute> <BrandProducts /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute> <Checkout /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ]);
  return <CartContextProvider>


    <Offline> <div className='network'>Only shown offline (surprise!)</div>  </Offline>
    <Toaster />
    <RouterProvider router={routers}></RouterProvider>;
  </CartContextProvider>








}
export default App;


