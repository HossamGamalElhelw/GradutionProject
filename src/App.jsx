import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router'
import ProductRoutes from './assets/components/ProductRoutes'
import AuthProvider from './assets/components/context/AuthProvider'

function App() {
  

  return (
    <div className='app'> 
      <BrowserRouter>
        <AuthProvider>
          <ProductRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
