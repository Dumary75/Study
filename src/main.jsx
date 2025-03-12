import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Users from './Users.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
         
         <Route path='/users/:age/:name' element={<Users />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)
