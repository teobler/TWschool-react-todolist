import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App';
import './index.css';
import {filterInitState} from './redux/reducer/filters';
import todoAppReducer from './redux/reducer/todoAppReducer';
import {itemsInitialState} from './redux/reducer/todoListReducer';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
  todoListReducer: itemsInitialState,
  filters: filterInitState,
};
const enhancer = (window as any).devToolsExtension ? (window as any).devToolsExtension()(createStore) : createStore;
const store = enhancer(todoAppReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
