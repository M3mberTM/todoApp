import {forwardRef} from 'react';
import {useTheme} from '../../context/theme/useTheme.js';

const SideMenu = forwardRef(({children, ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const menuStyle = {
        borderRight: '2px solid',
        padding: '10px 7px',
        borderColor: colors.bgSecondary,
        display: 'flex',
        flexDirection: 'column',
        ...ss
    }
    return (<div style={menuStyle} ref={ref} {...props}>
        {children}
    </div>)
})

export default SideMenu