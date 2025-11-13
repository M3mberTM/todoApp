import Window from '../../custom/Window.jsx';
import Header from '../Header.jsx';
import ToDoList from './ToDoList.jsx';
import TodoOptions from './TodoOptions.jsx';
import {useEffect, useState} from 'react';
import itemService from '../../../services/items.js'
import {useNotification} from '../../../context/notification/useNotification.js';

const HomePage = ({user, handleLogout}) => {
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    const [filteredItems, setFilteredItems] = useState([])
    const {addNotification} = useNotification()

    useEffect(() => {
        itemService.getAll().then(userItems => {
            const sorted = sortItems(userItems)
            setItems(sorted)
            setFilteredItems(sorted)
        }).catch(err => {
            addNotification(err.response.data.error, true)
        })
    }, []);

    const sortItems = (items) => {
        return items.toSorted((a,b)=> {
            const completedDif = a.isCompleted - b.isCompleted
            const updatedDif = a.updatedAt > b.updatedAt ? -1 : 1
            return completedDif*2 + updatedDif
        })
    }
    const createItem = (newItem) => {
        itemService.create(newItem).then(item => {
            setItems(sortItems(items.concat(item)))
        }).catch(error => {
            addNotification(error.response.data.error, true)
        })
    }

    const updateItem = (newItem) => {
        itemService.update(newItem).then(item => {
            const newItems = items.map((elem) => {
                if (elem.id === item.id) {
                    return item
                }
                return elem
            })
            setItems(sortItems(newItems))
        }).catch(err => {
            addNotification(err.response.data.error, true)
        })
    }

    const removeItem = (itemId) => {
        itemService.remove(itemId).then(() => {
            const newItems = items.filter((elem) => {
                return elem.id !== itemId
            })
            setItems(newItems)
        }).catch(err => {
            addNotification(err.response.data.error, true)
        })
    }

    const searchItems = (value) => {
        setSearch(value)
        setFilteredItems(items.filter(item=> item.content.includes(value)))
    }


    return (
        <Window>
            <Header name={'Todo List'} user={user} handleLogout={handleLogout}/>
            <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0'}}>
                <TodoOptions createItem={createItem} setSearch={searchItems} searchVal={search}/>
                <ToDoList items={filteredItems} handleUpdate={updateItem} handleRemove={removeItem}/>
            </div>
        </Window>
    )
}

export default HomePage