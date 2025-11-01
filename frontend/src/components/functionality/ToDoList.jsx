import {useEffect, useState} from 'react';
import itemService from '../../services/items.js'
import Select from '../custom/Select.jsx';
import SelectItem from '../custom/SelectItem.jsx';
import Input from '../custom/Input.jsx';
import ToDoItem from './ToDoItem.jsx';
import {priorities} from '../../utils/constants.js';

const ToDoList = () => {
    const [items, setItems] = useState([])
    const [groupBy, setGroupBy] = useState('priority')
    const sections = {priority: priorities}

    useEffect(() => {
        itemService.getAll().then(userItems => {
            setItems(userItems)
        }).catch(err => {
            console.log(err)
        })
    }, []);
    const listStyle = {
        padding: '5px 10px'
    }

    const handleGroupChange = (event) => {
        setGroupBy(event.target.value)
    }

    const createItem = (event) => {
        event.preventDefault()
        const text = event.target.newItem.value
        const newItem = {
            content: text
        }
        itemService.create(newItem).then(item => {
            setItems(items.concat(item))
        })
        event.target.newItem.value = ''
    }
    return (
        <div style={listStyle}>
            <Select label={'Group by'} variant={'outlined'} value={groupBy} changeHandle={handleGroupChange}>
                {Object.keys(sections).map(section => {
                    return <SelectItem value={section}>{section}</SelectItem>
                })}
            </Select>
            <div>
                {items.map(item => {
                    return <ToDoItem key={item.id} itemObject={item}/>
                })}
            </div>
            <div>
                <form onSubmit={createItem}>
                    <Input variant={'outlined'} placeholder={'New item...'} name={'newItem'}/>
                </form>
            </div>
        </div>
    )
}

export default ToDoList