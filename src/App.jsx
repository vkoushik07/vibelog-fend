import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/Register'

function App() {
  

  return (
    <>
    <Routes>

      <Route path = "/" element ={<Home/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/register" element={<Register/>}/>
      
    </Routes>
      
      
    </>
  )
}

export default App
