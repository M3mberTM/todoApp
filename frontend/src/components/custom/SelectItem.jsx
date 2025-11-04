import {forwardRef} from 'react';

const SelectItem =forwardRef( ({children, ss={}, ...props}, ref) => {
    const itemStyle = {
        ...ss
    }
    return (
        <option style={itemStyle} ref={ref} {...props}>{children}</option>
    )
})

export default SelectItem