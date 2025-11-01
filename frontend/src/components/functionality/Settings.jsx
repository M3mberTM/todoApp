import Window from '../custom/Window.jsx';
import Header from './Header.jsx';

const Settings = ({user, handleLogout}) => {

    return (
        <Window>
            <Header name={'Settings'} user={user} handleLogout={handleLogout}/>
        </Window>
    )
}

export default Settings
