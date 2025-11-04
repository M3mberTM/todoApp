import Typography from '../../custom/Typography.jsx';
import Input from '../../custom/Input.jsx';
import Button from '../../custom/Button.jsx';
import {useNotification} from '../../../context/notification/useNotification.js';
const RemoveUser = ({handleRemove}) => {
    const {addNotification} = useNotification()
    const itemStyle = {
        display: 'flex',
        flex: '1',
        padding: '10px 15px',
        alignItems: 'flex-start',
        flexDirection: 'column'
    }

    const removeUser = (event) => {
        event.preventDefault()
        const password = event.target.password.value
        if (password.length < 1) {
            addNotification('No password was provided', true)
            return
        }
        const shouldDelete = confirm('Are you absolutely sure?')
        if (shouldDelete) {
            handleRemove(password)
        }
    }
    return <div style={itemStyle}>
        <Typography size={'h2'}>Delete User</Typography>
        <Typography size={'p'} ss={{marginTop: '10px', fontWeight: 'bold'}}>Account deletion is a permanent action.</Typography>
        <Typography size={'p'}>All user data will be irreversibly deleted from our systems. To comply with data protection regulations, recovery after deletion is not possible.</Typography>
        <form onSubmit={removeUser}>
            <Input name={'password'} placeholder={'Current password'} type={'text'}  ss={{marginTop: '10px'}}/>
            <Button type={'submit'} ss={{marginLeft: '5px'}}>Remove</Button>
        </form>
    </div>
}

export default RemoveUser