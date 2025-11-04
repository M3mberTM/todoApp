import {useTheme} from '../../context/theme/useTheme.js';
const Notification = ({children, type='info'}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const notifStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        marginTop: '5px',
        padding: '15px 30px',
        width: '97%',
        top: '0',
        borderRadius: '10px',
        backgroundColor: colors.bg,
        color: colors.text,
        border: '2px solid',
        borderColor: type==='error' ? '#ff0000': colors.bgSecondary
    }
    if (!children) {
        return null
    }
    return <div style={notifStyle}>
        {children}
    </div>
}

export default Notification