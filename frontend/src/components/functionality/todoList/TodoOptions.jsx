import Select from '../../custom/Select.jsx';
import SelectItem from '../../custom/SelectItem.jsx';
import ToDoItemForm from './ToDoItemForm.jsx';

const TodoOptions = ({groupBy, setGroupBy, createItem}) => {
    const groupByOptions = ['None', 'Priority']
    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 10px',
        alignItems: 'center'
    }
    return <div style={itemStyle}>
        <ToDoItemForm createNewItem={createItem}/>
        <Select label={'Group by'} variant={'outlined'} value={groupBy} onChange={(event) => setGroupBy(event.target.value)}>
            {groupByOptions.map(elem => {
                return <SelectItem key={elem} value={elem}>{elem}</SelectItem>
            })}
        </Select>

    </div>
}

export default TodoOptions