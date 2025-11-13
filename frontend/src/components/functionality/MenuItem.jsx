import {useTheme} from '../../context/theme/useTheme.js';
import {useState} from 'react';

const MenuItem = ({children, clickHandle, ss={}}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const [isHover, setIsHover] = useState(false)

    const hoverBackgroundColor = !ss.hoverBackgroundColor ? colors.bgSecondary : ss.hoverBackgroundColor
    const hoverColor = !ss.hoverColor ? colors.text : ss.hoverColor
    const bgColor = !ss.backgroundColor ? colors.bgLight : ss.backgroundColor
    const textColor = !ss.color ? colors.text : ss.color

    const {backgroundColor: _bg, color: _c, ...styles} = ss
    const menuItemStyle = {
        textAlign: 'center',
        padding: '10px 10px',
        backgroundColor: isHover ? hoverBackgroundColor : bgColor,
        color: isHover ? hoverColor : textColor,
        ...styles
    }
    return (
        <div onClick={clickHandle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} style={menuItemStyle}>
            {children}
        </div>
    )
}

export default MenuItem