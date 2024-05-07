import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import "styles/styles.scss";
import "configs/configureMobX";
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';



ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter>< App /></BrowserRouter></React.StrictMode>)

if (module.hot) {
    module.hot.accept()
}