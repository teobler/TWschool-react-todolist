import * as React from 'react';
import {connect} from 'react-redux';
import {fliterActionCreator} from '../redux/actions/fliterActionCreator';
import {IFilterItem} from '../redux/reducer/filters';
import {ITodoItem} from '../redux/redux';

interface IFooterProps {
  completedCount: number;
  filters: IFilterItem[];
}

class Footer extends React.Component<IFooterProps, any> {
  render() {
    const {filters, completedCount} = this.props;
    // tslint:disable-next-line:no-console
    console.log(this.props, '=======================footer');
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

  clearButtonOnClickHandle = (event: any) => {
    return event;
  };

  // TODO: add handle function
  filterButtonClickHandle = (event: any) => {
    return event;
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
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fliter: (label: string) => {
    dispatch(fliterActionCreator(label));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);