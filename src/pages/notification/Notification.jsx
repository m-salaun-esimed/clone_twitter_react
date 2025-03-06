import React, { Fragment } from 'react'
import NavBar from '../../shared/components/Navbar'
import NotificationListe from './components/NotificationListe'
import AuthGuard from '../../shared/guards/AuthGuard'

function Notification() {
    return (
        <Fragment>
            <div className="min-h-screen bg-black">
                <NavBar />
                <div className="p-4 sm:ml-64">
                    <NotificationListe/>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthGuard(Notification)