import {useTheme} from '../../context/useTheme.js';
import {forwardRef} from 'react';

const Typography = forwardRef(({children, size='h1', ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const sizes = {h1: '40px', h2: '30px', h3: '20px', sub:'12px'}
    const textColors = {h1: colors.text, h2: colors.text, h3: colors.text, sub:colors.textSecondary}

    let textSize
    let textColor
    if(Object.keys(sizes).includes(size)) {
        textSize = sizes[size]
        textColor = textColors[size]
    } else {
        textSize = size
        textColor = colors.text
    }

    const Tag = ['h1', 'h2', 'h3', 'p', 'span'].includes(size) ? size : 'span';
    const textStyle = {
        fontSize: textSize,
        color: textColor,
        margin: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        ...ss
    }
    return (
        <Tag style={textStyle} ref={ref} {...props}>
            {children}
        </Tag>
    )
})

export default Typography