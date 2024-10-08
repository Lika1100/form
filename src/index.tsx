import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'styles/styles.css';
import 'configs/configureMobX';
import App from './App/App';
import 'regenerator-runtime';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);

if (module.hot) {
  module.hot.accept();
}
