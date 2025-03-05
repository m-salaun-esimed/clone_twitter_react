import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux'

import './index.css'
import Login from './pages/login/page/Login.jsx';
import Register from './pages/register/page/Register.jsx';
import store  from './shared/store/store.js'
import Home from './pages/home/page/Home.jsx';
import Profile from './pages/profile/page/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path= "/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
