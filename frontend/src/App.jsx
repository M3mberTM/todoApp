import Login from './components/functionality/Login.jsx';
import {useTheme} from './context/theme/useTheme.js';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import accessService from './services/access.js'
import Register from './components/functionality/Register.jsx';
import HomePage from './components/functionality/todoList/HomePage.jsx';
import ProtectedRoute from './components/functionality/ProtectedRoute.jsx';
import Settings from './components/functionality/Settings/Settings.jsx';
import utilService from './services/utils.js'
import Notification from './components/functionality/Notification.jsx';
import {useNotification} from './context/notification/useNotification.js';

function App() {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const {notification} = useNotification()
    const [user, setUser] = useState(() => {
        const loggedUser = window.sessionStorage.getItem('loggedInUser')
        const parsed = loggedUser ? JSON.parse(loggedUser) : null
        if (parsed !== null) {
            utilService.setToken(parsed.token)
        }
        return parsed
    })
    const navigate = useNavigate()

    const wrapperStyle = {
        backgroundImage: `url(${colors.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: colors.text,
        minHeight: '100vh',
        width: '100%',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box'
    }
    const handleLogin = async (credentials) => {
        try {
            const user = await accessService.login(credentials)
            window.sessionStorage.setItem('loggedInUser', JSON.stringify(user))
            setUser(user)
            navigate('/')
            utilService.setToken(user.token)
        } catch (e) {
            console.log(e)
        }
    }

    const handleRegister = async (credentials) => {
        try {
            await accessService.register(credentials)
            const loginCreds = {email: credentials.email, password: credentials.password}
            await handleLogin(loginCreds)
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogout = () => {
        window.sessionStorage.removeItem('loggedInUser')
        setUser(null)
        navigate('/login')
    }

    return (
        <div style={wrapperStyle}>
            <Notification type={notification.type}>{notification.msg}</Notification>
            <Routes>
                <Route path={'/login'} element={<Login handleLogin={handleLogin}/>}/>
                <Route path={'/register'} element={<Register handleRegister={handleRegister}/>}/>
                <Route path={'/'} element={<ProtectedRoute user={user}><HomePage user={user} handleLogout={handleLogout}/></ProtectedRoute>}/>
                <Route path={'/settings'} element={<ProtectedRoute user={user}><Settings user={user} handleLogout={handleLogout} setUser={setUser}/></ProtectedRoute>}/>
            </Routes>
        </div>
    )
}

export default App
