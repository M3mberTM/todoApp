import Window from '../custom/Window.jsx';
import Header from '../custom/Header.jsx';
import ToDoList from './ToDoList.jsx';

const ToDo = ({user, handleLogout}) => {

    return (
        <Window>
            <Header name={'Todo app'} user={user} handleLogout={handleLogout}/>
            <ToDoList/>
        </Window>
    )
}

export default ToDo