import {ACTION_TYPE} from './ACTION_TYPE';

export const todoListActionCreator = (label: string) => {
  return {type: ACTION_TYPE.ADD_TODO, label};
};

export const toggleActionCreator = (index: number) => {
  return {type: ACTION_TYPE.TOGGLE, index};
};

export const deleteItemActionCreator = (index: number) => {
  return {type: ACTION_TYPE.DELETE, index};
};

export const toggleAllActionCreator = (check: boolean) => {
  return {type: ACTION_TYPE.TOGGLE_ALL, check};
};

export const clearActionCreator = (todos: any) => {
  return {type: ACTION_TYPE.CLEAR, todos};
};
