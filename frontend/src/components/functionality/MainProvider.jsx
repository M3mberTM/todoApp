import ThemeProvider from '../../context/theme/ThemeProvider.jsx';
import NotifProvider from '../../context/notification/NotifProvider.jsx';
const MainProvider = ({children}) => {
    return <ThemeProvider>
        <NotifProvider>
            {children}
        </NotifProvider>
    </ThemeProvider>
}

export default MainProvider