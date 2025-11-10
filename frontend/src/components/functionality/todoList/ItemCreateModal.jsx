import Modal from '../../custom/Modal.jsx';
import Input from '../../custom/Input.jsx';
import Button from '../../custom/Button.jsx';
import Select from '../../custom/Select.jsx';
import SelectItem from '../../custom/SelectItem.jsx';
import {priorities} from '../../../utils/constants.js';
import { BsXCircle, BsFillXCircleFill, BsClipboard2DataFill, BsAlarmFill } from 'react-icons/bs';
import HoverIcon from '../../custom/HoverIcon.jsx';
import {useTheme} from '../../../context/theme/useTheme.js';
import Typography from '../../custom/Typography.jsx';
import {useState} from 'react';

const ItemCreateModal = ({isOpen, createItem, closeModal}) => {
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
            const itemObject = {
                content,
                priority,
            }
            createItem(itemObject)
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
        const itemObject = {
            content,
            priority,
            deadline: datetime.toISOString()
        }
        createItem(itemObject)
        closeModal()
    }

    const addDate = (event) => {
        const form = event.target.form
        const dateInput = form.elements.namedItem('date')
        if (!dateInput.value) {
            const currDate = new Date()
            dateInput.value = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`
        }
    }

    return <Modal isOpen={isOpen} ss={modalStyle}>
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <HoverIcon size={'20px'} NormalIcon={BsXCircle} HoveredIcon={BsFillXCircleFill} onClick={closeModal}/>
            </div>
            <Input placeholder={'Add item'} name={'content'} variant={'outlined'} ss={{width: '100%', marginBottom: '12px'}} required maxLength={45}/>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                <BsClipboard2DataFill size={'20px'} style={{fill: colors.bgSecondary}}/>
                <Select name={'priority'} ss={{padding: '8px 4px 6px 4px', flex: '1'}}>
                    {Object.keys(priorities).map(elem => {
                        return <SelectItem key={elem} value={elem}>{priorities[elem]}</SelectItem>
                    })}
                </Select>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                <BsAlarmFill size={'20px'} style={{fill: colors.bgSecondary, marginRight: '5px'}}/>
                <Input name={'date'} type={'date'} variant={'theme'} ss={{colorScheme: localStorage.getItem('theme'), marginRight: '5px'}}/>
                <Input name={'time'} type={'time'} variant={'theme'} onInput={addDate} ss={{colorScheme: localStorage.getItem('theme'), flex: '1'}}/>
            </div>
            {error.length > 0 && <Typography size={'sub'}>{error}</Typography>}
            <Button type={'submit'} ss={{width: '100%'}}>Add</Button>
        </form>
    </Modal>
}

export default ItemCreateModal