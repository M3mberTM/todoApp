import {useTheme} from "../../context/useTheme.js";
import Input from "../custom/Input.jsx";

const ToDoItemForm = ({itemObject, handleUpdate}) => {
    const {getThemeColors} = useTheme()
    const colors = getThemeColors()

    const formStyle = {
        backgroundColor: colors.bg
    }
    return <div style={formStyle}>
        <form>
            <Input name={'content'}/>
        </form>
    </div>
}

export default ToDoItemForm