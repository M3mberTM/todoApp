import Typography from '../custom/Typography.jsx';
import {useTheme} from '../../context/theme/useTheme.js';

const MenuItem = ({children, clickHandle, size='15px', ss={}}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const menuItemStyle = {
        border: '1px solid',
        borderColor: colors.textSecondary,
        backgroundColor: colors.bg,
        textAlign: 'center',
        padding: '3px 10px',
        ...ss
    }
    return (
        <div onClick={clickHandle} style={menuItemStyle}>
            <Typography size={size}>{children}</Typography>
        </div>
    )
}

export default MenuItem