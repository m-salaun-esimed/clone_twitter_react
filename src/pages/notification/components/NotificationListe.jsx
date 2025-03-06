import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationsFollow, fetchNotificationsLike } from '../../../shared/store/notificationSlice';
import Loading from '../../../shared/components/Loading';
import NotificationItem from './NotificationItem';

function NotificationListe() {
    const notificationsFollow = useSelector((state) => state.notification.notifications);
    const notificationsLike = useSelector((state) => state.notification.notificationsLike);

    const userId = useSelector((state) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(true);
    const [notificationType, setNotificationType] = useState('follow');

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchNotificationsFollow({ userId }));
            dispatch(fetchNotificationsLike({ userId }));
            setIsLoading(false);
        };

        fetchData();
    }, [userId, dispatch, notificationType]);

    const handleSelectChange = (event) => {
        setNotificationType(event.target.value);
    };

    const notificationsToDisplay = notificationType === 'follow' ? notificationsFollow : notificationsLike;

    return (
        <Fragment>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-white text-xl font-bold">NOTIFICATION</h1>
                <select 
                    value={notificationType} 
                    onChange={handleSelectChange} 
                    className="bg-gray-800 text-white px-3 py-1 rounded">
                    <option value="follow">Abonnement</option>
                    <option value="like">j'aime</option>
                </select>
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    <Loading />
                ) : (
                    Array.isArray(notificationsToDisplay) && notificationsToDisplay.length > 0 ? (
                        notificationsToDisplay.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                notificationType={notificationType}
                            />
                        ))
                    ) : (
                        <p className='text-white'>Aucune notification pour le moment !</p>
                    )
                )}
            </div>
        </Fragment>
    );
}

export default NotificationListe;
