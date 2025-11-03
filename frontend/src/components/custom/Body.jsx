import {forwardRef} from 'react';

const Body = forwardRef(({children, ...props}, ref) => {


    const bodyStyle = {
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
    }

    return <div style={bodyStyle} ref={ref} {...props}>
        {children}
    </div>
})

export default Body