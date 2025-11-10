import Button from '../custom/Button.jsx';
import Input from '../custom/Input.jsx';
import Typography from '../custom/Typography.jsx';
import Card from '../custom/Card.jsx';
import {useNavigate} from 'react-router-dom';
import {useNotification} from '../../context/notification/useNotification.js';

const Register = ({handleRegister}) => {
    const navigate = useNavigate()
    const {addNotification} = useNotification()

    const onRegister = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        const username = event.target.username.value
        const repeatPassword = event.target.repeatPassword.value
        if (email.length < 1 || password.length < 1 || username.length < 1) {
            addNotification('Missing fields', true)
            return
        }

        if (password !== repeatPassword) {
            addNotification('Passwords do not match', true)
            return
        }
        const credentials = {
            email,
            password,
            username
        }
        handleRegister(credentials).then()
    }
    return (
        <Card>
            <form onSubmit={onRegister}>
                <Typography>Register</Typography>
                <Input name={'username'} type={'text'} placeholder={'Your username...'} ss={{width: '80%'}} maxLength={30}/>
                <Input name={'email'} type={'email'} placeholder={'Your email...'} ss={{width: '80%'}}/>
                <Input name={'password'} type={'password'} placeholder={'Your password...'} ss={{width: '80%'}} maxLength={50}/>
                <Input name={'repeatPassword'} type={'password'} placeholder={'Your password again...'} ss={{marginBottom: '10px', width: '80%'}} maxLength={50}/>
                <Button type={'submit'} ss={{width: '50%', marginBottom: '7px'}}>Register</Button>
                <Typography size={'sub'} ss={{marginBottom: '2px'}}>Do you have an account?</Typography>
                <Button type={'button'} onClick={() => navigate('/login')} ss={{width: '50%'}}>Log in</Button>
            </form>
        </Card>
    )
}

export default Register