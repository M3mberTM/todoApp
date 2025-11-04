import Typography from '../../custom/Typography.jsx';
import Input from '../../custom/Input.jsx';
import Button from '../../custom/Button.jsx';
import {useNotification} from '../../../context/notification/useNotification.js';

const UpdateUser = ({user, handleUpdate}) => {
    const {addNotification} = useNotification()

    const itemStyle = {
        display: 'flex',
        flex: '1',
        padding: '10px 15px',
        alignItems: 'flex-start',
        flexDirection: 'column'
    }

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }

    const updateUsername = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        if (username.length < 1) {
            addNotification('Missing fields', true)
            return
        }
        const updatedUser = {username, id: user.id}
        handleUpdate(updatedUser)
    }

    const updateEmail = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        if (email.length < 1 || password.length < 1) {
            addNotification('Missing fields', true)
            return
        }
        const updatedUser = {email, id: user.id, currentPassword: password}
        handleUpdate(updatedUser)
    }

    const updatePassword = (event) => {
        event.preventDefault()
        const newPassword = event.target.newPassword.value
        const password = event.target.currPassword.value
        if (newPassword.length < 1 || password.length < 1) {
            addNotification('Missing fields', true)
            return
        }
        const updatedUser = {password: newPassword, id: user.id, currentPassword: password}
        handleUpdate(updatedUser)
    }
    return <div style={itemStyle}>
        <Typography size={'h2'}>Update Information</Typography>
        <form style={sectionStyle} onSubmit={updateUsername}>
            <Typography size={'h3'} ss={{marginTop: '10px'}}>Basic Information</Typography>
            <Input name={'username'} type={'text'} placeholder={user.username} ss={{marginTop: '10px'}}/>
            <Button ss={{alignSelf: 'flex-end'}} type={'submit'}>Update</Button>
        </form>
        <form style={sectionStyle} onSubmit={updateEmail}>
            <Typography size={'h3'} ss={{marginTop: '10px'}}>Change Email</Typography>
            <Input name={'email'} type={'text'} placeholder={user.email} ss={{marginTop: '10px'}}/>
            <Input name={'password'} type={'password'} placeholder={'Current Password'} ss={{marginTop: '10px'}}/>
            <Button ss={{alignSelf: 'flex-end'}} type={'submit'}>Update</Button>
        </form>
        <form style={sectionStyle} onSubmit={updatePassword}>
            <Typography size={'h3'} ss={{marginTop: '10px'}}>Change Password</Typography>
            <Input name={'newPassword'} type={'password'} placeholder={'New Password'} ss={{marginTop: '10px'}}/>
            <Input name={'currPassword'} type={'password'} placeholder={'Current Password'} ss={{marginTop: '10px'}}/>
            <Button ss={{alignSelf: 'flex-end'}} type={'submit'}>Update</Button>
        </form>
    </div>
}

export default UpdateUser