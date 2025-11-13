import {useTheme} from '../../context/theme/useTheme.js';
import Typography from '../custom/Typography.jsx';
import PopUp from '../custom/PopUp.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import {useNavigate, useLocation} from 'react-router-dom';
import {forwardRef} from 'react';

const Header =forwardRef( ({user, name, handleLogout,...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    const headerStyle = {
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: colors.bgSecondary,
        borderRadius: '10px 10px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 10px 5px',
    }

    const userIconStyle = {
        width: '33px',
        height: '33px',
        borderRadius: '20px',
        backgroundColor: colors.bg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <div style={headerStyle} ref={ref} {...props}>
            <Typography size={'h2'}>{name}</Typography>
            <PopUp
                element={<div style={userIconStyle}>{user.username.charAt(0)}</div>}
                leaveOffset={300}
                verticalOffset={5}
                horizonalOffset={10}
            >
                <Menu ss={{width: '250px', borderRadius: '10px', backgroundColor: colors.bgLight}}>
                    {path !== '/' && <MenuItem clickHandle={() => navigate('/')}>Home Page</MenuItem>}
                    {path !== '/settings' && <MenuItem clickHandle={() => navigate('/settings')}>Settings</MenuItem>}
                    <MenuItem clickHandle={() => handleLogout()}>Log out</MenuItem>
                </Menu>
            </PopUp>
        </div>
    )
})

export default Header