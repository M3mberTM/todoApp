import {forwardRef} from 'react';

const Conditional = forwardRef(({children, condition, ...props}, ref) => {

    if (!condition) {
        return null
    }
    return <div ref={ref} {...props}>
        {children}
    </div>
})

export default Conditional