import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { setUserDetails } from '../store/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Context from '../context/index';


const Layout = () => {

  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
          const data = response.data;
          //console.log(data)
          dispatch(setUserDetails(data));
        }
      } catch (error) {
        toast.error('User details not found!');
      }
    }

    /* const fetchUserAddToCart = async()=>{
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
        method : SummaryApi.addToCartProductCount.method,
        credentials : 'include'
      })
  
      const dataApi = await dataResponse.json()
  
      setCartProductCount(dataApi?.data?.count)
    } */

      useEffect(()=>{
        /**user Details */
        fetchUserDetails()
        /**user Details cart product */
        /* fetchUserAddToCart() */
      },[])


  return (
    <div>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          /* fetchUserAddToCart */
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
    </div>
  );
};

export default Layout;