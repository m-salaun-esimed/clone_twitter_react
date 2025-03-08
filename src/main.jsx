import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux'

import './index.css'
import Login from './pages/Login.jsx';
import store  from './app/store.js'
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
