import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Context from '../context/index';
import { setUserDetails } from '../store/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);
      if (response.status === 200) {
        const data = response.data;
        dispatch(setUserDetails(data.user));
        //console.log("inside login submit",data.user);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        navigate('/');
        fetchUserDetails()
        fetchUserAddToCart()
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
    setData({
      email: '',
      password: ''
    });
  };

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={submitHandler}>
            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                  </span>
                </div>
              </div>
              <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                Forgot password?
              </Link>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Login
            </button>
          </form>
          <p className='my-5'>Don't have an account? <Link to={"/signup"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;