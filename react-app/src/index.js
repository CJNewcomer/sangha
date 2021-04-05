import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store/index';
import * as sessionActions from './store/session';
import { Provider } from 'react-redux';
import ModalProvider from './context/ModalAuthContext';
import OtherUserProvider from './context/OtherUser';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store 
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <OtherUserProvider>
          <App />
        </OtherUserProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
