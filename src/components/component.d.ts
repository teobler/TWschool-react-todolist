import {IFilterItem} from '../redux/reducer/filters';
import {ITodoItem} from '../redux/redux';

export interface ITodoListState {
  todoListReducer: ITodoItem[];
  filters: IFilterItem[];
}

export interface IFooterProps {
  todos: ITodoItem[],
  completedCount: number;
  filters: IFilterItem[];
  filter: (label: string) => void;
  clear: (todos: ITodoItem[]) => void;
}

export interface ITodoProps {
  todoItem: ITodoItem;
  idx: number;
  toggle: (index: number) => void;
  deleteItem: (index: number) => void;
  updateTodo: (label: string, index: number) => void;
}

export interface ITodoListProps {
  todoListReducer: ITodoItem[];
  todos: ITodoItem[];
  allComplete: boolean;
  toggleAll: (check: boolean) => void;
}

export interface ITodoListMapProps {
  todoListReducer: ITodoItem[];
  filters: IFilterItem[];
}