import Typography from '../../custom/Typography.jsx';
import {priorities} from '../../../utils/constants.js';
import {useTheme} from '../../../context/theme/useTheme.js';
import CheckBox from '../../custom/CheckBox.jsx';
import ItemEditModal from './ItemEditModal.jsx';
import {useState} from 'react';

const ToDoItem = ({itemObject, handleRemove, handleUpdate}) => {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()


    let priorityColor
    if (itemObject.priority === 1) {
        priorityColor = colors.lowPriority
    } else if (itemObject.priority === 2) {
        priorityColor = colors.mediumPriority
    } else if (itemObject.priority === 3) {
        priorityColor = colors.highPriority
    } else {
        priorityColor = colors.bgLight
    }

    const itemStyle = {
        width: '20vw',
        minWidth: '200px',
        backgroundColor: priorityColor,
        padding: '5px 10px',
        borderRadius: '5px',
        marginBottom: '5px',
        marginTop: '5px'
    }


    const getDeadline = (deadline) => {
        const date = new Date(deadline)
        return `${date.getDate()}/${date.getUTCMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }

    const isDeadlinePassed = (deadline) => {
        if (!deadline) {
            return false
        }
        const currDate = new Date()
        const deadlineDate = new Date(deadline)
        return deadlineDate < currDate
    }

    const passedDateStyle = {
        color: '#ff0000',
    }

    const openEditModal = () => {
        setIsEditOpen(true)
    }

    const closeEditModal = () => {
        setIsEditOpen(false)
    }

    return (
        <div>
            <ItemEditModal itemObject={itemObject} closeModal={closeEditModal} isOpen={isEditOpen} editItem={handleUpdate}/>
            <div style={itemStyle} onClick={() => openEditModal()}>
                <div style={{display: 'flex'}}>
                    <CheckBox onChange={() => handleRemove(itemObject.id)}/>
                    <div style={{display: 'flex', alignItems: 'center', flex: '1', paddingLeft: '5px'}}>
                        <Typography size={'15px'} ss={{flex:'1'}}>{itemObject.content}</Typography>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography size={'sub'} onClick={() => console.log('priority')}>{priorities[itemObject.priority]}</Typography>
                    <Typography size={'sub'} ss={isDeadlinePassed(itemObject.deadline) ? passedDateStyle : {}}>{!itemObject.deadline ? 'No deadline': getDeadline(itemObject.deadline)}</Typography>
                </div>
            </div>
        </div>
    )
}

export default ToDoItem