import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {filterActionCreator} from '../redux/actions/filterActionCreator';
import {clearActionCreator} from '../redux/actions/todoListActionCreator';
import {IFilterItem, ITodoItem} from '../redux/redux';
import {IFooterProps, ITodoListState} from './component';

class Footer extends React.Component<IFooterProps, any> {
  render() {
    const {filters, completedCount} = this.props;
    return (
      <footer className='footer'>
        <span className='todo-count'><strong>{this.props.completedCount}</strong> item left</span>
        <ul className='filters'>
          {
            filters.map((filterItem: IFilterItem, index: number) => {
              return (
                <li key={index}>
                  <a className={filterItem.selected ? 'selected' : ''}
                     onClick={this.filterButtonClickHandle}
                     href='#/'>
                    {filterItem.label}
                  </a>
                </li>
              );
            })
          }
        </ul>
        {
          completedCount > 0 ?
            <button className='clear-completed'
                    onClick={this.clearButtonClickHandle}>
              Clear completed
            </button> : null
        }
      </footer>
    );
  }

  clearButtonClickHandle = () => {
    const {todos, clear} = this.props;
    clear(todos);
  };

  filterButtonClickHandle = (event: React.MouseEvent) => {
    const { filter } = this.props;
    const displayType = event.currentTarget.innerHTML;
    filter(displayType);
  };
}

const mapStateToProps = (state: ITodoListState) => {
  let completedCount = 0;
  state.todoListReducer.forEach((todoItem: ITodoItem) => {
    if (todoItem.completed) {
      completedCount++;
    }
  });
  const {filters, todoListReducer: todos} = state;
  return {
    completedCount: todos.length - completedCount,
    filters,
    todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  filter: (label: string) => {
    dispatch(filterActionCreator(label));
  },
  clear: (todos: ITodoItem[]) => {
    dispatch(clearActionCreator(todos));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);