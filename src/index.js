import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './Components/App';
import CategoriesProvider from './context/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CategoriesProvider>
    <App />
  </CategoriesProvider>
);
