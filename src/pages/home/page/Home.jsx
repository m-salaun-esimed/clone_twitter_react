import React, { Fragment } from 'react'
import AuthGuard from '../../../shared/guards/AuthGuard'
import Navbar from '../../../shared/components/Navbar';
import ListTweet from '../components/ListTweet';

function Home() {
  return (
    <Fragment>
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="p-4 sm:ml-64">
          <ListTweet />
        </div>
      </div>
    </Fragment>
  );
}

export default AuthGuard(Home);
