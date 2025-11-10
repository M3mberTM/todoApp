import {forwardRef} from 'react';
import {useTheme} from '../../context/theme/useTheme.js';
import {useState} from 'react';

const HoverIcon = forwardRef(({ NormalIcon, HoveredIcon, ss={}, ...props}, ref) => {
    const [isHover, setIsHover] = useState(false)
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const iconStyle = {
        fill: colors.bgSecondary,
        ...ss
    }
    return <div style={{display: 'inline-block'}} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} ref={ref}>
        {isHover ? <HoveredIcon style={iconStyle} {...props}/> : <NormalIcon style={iconStyle} {...props}/>}
    </div>

})

export default HoverIcon
