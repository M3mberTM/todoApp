import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MainProvider from './components/functionality/MainProvider.jsx';
import {BrowserRouter as Router} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <MainProvider>
        <Router>
            <App />
        </Router>
    </MainProvider>
)
