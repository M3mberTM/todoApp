import PropTypes from 'prop-types'
import {useTheme} from '../../context/useTheme.js';

const Input = ({placeholder, inputType='text', variant='standard', ss={}}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const standardInputStyle = {
        padding: '12px 8px 10px 8px',
        margin: '5px 0',
        display: 'inline-block',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        borderRadius: '5px',
        outline: 'none',
        ...ss
    }

    const outlinedInputStyle = {
        padding: '12px 8px 10px 8px',
        margin: '5px 0',
        backgroundColor: colors.bg,
        color: colors.text,
        display: 'inline-block',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        borderRadius: '5px 5px 0 0',
        borderWidth: '0 0 3px 0',
        borderColor: colors.bgSecondary,
        borderStyle: 'solid',
        outline: 'none',
        ...ss
    }

    const chosenStyle = variant === 'standard' ? standardInputStyle : outlinedInputStyle

    return (
        <input style={chosenStyle} type={inputType} placeholder={placeholder}/>
    )
}

Input.propTypes = {
    inputType: PropTypes.string,
    variant: PropTypes.oneOf(['standard', 'outlined']),
    placeholder: PropTypes.string,
    ss: PropTypes.object
}
export default Input