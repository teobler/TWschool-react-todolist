import * as React from 'react';
import {connect} from 'react-redux';
import {toggleAllActionCreator} from '../redux/actions/todoListActionCreator';
import {IFilterItem} from '../redux/reducer/filters';
import {ITodoItem} from '../redux/redux';
import Todo from './Todo';

export interface ITodoListProps {
  todoListReducer: ITodoItem[];
  todos: ITodoItem[];
  allComplete: boolean;
  toggleAll: (check: boolean) => void;
}

class TodoList extends React.Component<ITodoListProps, any> {
  render() {
    const {todos, allComplete} = this.props;
    return (
      <section className='main'>
        <input id='toggle-all'
               className='toggle-all'
               type='checkbox'
               checked={allComplete}
               onChange={this.checkboxChangeHandle}/>
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
          {
            todos.map((todoItem: ITodoItem, index: number) => {
              return <Todo
                        todoItem={todoItem}
                        key={index}
                        idx={index}/>
            })
          }
        </ul>
      </section>
    );
  }

  checkboxChangeHandle = (event: any) => {
    const {toggleAll} = this.props;
    toggleAll(event.target.checked);
  };
}

const getVisibleTodos = (todoListReducer: any, filters: IFilterItem[]) => {
  const filter = (filters.find(item => item.selected as boolean) as IFilterItem).label;
  switch (filter) {
    case 'All':
      return todoListReducer;
    case 'Completed':
      return todoListReducer.filter((item: any) => item.completed);
    case 'Active':
      return todoListReducer.filter((item: any) => !item.completed);
  }
};

const mapStateToProps = ({todoListReducer, filters}: any) => {
  return {
    todos: getVisibleTodos(todoListReducer, filters),
    allComplete: todoListReducer.every((todoItem: any) => todoItem.completed),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  toggleAll: (check: boolean) => {
    dispatch(toggleAllActionCreator(check));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
