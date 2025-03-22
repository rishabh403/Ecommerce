


//import logo from './logo.svg';
import './App.css';
import { data, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Context from './context/index';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    try {
        //console.log("inside fetch user details")
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
          //console.log("inside fetch user details after axios",response.data)
          const data = response.data;
          dispatch(setUserDetails(data));
        }
      } catch (error) {
        toast.error('User details not found!');
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/countcart`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const dataApi = dataResponse.data
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;