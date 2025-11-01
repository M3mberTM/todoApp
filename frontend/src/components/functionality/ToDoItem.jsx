import Typography from '../custom/Typography.jsx';
import {priorities} from '../../utils/constants.js';
import {useTheme} from '../../context/useTheme.js';
import {useState} from 'react';
import Input from '../custom/Input.jsx';
import Select from '../custom/Select.jsx';
import SelectItem from '../custom/SelectItem.jsx';

const ToDoItem = ({itemObject, handleUpdate}) => {
    const [isUpdate, setIsUpdate] = useState(false)
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

    if (isUpdate) {
        return (
            <div style={itemStyle}>
                <form>
                    <Input variant={'outlined'} name={'content'} placeholder={itemObject.content} ss={{padding: '6px 4px 5px 4px', width: '100%'}}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Select name={'priority'} variant={'outlined'} ss={{select: {marginLeft: '0'}}}>
                            {Object.keys(priorities).map((priority) => {
                                return <SelectItem value={priority} key={priority}>{priorities[priority]}</SelectItem>
                            })}
                        </Select>
                        <Input type={'date'} variant={'outlined'} ss={{padding: '6px 4px 5px 4px'}}/>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div style={itemStyle} onDoubleClick={() => setIsUpdate(true)}>
            <Typography size={'15px'}>{itemObject.content}</Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography size={'sub'} ss={{color: priorityColor}} onClick={() => console.log('priority')}>{priorities[itemObject.priority]}</Typography>
                <Typography size={'sub'}>{!itemObject.deadline ? 'No deadline': itemObject.deadline}</Typography>
            </div>
        </div>
    )
}

export default ToDoItem