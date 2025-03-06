import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationsFollow } from '../../../shared/store/notificationSlice';
import Loading from '../../../shared/components/Loading';
import Notification from '../Notification';
import NotificationItem from './NotificationItem';

function NotificationListe() {
    const notifications = useSelector((state) => state.notification.notifications);
    const userId = useSelector((state) => state.auth.userId);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchNotificationsFollow({ userId }));
            setIsLoading(false)
        };

        fetchData();
    }, [userId, dispatch]);

    return (
        <Fragment>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-white text-xl font-bold">NOTIFICATION</h1>
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    <Loading />
                ) : (
                    Array.isArray(notifications) && notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
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
