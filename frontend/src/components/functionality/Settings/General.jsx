import Typography from '../../custom/Typography.jsx';
import {useTheme} from '../../../context/theme/useTheme.js';

const General = ({user}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const itemStyle = {
        display: 'flex',
        flex: '1',
        padding: '10px 15px',
        alignItems: 'flex-start',
        flexDirection: 'column'
    }
    if (!user) {
        return <div style={{...itemStyle, justifyContent: 'center', alignItems: 'center'}}>
            <Typography size={'h2'}>Loading...</Typography>
        </div>
    }
    return <div style={itemStyle}>
        <Typography size={'h2'}>General Information</Typography>

        <Typography size={'h3'} ss={{marginTop: '10px'}}>Username: </Typography>
        <Typography size={'p'} ss={{color: colors.bgSecondary}}>{user.username}</Typography>
        <Typography size={'h3'} ss={{marginTop: '10px'}}>Email: </Typography>
        <Typography size={'p'} ss={{color: colors.bgSecondary}}>{user.email}</Typography>
    </div>
}

export default General