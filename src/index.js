import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './components/Routers/Router/Router';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '../src/components/context/AuthProvider';
// react phot view----
import 'react-photo-view/dist/react-photo-view.css';
// react hot toast ---
import { Toaster } from 'react-hot-toast';
// react-query / tanstack-query---
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
