import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'



import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';

import {store} from './app/store';



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    {/* Add your routes here */}
    <Provider store={store}>
      <App />
    </Provider>
    
  </BrowserRouter>
   
  </StrictMode>,
)