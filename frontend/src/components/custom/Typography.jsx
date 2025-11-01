import {useTheme} from '../../context/useTheme.js';
const Typography = ({children, size='h1', ss}) => {
    const sizes = {h1: '40px', h2: '20px', h3: '10px'}
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    let textSize
    if(Object.keys(sizes).includes(size)) {
        textSize = sizes[size]
    } else {
        textSize = size
    }


    const textStyle = {
        fontSize: textSize,
        color: colors.text,
        display: 'inline-block',
        ...ss
    }
    return (
        <div style={textStyle}>
            {children}
        </div>
    )
}

export default Typography