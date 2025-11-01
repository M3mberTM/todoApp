import Typography from './Typography.jsx';
import {useTheme} from "../../context/useTheme.js";

const Select = ({children, label, value, changeHandle, variant='standard', name='select',ss={label: {}, select: {}}}) => {
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
            <select style={chosenStyle} name={name} value={value} onChange={changeHandle}>
                {children}
            </select>
        </div>
    )
}

export default Select