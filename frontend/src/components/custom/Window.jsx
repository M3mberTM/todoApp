import {useTheme} from '../../context/theme/useTheme.js';

const Window = ({children}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const windowStyle = {
        width: '97%',
        minHeight: '93vh',
        height: '93vh',
        backgroundColor: colors.bg,
        borderRadius: '10px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column'
    }
    return (
        <div style={windowStyle}>
            {children}
        </div>
    )
}

export default Window