import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App-v1.jsx';
import './index-v1.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
