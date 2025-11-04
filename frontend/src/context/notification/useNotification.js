import {useContext} from 'react';
import NotifContext from './notifContext.js';

export const useNotification = () => useContext(NotifContext);
