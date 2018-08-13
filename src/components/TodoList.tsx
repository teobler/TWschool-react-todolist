import * as React from 'react';
import {connect} from 'react-redux';
import {toggleAllActionCreator} from '../redux/actions/todoListActionCreator';
import {ITodoItem} from '../redux/redux';
import Todo from './Todo';

export interface ITodoListProps {
  todoListReducer: ITodoItem[];
  allComplete: boolean;
  toggleAll: (check: boolean) => void;
}

class TodoList extends React.Component<ITodoListProps, any> {
  render() {
    // tslint:disable-next-line:no-console
    console.log(this.props, '=======================todolist');
    const {todoListReducer, allComplete} = this.props;
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
            todoListReducer.map((todoItem: ITodoItem, index: number) => {
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

const getVisibleTodos = (todoListReducer: any) => {
  return todoListReducer;
};

const mapStateToProps = ({todoListReducer}: any) => {
  // tslint:disable-next-line:no-console
  console.log(todoListReducer, '=======================todolist todos');
  return {
    todos: getVisibleTodos(todoListReducer),
    allComplete: todoListReducer.every((todoItem: any) => todoItem.completed),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  toggleAll: (check: boolean) => {
    dispatch(toggleAllActionCreator(check));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
