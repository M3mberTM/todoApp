import Button from '../../custom/Button.jsx'
import ItemCreateModal from './ItemCreateModal.jsx';
import {useState} from 'react';
import Input from '../../custom/Input.jsx';

const TodoOptions = ({createItem}) => {
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 10px',
        alignItems: 'center'
    }

    const openCreateModal = () => {
        setIsCreateOpen(true)
    }

    const closeCreateModal = () => {
        setIsCreateOpen(false)
    }
    return <div style={itemStyle}>
        <ItemCreateModal isOpen={isCreateOpen} createItem={createItem} closeModal={closeCreateModal}/>
        <Input variant={'outlined'} placeholder={'Search...'}/>
        <Button onClick={openCreateModal} ss={{marginTop: '0'}}>Add new item</Button>
    </div>
}

export default TodoOptions