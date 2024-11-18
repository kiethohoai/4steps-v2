import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App-v3.jsx';
// import './index-v1.css';
// import './index-v2.css';
import './index-v3.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
