import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {toggleAllActionCreator} from '../redux/actions/todoListActionCreator';
import {IFilterItem, ITodoItem} from '../redux/redux';
import {ITodoListMapProps, ITodoListProps} from './component';
import Todo from './Todo';

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

  checkboxChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {toggleAll} = this.props;
    toggleAll(event.currentTarget.checked);
  };
}

const getVisibleTodos = (todoListReducer: ITodoItem[], filters: IFilterItem[]) => {
  const filter = (filters.find(item => item.selected) || {label: 'All', selected: true}).label;
  switch (filter) {
    case 'All':
      return todoListReducer;
    case 'Completed':
      return todoListReducer.filter((item: ITodoItem) => item.completed);
    case 'Active':
      return todoListReducer.filter((item: ITodoItem) => !item.completed);
    default:
      return todoListReducer;
  }
};

const mapStateToProps = ({todoListReducer, filters}: ITodoListMapProps) => {
  return {
    todos: getVisibleTodos(todoListReducer, filters),
    allComplete: todoListReducer.every((todoItem: ITodoItem) => todoItem.completed),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleAll: (check: boolean) => {
    dispatch(toggleAllActionCreator(check));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
