import React, { Fragment } from 'react'
import AuthGuard from '../domains/auth/AuthGuard';
import NavBar from '../ui/NavBar';

function Home() {
  return (
    <Fragment>
      <div className="min-h-screen bg-black">
        <NavBar />
        <div className="p-4 sm:ml-64">
        </div>
      </div>
    </Fragment>
  );
}

export default AuthGuard(Home);