import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ElderShipProvider } from './contexts/ElderShipContext'; // Adjust the path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ElderShipProvider>
      <App />
    </ElderShipProvider>
  </React.StrictMode>
);
