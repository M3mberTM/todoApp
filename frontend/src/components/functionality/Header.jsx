import {useTheme} from '../../context/useTheme.js';
import Typography from '../custom/Typography.jsx';
import Popup from 'reactjs-popup';
import Menu from './Menu.jsx';
import MenuItem from './MenuItem.jsx';
import {useNavigate} from 'react-router-dom';

const Header = ({user, name, handleLogout}) => {
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
        marginBottom: '10px'
    }
    return (
        <div style={headerStyle}>
            <Typography size={'h2'}>{name}</Typography>
            <Popup
                trigger={<Typography size={'h3'}>{user.username} </Typography>}
                position="bottom center"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                arrow={false}
            >
                <Menu ss={{width: '200px'}}>
                    <MenuItem clickHandle={() => toggleTheme(theme === 'dark' ? 'light':'dark')}>Switch to {theme === 'dark' ? 'light':'dark'} theme</MenuItem>
                    <MenuItem clickHandle={() => navigate('/')}>Home Page</MenuItem>
                    <MenuItem clickHandle={() => navigate('/settings')}>Settings</MenuItem>
                    <MenuItem clickHandle={() => handleLogout()}>Log out</MenuItem>
                </Menu>
            </Popup>
        </div>
    )
}

export default Header