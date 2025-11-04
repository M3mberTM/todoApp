import Typography from '../../custom/Typography.jsx';
import ToDoItem from './ToDoItem.jsx';

const ToDoSection = ({items, name, handleUpdate}) => {
    if (items.length < 1) {
        return null
    }
    const sectionStyle = {
        display: 'inline-block',
        margin: '5px'
    }
    return (
        <div style={sectionStyle}>
            <Typography size={'h3'}>{name}</Typography>
            {items.map(item => {
                return <ToDoItem key={item.id} itemObject={item} handleUpdate={handleUpdate}/>
            })}
        </div>
    )
}

export default ToDoSection