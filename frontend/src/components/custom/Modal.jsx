import {forwardRef} from 'react';
import {useTheme} from '../../context/theme/useTheme.js';

const Modal = forwardRef(({isOpen=false, children, ss={}, ...props}, ref) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    if (!isOpen) {
        return null
    }

    const mainStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '1000'
    }

    const bodyStyle = {
        display: 'flex',
        backgroundColor: colors.bgLight,
        padding: '15px 10px',
        borderRadius: '10px',
        ...ss
    }

    return <div style={mainStyle} ref={ref} >
        <div style={bodyStyle} {...props}>
            {children}
        </div>
    </div>
})

export default Modal
