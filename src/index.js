import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
if(container.hasChildNodes()){
  ReactDOM.hydrateRoot(container, 
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}else{
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}
