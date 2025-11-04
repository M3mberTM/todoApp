import Window from '../../custom/Window.jsx';
import Header from '../Header.jsx';
import SideMenu from '../../custom/SideMenu.jsx';
import Body from '../../custom/Body.jsx';
import SideMenuItem from '../../custom/SideMenuItem.jsx';
import {useTheme} from '../../../context/theme/useTheme.js';
import General from './General.jsx';
import UpdateUser from './UpdateUser.jsx';
import {useState, useEffect} from 'react';
import userService from '../../../services/users.js'
import RemoveUser from './RemoveUser.jsx';
import {useNotification} from '../../../context/notification/useNotification.js';

const Settings = ({user, handleLogout, setUser}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const {addNotification} = useNotification()
    const pages = {GENERAL: 'general', UPDATE_USER: 'update', REMOVE_USER: 'remove'}
    const [page, setPage] = useState(pages.GENERAL)
    const [currUser, setCurrUser] = useState()

    useEffect(() => {
        userService.get().then(loggedUser => {
            setCurrUser(loggedUser)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const updateUser = (userObject) => {
        userService.update(userObject).then((updatedUser) => {
            if (!userObject.currentPassword) {
                const oldLogin = JSON.parse(window.sessionStorage.getItem('loggedInUser'))
                const newLogin = {token: oldLogin.token, username: updatedUser.username, email: updatedUser.email}
                window.sessionStorage.setItem('loggedInUser', JSON.stringify(newLogin))
                setUser(newLogin)
            } else {
                // sensitive fields were changed. User should log in again
                handleLogout()
            }
        }).catch(e => {
            addNotification(e.response.data.error, true)
        })
    }

    const removeUser = (password) => {
        if (password && password.length > 0) {
            const userObject = {currentPassword: password, id: currUser.id}
            userService.remove(userObject).then(() => {
                handleLogout()
            }).catch(e => {
                addNotification(e.response.data.error, true)
            })
        }
    }

    return (
        <Window>
            <Header name={'Settings'} user={user} handleLogout={handleLogout}/>
            <Body>
                <SideMenu>
                    <SideMenuItem onClick={() => setPage(pages.GENERAL)}>General Information</SideMenuItem>
                    <SideMenuItem onClick={() => setPage(pages.UPDATE_USER)}>Update Information</SideMenuItem>
                    <SideMenuItem onClick={() => setPage(pages.REMOVE_USER)} ss={{color: colors.textSecondary}}>Delete User</SideMenuItem>
                </SideMenu>
                {page === pages.GENERAL && <General user={currUser}/>}
                {page === pages.UPDATE_USER && <UpdateUser user={currUser} handleUpdate={updateUser}/>}
                {page === pages.REMOVE_USER && <RemoveUser handleRemove={removeUser}/>}
            </Body>
        </Window>
    )
}

export default Settings
