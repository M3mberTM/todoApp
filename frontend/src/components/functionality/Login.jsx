import Button from '../custom/Button.jsx';
import {useTheme} from '../../context/useTheme.js';
import Input from '../custom/Input.jsx';
import Typography from '../custom/Typography.jsx';

const Login = () => {
    const {theme, toggleTheme, getThemeColors} = useTheme()
    const colors = getThemeColors()

    const loginStyle = {
        textAlign: 'center',
        width: '350px',
        backgroundColor: colors.bg,
        borderRadius: '10px',
        padding: '30px 10px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.5)'
    }
    return (
        <div style={loginStyle}>
            <form>
                <Typography>Login</Typography>
                <Input inputType={'email'} placeholder={'Email'} ss={{width: '80%'}}/>
                <Input inputType={'password'} placeholder={'Password'} ss={{marginBottom: '10px', width: '80%'}}/>
                <Button title={'Log in'} handleClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')} ss={{width: '50%', marginBottom: '5px'}}/><br/>
                <Button title={'Register'} handleClick={() => console.log('hello')} ss={{width: '50%'}} />
            </form>
        </div>
    )
}

export default Login