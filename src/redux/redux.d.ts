export interface IAddTodoAction {
  type: string;
  label: string;
  completed: boolean;
}

export interface ITodoItem {
  label: string;
  completed: boolean;
  index: number;
}

export interface ITodoListAction {
  type: string;
  label: string;
  completed: boolean;
  index: number;
  check: boolean;
}

export interface IFilterItem {
  label: string;
  selected?: boolean;
}

interface ISwitchFilterAction {
  type: string;
  label: string;
  selected?: boolean;
}