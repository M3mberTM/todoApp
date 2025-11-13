import {useTheme} from '../../context/theme/useTheme.js';

const Menu = ({children, ss={}}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const menuStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        overflow: 'hidden',
        ...ss
    }
    return (
        <div style={menuStyle}>
            {children}
        </div>
    )
}
export default Menu