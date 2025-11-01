import Login from './components/functionality/Login.jsx';
import {useTheme} from './context/useTheme.js';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import accessService from './services/access.js'
import Register from './components/functionality/Register.jsx';
import ToDo from './components/functionality/ToDo.jsx';
import ProtectedRoute from './components/functionality/ProtectedRoute.jsx';
import Settings from './components/functionality/Settings.jsx';
import utilService from './services/utils.js'

function App() {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
    const [user, setUser] = useState(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
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
        console.log('loggin in with: ', credentials)
        try {
            const user = await accessService.login(credentials)

            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            setUser(user)
            navigate('/')
            utilService.setToken(user.token)
        } catch (e) {
            console.log('wrong credentials')
        }
    }

    const handleRegister = async (credentials) => {
        console.log('Registering with user: ', credentials)
        try {
            await accessService.register(credentials)
            const loginCreds = {email: credentials.email, password: credentials.password}
            await handleLogin(loginCreds)
        } catch (e) {
            console.log('Something went wrong')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
        navigate('/login')
    }
    return (
        <div style={wrapperStyle}>
            <Routes>
                <Route path={'/login'} element={<Login handleLogin={handleLogin}/>}/>
                <Route path={'/register'} element={<Register handleRegister={handleRegister}/>}/>
                <Route path={'/'} element={<ProtectedRoute user={user}><ToDo user={user} handleLogout={handleLogout}/></ProtectedRoute>}/>
                <Route path={'/settings'} element={<ProtectedRoute user={user}><Settings user={user} handleLogout={handleLogout}/></ProtectedRoute>}/>
            </Routes>
        </div>
    )
}

export default App
