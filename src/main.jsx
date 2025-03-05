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
import Followers from './pages/followers/Followers.jsx';
import Following from './pages/following/Following.jsx';

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
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/followers/:userId" element={<Followers />} />
          <Route path="/following/:userId" element={<Following />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
