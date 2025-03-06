import React, { Fragment, useEffect, useState } from 'react';
import { getName } from '../../../domains/user/user';
import { useSelector } from 'react-redux';

function NotificationItem({ notification }) {
  const [followerName, setFollowedName] = useState("");
  const token = useSelector((state)=> state.auth.token);

  useEffect(() => {
    const fetchName = async () => {
      const response = await getName(notification.followerId);
      console.log("response :", response);
      setFollowedName(response.email);
    };
  
    fetchName();
  }, []);


  return (
    <Fragment>
      <div
        key={notification.id}
        className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium">{notification.status === "abonnement" ? "Abonnement de " : "Like de "}</span>
          <span className="text-teal-400">{followerName}</span>
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
