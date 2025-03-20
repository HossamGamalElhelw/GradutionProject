import React from 'react';
import { Navigate, Route, Routes } from 'react-router'; 
import Login from './Login';
import SignUp from './SignUp';
import { useAuth } from './context/AuthProvider';
import HomePage from './HomePage';

function ProductRoutes() {
    const { currentUser } = useAuth();
    console.log(currentUser);

    return (
        <Routes>
            <Route 
                path='/login' 
                element={!currentUser ? <Login /> : <Navigate to="/HomePage" />}
            />
            <Route 
                path='/signup' 
                element={!currentUser ? <SignUp /> : <Navigate to="/HomePage" />}
            />
            <Route 
                path='/homepage' 
                element={currentUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route 
                path='*' 
                element={<Navigate to={currentUser ? '/homepage' : '/login'} />}
            />
        </Routes>
    );
}

export default ProductRoutes;