
import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './components/routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <React.Fragment>
     <ToastContainer />
     <RouterProvider router={routes}></RouterProvider>
   </React.Fragment>
  );
}

export default App;
