import {useEffect, useState} from 'react';
import itemService from '../../services/items.js'
import Select from '../custom/Select.jsx';
import SelectItem from '../custom/SelectItem.jsx';
import ToDoItem from './ToDoItem.jsx';
import {priorities} from '../../utils/constants.js';
import ToDoItemForm from './ToDoItemForm.jsx';
import ToDoSection from './ToDoSection.jsx';

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

    const updateItem = (newItem) => {
        itemService.update(newItem).then(item => {
            const newItems = items.map((elem) => {
                if (elem.id === item.id) {
                    return item
                }
                return elem
            })
            setItems(newItems)
        })
    }
    return (
        <div style={listStyle}>
            <Select label={'Group by'} variant={'outlined'} value={groupBy} onChange={handleGroupChange}>
                {Object.keys(sections).map(section => {
                    return <SelectItem key={section} value={section}>{section}</SelectItem>
                })}
            </Select>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px', overflow: 'auto'}}>
                {Object.keys(sections[groupBy]).map(elem => {
                    const filteredItems = items.filter(item => {
                        return item[groupBy] == elem
                    })
                    return <ToDoSection key={sections[groupBy][elem]} name={sections[groupBy][elem]} items={filteredItems} handleUpdate={updateItem}/>
                })}
            </div>
            <ToDoItemForm handleUpdate={createItem}/>
        </div>
    )
}

export default ToDoList