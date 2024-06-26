import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalContextProvider } from './globalState/GlobalState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
