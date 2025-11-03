import {useTheme} from '../../context/useTheme.js';
import {forwardRef} from 'react';

const Input = forwardRef(({placeholder, variant='standard', ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const standardInputStyle = {
        padding: '12px 8px 10px 8px',
        margin: '5px 0',
        display: 'inline-block',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        borderRadius: '5px',
        borderColor: colors.bgSecondary,
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
        <input style={chosenStyle} placeholder={placeholder} ref={ref} {...props}/>
    )
})

export default Input