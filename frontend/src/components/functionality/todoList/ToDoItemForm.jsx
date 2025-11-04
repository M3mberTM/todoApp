import Input from '../../custom/Input.jsx';

const ToDoItemForm = ({createNewItem}) => {

    const handleCreate = (event) => {
        event.preventDefault()
        const content = event.target.newItem.value
        if (content.length > 0) {
            createNewItem(content)
        }
        event.target.newItem.value = ''
    }
    return <div>
        <form onSubmit={handleCreate}>
            <Input variant={'outlined'} placeholder={'New item...'} name={'newItem'}/>
        </form>
    </div>

}

export default ToDoItemForm