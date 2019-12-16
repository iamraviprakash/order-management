import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { Store } from './redux/store'
import { BrowserRouter } from 'react-router-dom';
import './App.css';

const store = Store();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
