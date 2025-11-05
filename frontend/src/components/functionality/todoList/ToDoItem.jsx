import Typography from '../../custom/Typography.jsx';
import {priorities} from '../../../utils/constants.js';
import {useTheme} from '../../../context/theme/useTheme.js';
import {useState} from 'react';
import Input from '../../custom/Input.jsx';
import Select from '../../custom/Select.jsx';
import SelectItem from '../../custom/SelectItem.jsx';
import Button from '../../custom/Button.jsx';
import CheckBox from '../../custom/CheckBox.jsx';

const ToDoItem = ({itemObject, handleUpdate, handleRemove}) => {
    const [isUpdate, setIsUpdate] = useState(false)
    const [content, setContent] = useState(itemObject.content)
    const [currPriority, setCurrPriority] = useState(itemObject.priority)
    const [deadline, setDeadline] = useState(!itemObject.deadline ? undefined: itemObject.deadline.slice(0,-1))
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const itemStyle = {
        width: '200px',
        backgroundColor: colors.bgLight,
        padding: '5px 10px',
        borderRadius: '5px',
        marginBottom: '5px',
        marginTop: '5px'
    }
    let priorityColor
    if (itemObject.priority === 1) {
        priorityColor = colors.lowPriority
    } else if (itemObject.priority === 2) {
        priorityColor = colors.mediumPriority
    } else if (itemObject.priority === 3) {
        priorityColor = colors.highPriority
    } else {
        priorityColor = colors.text
    }

    const updateItem = (event) => {
        event.preventDefault()
        // check everything that has changed compared to original
        const changedObject = {id: itemObject.id}
        if (currPriority !== itemObject.priority) {
            changedObject['priority'] = parseInt(currPriority)
        }
        if (content !== itemObject.content) {
            changedObject['content'] = content
        }
        if (deadline !== itemObject.deadline) {
            changedObject['deadline'] = deadline
        }
        if (Object.keys(changedObject).length < 2) {
            console.log('nothing was changed')
            return
        }
        handleUpdate(changedObject)
        setIsUpdate(false)
        resetForm()
    }

    const resetForm = () => {
        setContent(itemObject.content)
        setCurrPriority(itemObject.priority)
        setDeadline(!itemObject.deadline ? undefined: itemObject.deadline.slice(0,-1))
        setIsUpdate(false)
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
    if (isUpdate) {
        return (
            <div style={itemStyle}>
                <form onSubmit={updateItem}>
                    <Input variant={'outlined'} name={'content'} value={content} onChange={(event) => setContent(event.target.value)} ss={{padding: '6px 4px 5px 4px', width: '100%'}}/>
                    <Input type={'datetime-local'} variant={'outlined'} value={deadline} onChange={(event)=>setDeadline(event.target.value)} ss={{padding: '6px 4px 5px 4px', margin: '0'}}/>
                    <Select name={'priority'} variant={'outlined'} value={currPriority} onChange={(event)=> setCurrPriority(event.target.value)} ss={{select: {marginLeft: '0', marginTop: '5px', borderRadius: '5px 5px 0 0'}}}>
                        {Object.keys(priorities).map((priority) => {
                            return <SelectItem value={priority} key={priority}>{priorities[priority]}</SelectItem>
                        })}
                    </Select>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type={'button'} onClick={() => resetForm()}>Cancel</Button>
                        <Button type={'submit'} ss={{marginLeft: '5px'}}>Done</Button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div style={itemStyle} onDoubleClick={() => setIsUpdate(true)}>
            <div style={{display: 'flex'}}>
                <CheckBox onChange={() => handleRemove(itemObject.id)}/>
                <Typography size={'15px'} ss={{flex:'1'}}>{itemObject.content}</Typography>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography size={'sub'} ss={{color: priorityColor}} onClick={() => console.log('priority')}>{priorities[itemObject.priority]}</Typography>
                <Typography size={'sub'} ss={isDeadlinePassed(itemObject.deadline) ? passedDateStyle : {}}>{!itemObject.deadline ? 'No deadline': getDeadline(itemObject.deadline)}</Typography>
            </div>
        </div>
    )
}

export default ToDoItem