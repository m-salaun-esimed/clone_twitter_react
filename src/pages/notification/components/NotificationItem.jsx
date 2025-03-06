import React, { Fragment } from 'react';

function NotificationItem({ notification }) {
    return (
        <Fragment>
            <div
                key={notification.id}
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all duration-300"
            >
                <div className="flex items-center space-x-4">
                    <span className="text-white font-medium">Abonnement de :</span>
                    <span className="text-teal-400">{notification.followedId}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Le :</span>
                    <span className="text-white">{notification.notificationDate}</span>
                </div>
            </div>
        </Fragment>
    );
}

export default NotificationItem;
