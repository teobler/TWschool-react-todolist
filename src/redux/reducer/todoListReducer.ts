import {ACTION_TYPE} from '../actions/ACTION_TYPE';
import {ITodoItem} from '../redux';

export const initialState: any = [
  { label: 'react', completed: true, index: 0},
  { label: 'react-dom', completed: false, index: 1}
];

interface ITodoListAction {
  type: string;
  label?: string;
  completed?: boolean;
  index?: number;
  check?: boolean;
}

export const todoListReducer = (state: any = initialState, action: ITodoListAction) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_TODO:
      return [
        ...state,
        {
          label: action.label,
          completed: false,
          index: state.length,
        },
      ];
    case ACTION_TYPE.TOGGLE:
      return state.map((todoItem: ITodoItem, index: number) => {
        return Object.assign({}, todoItem, {completed: index === action.index ? !todoItem.completed : todoItem.completed})
      });
    case ACTION_TYPE.TOGGLE_ALL:
      return state.map((todoItem: ITodoItem) => {
        return Object.assign({}, todoItem, {completed: action.check})
      });
    case ACTION_TYPE.DELETE:
      const newState = state.map((todoItem: ITodoItem) => {
        return Object.assign({}, todoItem);
      });
      newState.splice(action.index, 1);
      newState.forEach((todoItem: ITodoItem, index: number) => {
        todoItem.index = index;
      });
      return newState;
    case ACTION_TYPE.CLEAR:
      const remainState = state.filter((todoItem: ITodoItem) => {
        return !todoItem.completed;
      });
      remainState.forEach((todoItem: ITodoItem, index: number) => {
        todoItem.index = index;
      });
      return remainState;
    case ACTION_TYPE.UPDATE:
      return state.map((todoItem: ITodoItem, index: number) => {
        if (index === action.index) {
          return Object.assign({}, todoItem, {label: action.label});
        } else {
          return Object.assign({}, todoItem);
        }
      });
    default:
      return state;
  }
};