import PropTypes from 'prop-types'
import {useTheme} from '../../context/useTheme.js';
import {useState} from 'react';

const Button = ({title, handleClick, ss={}}) => {
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
        display: 'inline-block',
        borderRadius: '5px',
        marginTop: '5px',
        fontWeight: 'bold',
        ...ss
    }

    const handleMouseEnter = () => {
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return <div style={buttonStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
    </div>
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    ss: PropTypes.object
}


export default Button