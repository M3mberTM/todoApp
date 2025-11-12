import {useTheme} from '../../context/theme/useTheme.js';
import {forwardRef} from 'react';

const Input = forwardRef(({variant='standard', ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const baseStyle = {
        padding: '12px 8px 10px 8px',
        margin: '5px 0',
        display: 'inline-block',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        outline: 'none',
    }
    const standardInputStyle = {
        color: '#000000',
        backgroundColor: '#ffffff',
        borderColor: colors.bgSecondary,
        borderRadius: '5px',
        ...baseStyle,
        ...ss
    }

    const themedInputStyle = {
        color: colors.text,
        backgroundColor: colors.bg,
        borderColor: colors.bgSecondary,
        borderRadius: '5px',
        ...baseStyle,
        ...ss
    }

    const outlinedInputStyle = {
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: '5px 5px 0 0',
        borderWidth: '0 0 3px 0',
        borderColor: colors.bgSecondary,
        borderStyle: 'solid',
        ...baseStyle,
        ...ss
    }

    const styles = {standard: standardInputStyle, outlined: outlinedInputStyle,theme:themedInputStyle}

    let chosenStyle = styles[variant]
    if (!chosenStyle) {
        chosenStyle = standardInputStyle
    }

    return (
        <input style={chosenStyle} ref={ref} {...props}/>
    )
})

export default Input