import {forwardRef} from 'react';
import {useTheme} from '../../context/useTheme.js';

const SideMenuItem = forwardRef(({children, ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const itemStyle = {
        textAlign: 'center',
        borderBottom: '1px solid',
        borderColor: colors.bgSecondary,
        padding: '15px 10px',
        fontWeight: 'bold',
        fontSize: '17px',
        ...ss
    }
    return <div style={itemStyle} ref={ref} {...props}>
        {children}
    </div>
})

export default SideMenuItem