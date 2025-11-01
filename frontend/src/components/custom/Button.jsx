import PropTypes from 'prop-types'
import {useTheme} from '../../context/useTheme.js';
import {useState} from 'react';

const Button = ({title, handleClick, type, ss={}}) => {
    const {getThemeColors} = useTheme()
    const [isHover, setIsHover] = useState(false)

    const colors = getThemeColors()

    const bgColor = !ss.backgroundColor ? colors.bgSecondary : ss.backgroundColor
    const textColor = !ss.color ? colors.bg : ss.color
    const hoverColor = !ss.hover ? colors.hover : ss.hover
    const buttonStyle = {
        backgroundColor: isHover ? hoverColor : bgColor,
        color: textColor,
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

    return <button type={type} style={buttonStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
    </button>
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    ss: PropTypes.object,
    type: PropTypes.string
}


export default Button