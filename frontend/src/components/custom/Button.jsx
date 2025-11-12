import {useTheme} from '../../context/theme/useTheme.js';
import {forwardRef, useState} from 'react';

const Button =forwardRef( ({children, ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const [isHover, setIsHover] = useState(false)

    const colors = getThemeColors()


    const baseStyle = {
        textAlign: 'center',
        padding: '5px 10px',
        height: '32px',
        display: 'inline-block',
        borderRadius: '5px',
        marginTop: '5px',
        fontWeight: 'bold',
        outline: 'none',
        ...ss
    }

    const buttonStyle = {
        backgroundColor: colors.bgSecondary,
        color: colors.bg,
        filter: isHover ? 'brightness(70%)' : '',
        border: 'none',
        ...baseStyle,
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