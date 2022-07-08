import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from './redux/store';
import { client } from './general';




  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>  
    </ApolloProvider> 
  </React.StrictMode>
);

