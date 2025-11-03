import {useTheme} from '../../context/useTheme.js';
import {forwardRef} from 'react';

const SelectItem =forwardRef( ({children, variant='standard', ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const itemStyle = {
        backgroundColor: colors.bg,
        color: colors.text
    }
    const chosenStyle = variant==='standard' ? {} : itemStyle
    return (
        <option style={chosenStyle} ref={ref} {...props}>{children}</option>
    )
})

export default SelectItem