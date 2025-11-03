import Button from '../custom/Button.jsx';
import Input from '../custom/Input.jsx';
import Typography from '../custom/Typography.jsx';
import Card from '../custom/Card.jsx';
import {useNavigate} from 'react-router-dom';

const Login = ({handleLogin}) => {
    const navigate = useNavigate()
    const onLogin = (event) => {
        event.preventDefault()
        const credentials = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        handleLogin(credentials).then()
    }
    return (
        <Card>
            <form onSubmit={onLogin}>
                <Typography>Login</Typography>
                <Input name={'email'} type={'email'} placeholder={'Email'} ss={{width: '80%'}}/>
                <Input name={'password'} type={'password'} placeholder={'Password'} ss={{marginBottom: '10px', width: '80%'}}/>
                <Button type={'submit'} ss={{width: '50%', marginBottom: '7px'}}>Log in</Button><br/>
                <Typography size={'sub'} ss={{marginBottom: '2px'}}>Don't have an account?</Typography>
                <Button type={'button'} onClick={() => navigate('/register')} ss={{width: '50%'}}>Register</Button>
            </form>
        </Card>
    )
}

export default Login