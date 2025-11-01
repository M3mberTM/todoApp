import {useTheme} from '../../context/useTheme.js';

const Menu = ({children, ss={}}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const menuStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        ...ss
    }
    return (
        <div style={menuStyle}>
            {children}
        </div>
    )
}
export default Menu