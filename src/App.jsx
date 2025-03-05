import { Fragment } from 'react'
import './App.css'
import AuthGuard from './shared/guards/AuthGuard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './shared/guards/PrivateRoute';
import Followers from './pages/followers/Followers';
import Following from './pages/following/Following';
import Home from './pages/home/Home';
import Profile from './pages/profile/page/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/followers/:userId"
          element={
            <PrivateRoute>
              <Followers />
            </PrivateRoute>
          }
        />
        <Route
          path="/following/:userId"
          element={
            <PrivateRoute>
              <Following />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AuthGuard(App);
