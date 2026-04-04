import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './input.css';
import './output.css';

import { App } from './App';
// import { registerServiceWorker } from './serviceWorker';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// registerServiceWorker(undefined);
