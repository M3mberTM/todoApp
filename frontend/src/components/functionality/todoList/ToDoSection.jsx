import Typography from '../../custom/Typography.jsx';
import ToDoItem from './ToDoItem.jsx';

const ToDoSection = ({items, name, handleUpdate, handleRemove}) => {
    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        margin: '5px',
        flex: '1',
        alignItems: 'center',
        minWidth: '220px'
    }
    return (
        <div style={sectionStyle}>
            <Typography size={'h3'}>{name}</Typography>
            {items.map(item => {
                return <ToDoItem key={item.id} itemObject={item} handleUpdate={handleUpdate} handleRemove={handleRemove}/>
            })}
        </div>
    )
}

export default ToDoSection