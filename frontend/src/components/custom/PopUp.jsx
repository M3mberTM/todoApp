import { forwardRef, useRef, useState, useEffect } from 'react'

const PopUp = forwardRef(({ element, leaveOffset=500,verticalOffset=0,horizonalOffset=0, children, ...props }, ref) => {
    const elementRef = useRef(null)
    const popupRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const closeTimeout = useRef(null)

    useEffect(() => {
        if (open && elementRef.current && popupRef.current) {
            const rect = elementRef.current.getBoundingClientRect()
            const popupRect = popupRef.current.getBoundingClientRect()
            setPosition({
                top: rect.bottom + window.scrollY + verticalOffset, // 10px below trigger
                left: rect.right + window.scrollX - popupRect.width + horizonalOffset, // align right edges
            })
        }
    }, [open, children]) // recalc if children change width

    const addPopup = () => {
        if (closeTimeout.current)  {
            clearTimeout(closeTimeout.current)
        }
        setOpen(true)
    }

    const removePopup = () => {
        closeTimeout.current = setTimeout(() => setOpen(false), leaveOffset)
    }
    return (
        <div onMouseEnter={addPopup} onMouseLeave={removePopup} style={{display: 'flex', alignItems: 'center'}}>
            {/* trigger */}
            <div
                ref={elementRef}
            >
                {element}
            </div>

            {/* Floating popup */}
            {open && (
                <div
                    ref={node => {
                        popupRef.current = node
                        if (typeof ref === 'function') ref(node)
                        else if (ref) ref.current = node
                    }}
                    {...props}
                    style={{
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        zIndex: 9999,
                    }}
                >
                    {children}
                </div>
            )}
        </div>
    )
})

export default PopUp
