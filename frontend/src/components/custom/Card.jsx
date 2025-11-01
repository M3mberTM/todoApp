import {useTheme} from '../../context/useTheme.js';

const Card = ({children}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const cardStyle = {
        textAlign: 'center',
        width: '350px',
        backgroundColor: colors.bg,
        borderRadius: '10px',
        padding: '30px 10px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5)'
    }
    return (
        <div style={cardStyle}>
            {children}
        </div>
    )
}

export default Card
