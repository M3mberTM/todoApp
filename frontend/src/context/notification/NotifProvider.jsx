import React, { useState } from 'react';
import NotifContext from './notifContext.js';

const NotifProvider = ({ children }) => {
    const defaultVal = {msg: undefined, type: undefined}
    const [notification, setNotification] = useState(defaultVal);

    const addNotification = (message, isError) => {
        setNotification({msg: message, type: isError ? 'error' : 'info'})
        setTimeout(()=> {
            setNotification(defaultVal)
        }, 3000)
    }
    return (
        <NotifContext.Provider value={{notification, addNotification}}>
            {children}
        </NotifContext.Provider>
    );
};


export default NotifProvider
