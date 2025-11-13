import {forwardRef, useState} from 'react';

const SideMenuItem = forwardRef(({children, ss={}, ...props}, ref) => {
    const [isHover, setIsHover] = useState(false)

    const itemStyle = {
        textAlign: 'center',
        padding: '12px 10px',
        fontWeight: 'bold',
        fontSize: '17px',
        borderRadius: '7px',
        marginBottom: '5px',
        filter: isHover ? 'brightness(70%)' : '',
        ...ss
    }
    return <div style={itemStyle} ref={ref} {...props} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>
        {children}
    </div>
})

export default SideMenuItem