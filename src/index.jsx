import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './states';

import App from './App';

import './styles/style.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ReduxProvider>,
);
