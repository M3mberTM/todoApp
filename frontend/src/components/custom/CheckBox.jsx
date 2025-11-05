import {forwardRef} from 'react';
import {useTheme} from '../../context/theme/useTheme.js';

const CheckBox = forwardRef(({ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const itemStyle = {
        backgroundColor: colors.bg,
        display: 'inline-block',
        ...ss
    }
    return <input style={itemStyle} type={'checkbox'} ref={ref} {...props}/>
})

export default CheckBox