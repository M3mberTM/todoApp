import {useTheme} from '../../context/theme/useTheme.js';
import Typography from '../custom/Typography.jsx';
import PopUp from '../custom/PopUp.jsx';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import {useNavigate} from 'react-router-dom';
import {forwardRef} from 'react';

const Header =forwardRef( ({user, name, handleLogout,...props}, ref) => {
    const {theme, toggleTheme, getThemeColors} = useTheme()
    const colors = getThemeColors()
    const navigate = useNavigate()

    const headerStyle = {
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: colors.bgSecondary,
        borderRadius: '10px 10px 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 10px 5px',
    }
    return (
        <div style={headerStyle} ref={ref} {...props}>
            <Typography size={'h2'}>{name}</Typography>
            <PopUp
                element={<Typography size={'h3'}>{user.username}</Typography>}
                leaveOffset={300}
            >
                <Menu ss={{width: '300px'}}>
                    <MenuItem clickHandle={() => toggleTheme(theme === 'dark' ? 'light':'dark')}>Switch to {theme === 'dark' ? 'light':'dark'} theme</MenuItem>
                    <MenuItem clickHandle={() => navigate('/')}>Home Page</MenuItem>
                    <MenuItem clickHandle={() => navigate('/settings')}>Settings</MenuItem>
                    <MenuItem clickHandle={() => handleLogout()}>Log out</MenuItem>
                </Menu>
            </PopUp>
        </div>
    )
})

export default Header