import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({user, children}) => {
    if (!user) {
        return <Navigate replace to={'/login'}/>
    }
    return children
}

export default ProtectedRoute