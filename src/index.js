import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import CartContextProvider from './components/shared/Contexts/CartContext';
import ErrorBoundry from './services/api/ErrorBoundry';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
    <CartContextProvider>
        <React.StrictMode>
            <ErrorBoundry>
                <App />
            </ErrorBoundry>
        </React.StrictMode>
    </CartContextProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
