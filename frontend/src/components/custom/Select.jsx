import {useTheme} from '../../context/theme/useTheme.js';
import {forwardRef} from 'react';

const Select =forwardRef( ({children, variant='standard',ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const baseStyle = {
        marginLeft: '5px',
        padding: '5px 4px 5px 4px',
        display: 'inline-block',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        borderRadius: '5px',
        outline: 'none',
    }
    const outlinedStyle = {
        backgroundColor: colors.bg,
        color: colors.text,
        borderWidth: '0 0 3px 0',
        borderColor: colors.bgSecondary,
        borderStyle: 'solid',
        ...baseStyle,
        ...ss.select,
    }
    const standardStyle = {
        backgroundColor: colors.bg,
        borderWidth: '2px',
        borderColor: colors.bgSecondary,
        color: colors.text,
        ...baseStyle,
        ...ss
    }
    const chosenStyle = variant === 'outlined' ? outlinedStyle : standardStyle
    return (
        <select style={chosenStyle} ref={ref} {...props}>
            {children}
        </select>
    )
})

export default Select