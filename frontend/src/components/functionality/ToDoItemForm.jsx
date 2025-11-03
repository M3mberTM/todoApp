import Input from "../custom/Input.jsx";

const ToDoItemForm = ({handleUpdate}) => {

    return <div>
        <form onSubmit={handleUpdate}>
            <Input variant={'outlined'} placeholder={'New item...'} name={'newItem'}/>
        </form>
    </div>

}

export default ToDoItemForm