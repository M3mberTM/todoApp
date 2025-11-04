import ToDoSection from './ToDoSection.jsx';
import ToDoItem from './ToDoItem.jsx';
import Conditional from '../../custom/Conditional.jsx';

const ToDoList = ({items, groupBy, handleUpdate}) => {
    const sections = {
        priority: {None: 0, Low: 1, Medium: 2, High: 3}
    }
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
            <Conditional condition={groupBy === 'None'}>
                {items.map(elem => {
                    return <ToDoItem key={elem.id} itemObject={elem} handleUpdate={handleUpdate}/>
                })}
            </Conditional>
            <Conditional condition={groupBy === 'Priority'}>
                <div style={sectionStyle}>
                    {Object.keys(sections.priority).map(priority => {
                        return <ToDoSection key={priority} name={priority} items={items.filter(item => item.priority === sections.priority[priority])} handleUpdate={handleUpdate}/>
                    })}
                </div>
            </Conditional>
        </div>
    )
}

export default ToDoList