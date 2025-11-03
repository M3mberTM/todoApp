import Typography from '../../custom/Typography.jsx';
import Input from '../../custom/Input.jsx';
import Button from '../../custom/Button.jsx';

const UpdateUser = ({user, handleUpdate}) => {

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
        const updatedUser = {username: event.target.username.value, id: user.id}
        handleUpdate(updatedUser)
    }

    const updateEmail = (event) => {
        event.preventDefault()
        const updatedUser = {email: event.target.email.value, id: user.id, currentPassword: event.target.password.value}
        handleUpdate(updatedUser)
    }

    const updatePassword = (event) => {
        event.preventDefault()
        const updatedUser = {password: event.target.newPassword.value, id: user.id, currentPassword: event.target.currPassword.value}
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