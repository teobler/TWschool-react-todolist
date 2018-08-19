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
