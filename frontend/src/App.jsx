import Login from './components/functionality/Login.jsx';
import {useTheme} from './context/useTheme.js';

function App() {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()
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
        fontFamily: 'Arial, sans-serif'
    }
    return (
        <div style={wrapperStyle}>
            <Login/>
        </div>
    )
}

export default App
