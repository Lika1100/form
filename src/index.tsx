import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'styles/styles.scss';
import 'configs/configureMobX';
import { HashRouter } from 'react-router-dom';
import App from './App/App';
import 'regenerator-runtime';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);

if (module.hot) {
  module.hot.accept();
}
