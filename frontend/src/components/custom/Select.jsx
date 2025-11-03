import Typography from './Typography.jsx';
import {useTheme} from '../../context/useTheme.js';
import {forwardRef} from 'react';

const Select =forwardRef( ({children, label, variant='standard', name='select',ss={label: {}, select: {}}, ...props}, ref) => {
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
        ...baseStyle,
        ...ss.select
    }
    const chosenStyle = variant === 'outlined' ? outlinedStyle : standardStyle
    const labelStyle = {
        display: 'inline-block',
        ...ss.label
    }
    return (
        <div style={{display: 'inline-block'}}>
            <Typography ss={labelStyle} size={'h3'}>{label}</Typography>
            <select style={chosenStyle} name={name} ref={ref} {...props}>
                {children}
            </select>
        </div>
    )
})

export default Select