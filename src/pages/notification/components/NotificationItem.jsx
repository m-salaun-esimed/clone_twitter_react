import React, { Fragment, useEffect, useState } from 'react';
import { getName } from '../../../domains/user/user';
import { useSelector } from 'react-redux';

function NotificationItem({ notification, notificationType }) {
  const [userNames, setUserNames] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchNames = async () => {
      let response;
      if (notificationType === "follow") {
        response = await getName(notification.followerId);
        setUserNames([response.email]);
      } else if (notificationType === "like" && notification.notificationsLike && notification.notificationsLike.length > 0) {
        const likeUserNames = await Promise.all(
          notification.notificationsLike.map(async (likeNotification) => {
            const userResponse = await getName(likeNotification.userLikeId);
            return userResponse.email;
          })
        );
        setUserNames(likeUserNames);
      }
    };

    fetchNames();
  }, [notification, notificationType]);

  return (
    <Fragment>
      {/* Affichage des notifications de type "follow" */}
      {notificationType === "follow" && (
        <div
          key={notification.id}
          className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all duration-300"
        >
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">Abonnement de :</span>
            <span className="text-teal-400">{userNames[0]}</span> {/* Affiche le nom du follower */}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Le :</span>
            <span className="text-white">{notification.notificationDate}</span>
          </div>
        </div>
      )}

{notificationType === "like" &&
  notification.notificationsLike &&
  notification.notificationsLike.length > 0 && (
    <div
      key={notification.id}
      className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="text-white font-medium">
          Le tweet : "{notification.content}"
        </div>
        <span className="text-white font-medium">a été aimé par :</span>
        <div className="text-teal-400">
          {notification.notificationsLike.slice(0, 3).map((likeNotification, index) => (
            <div key={likeNotification.id}>
              {`Utilisateur : ${userNames[index]} - Date : ${likeNotification.notificationDate}`}
            </div>
          ))}
          {notification.notificationsLike.length > 3 && (
            <div className="text-gray-400">
              + {notification.notificationsLike.length - 3} autres...
            </div>
          )}
        </div>
      </div>
    </div>
  )}

    </Fragment>
  );
}

export default NotificationItem;
