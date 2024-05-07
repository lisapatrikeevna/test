import * as ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import App from './App';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
            <CssBaseline />
            <App />
        <ToastContainer position="bottom-left" autoClose={2000} />
    </Provider>,
);