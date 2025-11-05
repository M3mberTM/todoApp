import Window from '../../custom/Window.jsx';
import Header from '../Header.jsx';
import ToDoList from './ToDoList.jsx';
import TodoOptions from './TodoOptions.jsx';
import {useEffect, useState} from 'react';
import itemService from '../../../services/items.js'
import {useNotification} from '../../../context/notification/useNotification.js';

const HomePage = ({user, handleLogout}) => {
    const [groupBy, setGroupBy] = useState('None')
    const [items, setItems] = useState([])
    const {addNotification} = useNotification()

    useEffect(() => {
        itemService.getAll().then(userItems => {
            setItems(userItems)
        }).catch(err => {
            addNotification(err.response.data.error, true)
        })
    }, []);

    const createItem = (content) => {
        const newItem = {
            content
        }
        itemService.create(newItem).then(item => {
            setItems(items.concat(item))
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
            setItems(newItems)
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
    return (
        <Window>
            <Header name={'Todo app'} user={user} handleLogout={handleLogout}/>
            <div style={{marginTop: '10px'}}>
                <TodoOptions groupBy={groupBy} setGroupBy={setGroupBy} createItem={createItem}/>
                <ToDoList items={items} groupBy={groupBy} handleUpdate={updateItem} handleRemove={removeItem}/>
            </div>
        </Window>
    )
}

export default HomePage