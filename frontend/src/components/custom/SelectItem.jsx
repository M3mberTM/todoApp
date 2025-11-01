import {useTheme} from '../../context/useTheme.js';

const SelectItem = ({value, children, variant='standard'}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const itemStyle = {
        backgroundColor: colors.bg,
        color: colors.text
    }
    const chosenStyle = variant==='standard' ? {} : itemStyle
    return (
        <option style={chosenStyle} value={value}>{children}</option>
    )
}

export default SelectItem