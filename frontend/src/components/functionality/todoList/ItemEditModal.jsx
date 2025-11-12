import Modal from '../../custom/Modal.jsx';
import HoverIcon from '../../custom/HoverIcon.jsx';
import Input from '../../custom/Input.jsx';
import { BsXCircle, BsFillXCircleFill, BsClipboard2DataFill, BsAlarmFill } from 'react-icons/bs';
import Select from '../../custom/Select.jsx';
import SelectItem from '../../custom/SelectItem.jsx';
import Button from '../../custom/Button.jsx';
import Typography from '../../custom/Typography.jsx';
import {useState} from 'react';
import {useTheme} from '../../../context/theme/useTheme.js';
import {priorities} from '../../../utils/constants.js';

const ItemEditModal = ({isOpen, itemObject, closeModal, editItem, handleRemove}) => {
    const [error, setError] = useState('')
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const modalStyle = {
        width: '300px',
        flexDirection: 'column',
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        const priority = parseInt(event.target.priority.value)
        const date = event.target.date.value
        const time = event.target.time.value

        // no date or time means user doesn't want a deadline
        if (!date && !time) {
            const updatedItem = {
                id: itemObject.id,
                content,
                priority,
            }
            editItem(updatedItem)
            closeModal()
            return
        }

        if (!date) {
            // user deleted the date manually for some reason
            setError('You need to pick a date if you are picking time!')
            setTimeout(() => setError(''), 3000)
            return
        }
        const datetime = new Date(`${date} ${time}`)
        const updatedItem = {
            id: itemObject.id,
            content,
            priority,
            deadline: datetime.toISOString()
        }
        editItem(updatedItem)
        closeModal()
    }

    const getSplitDate = (date) => {
        if (!date) {
            return {date: null, time: null}
        }
        const dateObj = new Date(date)
        const inputDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
        const inputTime = `${dateObj.getHours()}:${dateObj.getMinutes()}`
        return {date: inputDate, time: inputTime}
    }

    const removeItem = () => {
        handleRemove(itemObject.id)
        closeModal()
    }

    const timestamps = getSplitDate(itemObject.deadline)

    return <Modal isOpen={isOpen} ss={modalStyle}>
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography size={'sub'}>#{itemObject.id}</Typography>
                <HoverIcon size={'20px'} NormalIcon={BsXCircle} HoveredIcon={BsFillXCircleFill} onClick={closeModal}/>
            </div>
            <Input placeholder={'Add item'} name={'content'} variant={'outlined'} ss={{width: '100%', marginBottom: '12px'}} required maxLength={45} defaultValue={itemObject.content}/>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                <BsClipboard2DataFill size={'20px'} style={{fill: colors.bgSecondary}}/>
                <Select name={'priority'} ss={{padding: '8px 4px 6px 4px', flex: '1'}} defaultValue={itemObject.priority.toString()}>
                    {Object.keys(priorities).map(elem => {
                        return <SelectItem key={elem} value={elem}>{priorities[elem]}</SelectItem>
                    })}
                </Select>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                <BsAlarmFill size={'20px'} style={{fill: colors.bgSecondary, marginRight: '5px'}}/>
                <Input name={'date'} type={'date'} variant={'theme'} ss={{colorScheme: localStorage.getItem('theme'), marginRight: '5px'}} defaultValue={timestamps.date}/>
                <Input name={'time'} type={'time'} variant={'theme'} ss={{colorScheme: localStorage.getItem('theme'), flex: '1'}} defaultValue={timestamps.time}/>
            </div>
            {error.length > 0 && <Typography size={'sub'}>{error}</Typography>}
            <Button type={'button'} onClick={removeItem} ss={{width: '100%', backgroundColor: colors.bg, color: colors.text}}>Remove</Button>
            <Button type={'submit'} ss={{width: '100%'}}>Update</Button>
        </form>
    </Modal>
}

export default ItemEditModal