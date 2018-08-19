import * as React from 'react';
import {connect} from 'react-redux';
import {filterActionCreator} from '../redux/actions/filterActionCreator';
import {clearActionCreator} from '../redux/actions/todoListActionCreator';
import {IFilterItem} from '../redux/reducer/filters';
import {ITodoItem} from '../redux/redux';

interface IFooterProps {
  todos: any,
  completedCount: number;
  filters: IFilterItem[];
  filter: (label: string) => void;
  clear: (todos: any) => void;
}

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
                    onClick={this.clearButtonOnClickHandle}>
              Clear completed
            </button> : null
        }
      </footer>
    );
  }

  clearButtonOnClickHandle = () => {
    const {todos, clear} = this.props;
    clear(todos);
  };

  filterButtonClickHandle = (event: any) => {
    const { filter } = this.props;
    const displayType = event.target.innerHTML;
    filter(displayType);
  };
}

interface ITodoListState {
  todoListReducer: ITodoItem[];
  filters: IFilterItem[];
}

const mapStateToProps = (state: ITodoListState) => {
  let completedCount = 0;
  state.todoListReducer.forEach((todoItem: ITodoItem) => {
    if (todoItem.completed) {
      completedCount++;
    }
  });
  const {filters} = state;
  return {
    completedCount,
    filters,
    todos:state.todoListReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  filter: (label: string) => {
    dispatch(filterActionCreator(label));
  },
  clear: (todos: any) => {
    dispatch(clearActionCreator(todos));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);