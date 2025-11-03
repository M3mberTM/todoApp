import {forwardRef} from 'react';
import {useTheme} from '../../context/useTheme.js';

const SideMenu = forwardRef(({children, ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const menuStyle = {
        borderRight: '2px solid',
        borderColor: colors.bgSecondary,
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        ...ss
    }
    return (<div style={menuStyle} ref={ref} {...props}>
        {children}
    </div>)
})

export default SideMenu