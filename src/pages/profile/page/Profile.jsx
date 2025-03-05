import React, { Fragment } from 'react'
import NavBar from '../../../shared/components/Navbar'
import UserTweetList from '../components/UserTweetList'
import AuthGuard from '../../../shared/guards/AuthGuard'
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

function Profile() {
    const { userId } = useParams();
    return (
        <Fragment>
            <div className="min-h-screen bg-black">
                <NavBar />
                <div className="p-4 sm:ml-64">
                    <UserProfile userId={userId}/> 
                    <UserTweetList userId={userId}/>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthGuard(Profile)