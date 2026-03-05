import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Router from './routes';
import { ThemeProvider } from './Provider/ThemeProvider';
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
     <BrowserRouter>
     <Provider store={store}>
      <ThemeProvider>
       <Router/>
       <ToastContainer/>
       </ThemeProvider>
       </Provider>
      </BrowserRouter>
  );
}

export default App;
