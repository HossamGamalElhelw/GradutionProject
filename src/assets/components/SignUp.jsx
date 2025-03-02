import React, { useRef, useState } from 'react'
import { useAuth } from './context/AuthProvider';
import { useNavigate, Link } from 'react-router';

function SignUp() {
    const{ signup } = useAuth();
    const [error, setError] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passworConfirmationdRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(passwordRef.current.value !== passworConfirmationdRef.current.value) return setError('Password is not match')
        if(!emailRef.current.value || !passwordRef.current.value || !passworConfirmationdRef.current.value || !userNameRef.current.value) return setError("Please fill all inputs")
        try {
            setError("");
            setIsLoading(true);
            await signup(emailRef.current.value,passwordRef.current.value);
            navigate('/HomePage')
        } catch (error) {
            console.error(error);
            setError("faild to create an account");
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='border-1 p-8 w-90 rounded-sm'>
            <h2 className='text-center text-xl font-semibold m-2'>Join Us</h2>
            {error && <h2 className='text-red-500'>{error}</h2>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <label className='flex flex-col gap-1'>
                    UserName
                    <input className='border-1 p-2 rounded-sm' type="text" ref={userNameRef}/>
                </label>
                <label className='flex flex-col gap-1'>
                    Email
                    <input className='border-1 p-2 rounded-sm' type="text" ref={emailRef}/>
                </label>
                <label className='flex flex-col gap-1'>
                    Password
                    <input className='border-1 p-2 rounded-sm' type="password" ref={passwordRef} />
                </label>
                <label className='flex flex-col gap-1'>
                    Confirm Password
                    <input className='border-1 p-2 rounded-sm' type="password" ref={passworConfirmationdRef} />
                </label>
                <button className='border-1 p-2 rounded-sm w-full my-2 cursor-pointer' type='submit' disabled={isloading}>{isloading ? 'SignUp...':'SignUp'}</button>
                <div className='flex justify-between'>
                    <p>I already have an account</p>
                    <Link to={'/Login'}>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp