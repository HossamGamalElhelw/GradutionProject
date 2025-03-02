import React from 'react'
import { Navigate, Route,Routes } from 'react-router'
import Login from './Login'
import SignUp from './SignUp'
import { useAuth } from './context/AuthProvider'
import HomePage from './HomePage';

function ProductRoutes() {
    const {currentUser} = useAuth();
    
    return (
        <Routes>
            <Route path='/login' element={!currentUser ? <Login /> : <Navigate to={<HomePage /> } />} />
            <Route path='/Signup' element={!currentUser ? <SignUp /> : <Navigate to={<HomePage /> } />} />
            <Route path='/HomePage' element={currentUser ? <HomePage /> : <Navigate to={ <Login />}/>} />
            <Route path='*' element={ <Navigate to={currentUser ? '/HomePage' : '/Login'} /> } />
        </Routes>
    )
}

export default ProductRoutes
