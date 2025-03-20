import React, { useRef, useState } from 'react'
import { useAuth } from './context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import {z} from 'zod';



function Login() {
    const {currentUser} = useAuth();
    const{ login } = useAuth();
    const [error, setError] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!emailRef.current.value || !passwordRef.current.value) return setError("Please Enter Email and Password")
        try {
            setError("");
            setIsLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);            
            console.log(currentUser);
            navigate('/HomePage');

        } catch (error) {
            console.error('error is',error);
            setError("faild to login");
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='border-1 p-8 w-80 rounded-sm'>
            <h2 className='text-center text-xl font-semibold m-2'>Wellcom Back</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <label className='flex flex-col gap-1'>
                    Email
                    <input className='border-1 p-2 rounded-sm' type="text" ref={emailRef}/>
                </label>
                <label className='flex flex-col gap-1'>
                    Password
                    <input className='border-1 p-2 rounded-sm' type="password" ref={passwordRef}/>
                </label>
                <button className='border-1 p-2 rounded-sm w-full my-2 cursor-pointer' type='submit' disabled={isloading}>{isloading ? 'Login...' : 'Login'}</button>
                {error && <p className='text-red-500'>{error}</p>}
                <div className='flex justify-between'>
                    <p>I don't have an account</p>
                    <Link to={'/SignUp'}>SignUp</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login