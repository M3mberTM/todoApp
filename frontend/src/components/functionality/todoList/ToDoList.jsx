import ToDoSection from './ToDoSection.jsx';
import {priorities} from '../../../utils/constants.js';

const ToDoList = ({items, handleUpdate, handleRemove}) => {
    const listStyle = {
        padding: '5px 10px'
    }

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto'
    }

    return (
        <div style={listStyle}>
            <div style={sectionStyle}>
                {Object.keys(priorities).map(priority => {
                    return <ToDoSection key={priority} name={priorities[priority]} items={items.filter(item => item.priority === parseInt(priority))} handleUpdate={handleUpdate} handleRemove={handleRemove}/>
                })}
            </div>
        </div>
    )
}

export default ToDoList