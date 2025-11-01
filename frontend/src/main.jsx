import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import {BrowserRouter as Router} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <Router>
            <App />
        </Router>
    </ThemeProvider>
)
