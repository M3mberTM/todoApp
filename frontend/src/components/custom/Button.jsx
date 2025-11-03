import {useTheme} from '../../context/useTheme.js';
import {forwardRef, useState} from 'react';

const Button =forwardRef( ({children, ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const [isHover, setIsHover] = useState(false)

    const colors = getThemeColors()

    const bgColor = !ss.backgroundColor ? colors.bgSecondary : ss.backgroundColor
    const textColor = !ss.color ? colors.bg : ss.color
    const hoverColor = !ss.hover ? colors.hover : ss.hover
    const hoverTextColor = !ss.hoverText ? textColor : ss.hoverText
    const buttonStyle = {
        backgroundColor: isHover ? hoverColor : bgColor,
        color: isHover ? hoverTextColor : textColor,
        textAlign: 'center',
        padding: '5px 10px',
        height: '32px',
        display: 'inline-block',
        borderRadius: '5px',
        marginTop: '5px',
        fontWeight: 'bold',
        outline: 'none',
        border: 'none',
        ...ss
    }

    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return <button ref={ref} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        {children}
    </button>
})

export default Button