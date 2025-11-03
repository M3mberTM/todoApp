import Window from '../../custom/Window.jsx';
import Header from '../../custom/Header.jsx';
import SideMenu from '../../custom/SideMenu.jsx';
import Body from '../../custom/Body.jsx';
import SideMenuItem from '../../custom/SideMenuItem.jsx';
import {useTheme} from '../../../context/useTheme.js';
import General from './General.jsx';
import UpdateUser from './UpdateUser.jsx';
import {useState, useEffect} from 'react';
import userService from '../../../services/users.js'

const Settings = ({user, handleLogout}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const pages = {GENERAL: 'general', UPDATE_USER: 'update'}
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
        userService.update(userObject).then(() => {
            // todo update the user specifics everywhere
            // todo if the user updated email or password, log him out
            handleLogout()
        })
    }

    return (
        <Window>
            <Header name={'Settings'} user={user} handleLogout={handleLogout}/>
            <Body>
                <SideMenu>
                    <SideMenuItem onClick={() => setPage(pages.GENERAL)}>General Information</SideMenuItem>
                    <SideMenuItem onClick={() => setPage(pages.UPDATE_USER)}>Update Information</SideMenuItem>
                    <SideMenuItem onClick={() => console.log('remove user')} ss={{color: colors.textSecondary}}>Remove User</SideMenuItem>
                </SideMenu>
                {page === pages.GENERAL && <General user={currUser}/>}
                {page === pages.UPDATE_USER && <UpdateUser user={currUser} handleUpdate={updateUser}/>}
            </Body>
        </Window>
    )
}

export default Settings
