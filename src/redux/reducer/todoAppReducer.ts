import {combineReducers} from 'redux';
import filters from './filters';
import {todoListReducer} from './todoListReducer';

const todoAppReducer = combineReducers({
  todoListReducer,
  filters,
});

export default todoAppReducer;
